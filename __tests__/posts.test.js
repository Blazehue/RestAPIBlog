// Posts routes test suite
// Tests for blog post CRUD operations with authentication

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Post = require('../models/Post');

// Test database URL
const TEST_DB_URI = 'mongodb://localhost:27017/blog-api-test';

let authorToken;
let authorId;
let readerToken;
let postId;

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(TEST_DB_URI);

  // Clean up
  await User.deleteMany({});
  await Post.deleteMany({});

  // Create author user
  const authorRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Author User',
      email: 'author@example.com',
      password: 'Password123',
      role: 'author'
    });
  authorToken = authorRes.body.data.token;
  authorId = authorRes.body.data._id;

  // Create reader user
  const readerRes = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Reader User',
      email: 'reader@example.com',
      password: 'Password123',
      role: 'reader'
    });
  readerToken = readerRes.body.data.token;
});

afterAll(async () => {
  // Clean up and close connection
  await User.deleteMany({});
  await Post.deleteMany({});
  await mongoose.connection.close();
});

describe('Posts Routes', () => {
  describe('POST /api/posts', () => {
    it('should create a post when authenticated as author', async () => {
      const res = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${authorToken}`)
        .send({
          title: 'Test Post',
          content: 'This is a test post content',
          tags: ['test', 'nodejs'],
          status: 'published'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Test Post');
      postId = res.body.data._id;
    });

    it('should not create post when not authenticated', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({
          title: 'Test Post 2',
          content: 'This is another test post'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should not create post as reader', async () => {
      const res = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${readerToken}`)
        .send({
          title: 'Test Post 3',
          content: 'This is another test post'
        });

      expect(res.statusCode).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('should not create post with invalid data', async () => {
      const res = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${authorToken}`)
        .send({
          title: 'Ab', // Too short
          content: 'Short'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/posts', () => {
    it('should get all published posts', async () => {
      const res = await request(app).get('/api/posts');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should filter posts by tags', async () => {
      const res = await request(app).get('/api/posts?tags=nodejs');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should paginate posts', async () => {
      const res = await request(app).get('/api/posts?page=1&limit=5');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.currentPage).toBe('1');
    });
  });

  describe('GET /api/posts/:id', () => {
    it('should get a single post by ID', async () => {
      const res = await request(app).get(`/api/posts/${postId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(postId);
    });

    it('should return 404 for non-existent post', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/posts/${fakeId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('PUT /api/posts/:id', () => {
    it('should update own post', async () => {
      const res = await request(app)
        .put(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${authorToken}`)
        .send({
          title: 'Updated Test Post',
          content: 'This is updated content'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Updated Test Post');
    });

    it('should not update post without authentication', async () => {
      const res = await request(app)
        .put(`/api/posts/${postId}`)
        .send({
          title: 'Another Update'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should not update other user\'s post', async () => {
      const res = await request(app)
        .put(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${readerToken}`)
        .send({
          title: 'Unauthorized Update'
        });

      expect(res.statusCode).toBe(403);
      expect(res.body.success).toBe(false);
    });
  });

  describe('DELETE /api/posts/:id', () => {
    it('should not delete other user\'s post', async () => {
      const res = await request(app)
        .delete(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${readerToken}`);

      expect(res.statusCode).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('should delete own post', async () => {
      const res = await request(app)
        .delete(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${authorToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should return 404 for already deleted post', async () => {
      const res = await request(app)
        .delete(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${authorToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
