# Blog REST API

A complete RESTful API for a blog platform built with Node.js, Express, and MongoDB. Features include JWT authentication, role-based authorization, input validation, rate limiting, and comprehensive error handling.

## Features

- 🔐 **JWT Authentication** - Secure user authentication with JSON Web Tokens
- 👥 **Role-Based Authorization** - Three user roles: Reader, Author, and Admin
- 📝 **Full CRUD Operations** - Create, Read, Update, and Delete blog posts
- 🔍 **Advanced Filtering** - Search, filter by tags/author, and pagination
- ✅ **Input Validation** - Comprehensive validation using express-validator
- 🛡️ **Rate Limiting** - Prevent brute force attacks on auth routes
- 🎯 **Error Handling** - Centralized error handling with consistent responses
- 📊 **MongoDB Integration** - Mongoose ODM with schema validation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: bcryptjs, cors, express-rate-limit

## Project Structure

```
blog-rest-api/
├── config/           # Configuration files (DB, JWT)
├── controllers/      # Route controllers (auth, posts)
├── middleware/       # Custom middleware (auth, validation, error handling)
├── models/          # Mongoose models (User, Post)
├── routes/          # API routes
├── utils/           # Utility functions
├── .env.example     # Environment variables template
├── .gitignore       # Git ignore file
├── package.json     # Dependencies and scripts
└── server.js        # App entry point
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Blazehue/RestAPIBlog.git
   cd RestAPIBlog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/blog-api
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=30d
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running locally or use MongoDB Atlas

5. **Run the application**
   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "author"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "author",
    "token": "jwt_token_here"
  }
}
```

**Validation Rules:**
- Name: Required, min 2 characters
- Email: Required, valid email format
- Password: Required, min 6 characters, must contain at least one number and one uppercase letter
- Role: Optional, must be 'reader', 'author', or 'admin' (defaults to 'reader')

#### Login User
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "author",
    "token": "jwt_token_here"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "author",
    "createdAt": "2025-10-27T10:00:00.000Z"
  }
}
```

### Blog Post Endpoints

#### Get All Posts
```http
GET /api/posts
```

**Query Parameters:**
- `page` (number): Page number for pagination (default: 1)
- `limit` (number): Number of posts per page (default: 10)
- `tags` (string): Comma-separated tags to filter by
- `author` (string): Author ID to filter by
- `search` (string): Search term for title and content
- `status` (string): Filter by status ('draft' or 'published')

**Example:**
```http
GET /api/posts?page=1&limit=10&tags=javascript,nodejs&search=express
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 25,
  "totalPages": 3,
  "currentPage": 1,
  "data": [
    {
      "_id": "post_id",
      "title": "Getting Started with Express",
      "content": "Express is a minimal web framework...",
      "author": {
        "_id": "author_id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "tags": ["javascript", "nodejs", "express"],
      "status": "published",
      "createdAt": "2025-10-27T10:00:00.000Z",
      "updatedAt": "2025-10-27T10:00:00.000Z"
    }
  ]
}
```

#### Get Single Post
```http
GET /api/posts/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "post_id",
    "title": "Getting Started with Express",
    "content": "Express is a minimal web framework...",
    "author": {
      "_id": "author_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "tags": ["javascript", "nodejs"],
    "status": "published",
    "createdAt": "2025-10-27T10:00:00.000Z",
    "updatedAt": "2025-10-27T10:00:00.000Z"
  }
}
```

#### Create Post
```http
POST /api/posts
```

**Headers:**
```
Authorization: Bearer <token>
```

**Note:** User must have 'author' or 'admin' role

**Request Body:**
```json
{
  "title": "Getting Started with Express",
  "content": "Express is a minimal web framework for Node.js...",
  "tags": ["javascript", "nodejs", "express"],
  "status": "published"
}
```

**Validation Rules:**
- Title: Required, 3-100 characters
- Content: Required, min 10 characters
- Tags: Optional array, max 5 tags
- Status: Optional, 'draft' or 'published' (defaults to 'draft')

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "post_id",
    "title": "Getting Started with Express",
    "content": "Express is a minimal web framework...",
    "author": {
      "_id": "author_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "tags": ["javascript", "nodejs", "express"],
    "status": "published",
    "createdAt": "2025-10-27T10:00:00.000Z",
    "updatedAt": "2025-10-27T10:00:00.000Z"
  }
}
```

#### Update Post
```http
PUT /api/posts/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Note:** User must be the post owner or admin

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "status": "published"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "post_id",
    "title": "Updated Title",
    "content": "Updated content...",
    "author": {...},
    "tags": ["javascript"],
    "status": "published",
    "createdAt": "2025-10-27T10:00:00.000Z",
    "updatedAt": "2025-10-27T11:00:00.000Z"
  }
}
```

#### Delete Post
```http
DELETE /api/posts/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Note:** User must be the post owner or admin

**Response:**
```json
{
  "success": true,
  "data": {}
}
```

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Security Features

### Password Requirements
- Minimum 6 characters
- At least one number
- At least one uppercase letter
- Hashed using bcryptjs with 10 salt rounds

### Rate Limiting
- Authentication routes: 5 requests per 15 minutes per IP
- General API routes: 100 requests per 15 minutes per IP

### JWT Tokens
- Expire after 30 days (configurable)
- Stored in Authorization header: `Bearer <token>`

## User Roles

### Reader
- View published posts
- Cannot create posts

### Author
- All Reader permissions
- Create posts
- Update own posts
- Delete own posts

### Admin
- All Author permissions
- Update any post
- Delete any post

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['reader', 'author', 'admin']),
  createdAt: Date
}
```

### Post Model
```javascript
{
  title: String (required, 3-100 chars),
  content: String (required, min 10 chars),
  author: ObjectId (ref: User),
  tags: Array of Strings (max 5),
  status: String (enum: ['draft', 'published']),
  createdAt: Date,
  updatedAt: Date
}
```

## Development

### Available Scripts

```bash
# Start server in development mode
npm run dev

# Start server in production mode
npm start

# Run tests (if configured)
npm test
```

### Testing with cURL

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"Password123","role":"author"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Password123"}'
```

**Create a post:**
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"My First Post","content":"This is the content of my first blog post","tags":["nodejs","express"],"status":"published"}'
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Built with ❤️ by [Blazehue](https://github.com/Blazehue)

## Acknowledgments

- Express.js documentation
- MongoDB documentation
- JWT.io for token debugging
- The Node.js community
