# 📚 Blog REST API

> A production-ready RESTful API for a modern blog platform with JWT authentication, role-based access control, and comprehensive security features.

[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.x-green.svg)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Features

### Core Functionality
- 🔐 **JWT Authentication** - Secure token-based authentication with refresh capabilities
- 👥 **Role-Based Authorization** - Granular permissions for Reader, Author, and Admin roles
- 📝 **Full CRUD Operations** - Complete lifecycle management for blog posts
- 🔍 **Advanced Search & Filtering** - Multi-parameter search with tags, author, and full-text search
- 📄 **Pagination** - Efficient data loading with configurable page sizes
- 🏷️ **Tag System** - Flexible categorization with multi-tag support

### Security & Performance
- ✅ **Input Validation** - Comprehensive validation using express-validator
- 🛡️ **Rate Limiting** - DDoS protection and brute-force prevention
- 🔒 **Password Security** - Bcrypt hashing with salt rounds
- 🌐 **CORS Protection** - Configurable cross-origin resource sharing
- 🎯 **Centralized Error Handling** - Consistent error responses across all endpoints
- 📊 **Request Logging** - Track API usage and debug issues

### Developer Experience
- 📁 **Clean Architecture** - Organized folder structure following best practices
- 🧪 **Validation Middleware** - Reusable validation chains
- 🔄 **MongoDB Integration** - Mongoose ODM with schema validation and relationships
- 📖 **Comprehensive Documentation** - Detailed API reference with examples

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** v14.0 or higher
- **MongoDB** v4.0 or higher (local or Atlas)
- **npm** v6.0 or higher (or yarn)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Blazehue/RestAPIBlog.git
cd RestAPIBlog

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 4. Start the server
npm run dev
```

The API will be available at `http://localhost:5000`

---

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/blog-api
# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-api

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=30d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Environment Variables Explained

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Application environment | `development` | Yes |
| `PORT` | Server port number | `5000` | Yes |
| `MONGO_URI` | MongoDB connection string | - | Yes |
| `JWT_SECRET` | Secret key for JWT signing | - | Yes |
| `JWT_EXPIRE` | Token expiration time | `30d` | No |
| `RATE_LIMIT_WINDOW_MS` | Rate limit time window | `900000` | No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` | No |
| `ALLOWED_ORIGINS` | CORS allowed origins | - | No |

---

## 📂 Project Structure

```
blog-rest-api/
├── config/
│   ├── db.js                 # MongoDB connection setup
│   └── constants.js          # Application constants
├── controllers/
│   ├── authController.js     # Authentication logic
│   └── postController.js     # Post CRUD operations
├── middleware/
│   ├── auth.js              # JWT verification & role checking
│   ├── errorHandler.js      # Global error handler
│   ├── validation.js        # Input validation rules
│   └── rateLimiter.js       # Rate limiting configuration
├── models/
│   ├── User.js              # User schema & methods
│   └── Post.js              # Post schema & methods
├── routes/
│   ├── authRoutes.js        # Authentication endpoints
│   └── postRoutes.js        # Post management endpoints
├── utils/
│   ├── errorResponse.js     # Custom error class
│   └── logger.js            # Logging utility
├── .env.example             # Environment template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies & scripts
├── README.md               # This file
└── server.js               # Application entry point
```

---

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Response Format

All responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "data": { /* response data */ },
  "count": 10,          // For list endpoints
  "total": 25,          // For paginated endpoints
  "currentPage": 1,     // For paginated endpoints
  "totalPages": 3       // For paginated endpoints
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

---

## 🔐 Authentication

### Register New User

Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "author"
}
```

**Validation Rules:**
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `name` | String | Yes | Min 2 characters |
| `email` | String | Yes | Valid email format, unique |
| `password` | String | Yes | Min 6 chars, 1 uppercase, 1 number |
| `role` | String | No | One of: `reader`, `author`, `admin` |

**Success Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "author",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "createdAt": "2025-10-27T10:00:00.000Z"
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "error": "User with this email already exists"
}
```

---

### Login

Authenticate and receive a JWT token.

**Endpoint:** `POST /api/auth/login`

**Rate Limit:** 5 requests per 15 minutes

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "author",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

### Get Current User

Retrieve authenticated user's information.

**Endpoint:** `GET /api/auth/me`

**Authentication:** Required

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "author",
    "createdAt": "2025-10-27T10:00:00.000Z"
  }
}
```

---

## 📝 Blog Posts

### Get All Posts

Retrieve a paginated list of blog posts with optional filtering.

**Endpoint:** `GET /api/posts`

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | Number | `1` | Page number |
| `limit` | Number | `10` | Posts per page (max: 50) |
| `search` | String | - | Search in title and content |
| `tags` | String | - | Comma-separated tag list |
| `author` | String | - | Author's user ID |
| `status` | String | - | Filter by `draft` or `published` |
| `sort` | String | `-createdAt` | Sort field (prefix `-` for desc) |

**Example Requests:**
```http
# Get first page
GET /api/posts

# Search with pagination
GET /api/posts?search=nodejs&page=2&limit=20

# Filter by tags and author
GET /api/posts?tags=javascript,express&author=507f1f77bcf86cd799439011

# Get only published posts
GET /api/posts?status=published

# Sort by title ascending
GET /api/posts?sort=title
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "count": 10,
  "total": 25,
  "totalPages": 3,
  "currentPage": 1,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Getting Started with Express.js",
      "content": "Express is a minimal and flexible Node.js web application framework...",
      "author": {
        "_id": "507f1f77bcf86cd799439012",
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

---

### Get Single Post

Retrieve detailed information about a specific post.

**Endpoint:** `GET /api/posts/:id`

**URL Parameters:**
- `id` - MongoDB ObjectId of the post

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Getting Started with Express.js",
    "content": "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications...",
    "author": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "author"
    },
    "tags": ["javascript", "nodejs", "express"],
    "status": "published",
    "createdAt": "2025-10-27T10:00:00.000Z",
    "updatedAt": "2025-10-27T10:00:00.000Z"
  }
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "error": "Post not found"
}
```

---

### Create Post

Create a new blog post.

**Endpoint:** `POST /api/posts`

**Authentication:** Required (Author or Admin role)

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Getting Started with Express.js",
  "content": "Express is a minimal and flexible Node.js web application framework that provides a robust set of features...",
  "tags": ["javascript", "nodejs", "express"],
  "status": "published"
}
```

**Validation Rules:**
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `title` | String | Yes | 3-100 characters |
| `content` | String | Yes | Min 10 characters |
| `tags` | Array | No | Max 5 tags, each 2-30 chars |
| `status` | String | No | `draft` or `published` (default: `draft`) |

**Success Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Getting Started with Express.js",
    "content": "Express is a minimal and flexible...",
    "author": {
      "_id": "507f1f77bcf86cd799439012",
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

**Error Responses:**

`401 Unauthorized`
```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

`403 Forbidden`
```json
{
  "success": false,
  "error": "User role 'reader' is not authorized to create posts"
}
```

---

### Update Post

Update an existing blog post.

**Endpoint:** `PUT /api/posts/:id`

**Authentication:** Required (Post owner or Admin)

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:** (All fields optional)
```json
{
  "title": "Updated: Getting Started with Express.js",
  "content": "Updated content here...",
  "tags": ["javascript", "nodejs"],
  "status": "published"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated: Getting Started with Express.js",
    "content": "Updated content here...",
    "author": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "tags": ["javascript", "nodejs"],
    "status": "published",
    "createdAt": "2025-10-27T10:00:00.000Z",
    "updatedAt": "2025-10-27T11:00:00.000Z"
  }
}
```

**Error Response:** `403 Forbidden`
```json
{
  "success": false,
  "error": "You are not authorized to update this post"
}
```

---

### Delete Post

Delete a blog post.

**Endpoint:** `DELETE /api/posts/:id`

**Authentication:** Required (Post owner or Admin)

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {}
}
```

**Error Response:** `403 Forbidden`
```json
{
  "success": false,
  "error": "You are not authorized to delete this post"
}
```

---

## 🔒 Security

### Password Requirements

Strong passwords are enforced through validation:
- ✅ Minimum 6 characters
- ✅ At least one uppercase letter (A-Z)
- ✅ At least one number (0-9)
- ✅ Hashed using bcryptjs with 10 salt rounds
- ✅ Never stored or transmitted in plain text

**Example Valid Passwords:**
- `SecurePass123`
- `MyBlog2025!`
- `Express4API`

### Rate Limiting

Protection against brute force and DDoS attacks:

| Route Type | Limit | Window |
|------------|-------|--------|
| Authentication | 5 requests | 15 minutes |
| General API | 100 requests | 15 minutes |

Rate limit headers are included in responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1634567890
```

### JWT Authentication

- **Algorithm:** HS256 (HMAC with SHA-256)
- **Expiration:** Configurable (default: 30 days)
- **Storage:** Client-side (localStorage/sessionStorage recommended)
- **Header Format:** `Authorization: Bearer <token>`

**Token Payload:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "iat": 1634567890,
  "exp": 1637159890
}
```

### CORS Configuration

Cross-Origin Resource Sharing is configured to:
- Accept requests from specified origins only
- Support credentials (cookies)
- Allow specific HTTP methods (GET, POST, PUT, DELETE)
- Include custom headers (Authorization)

---

## 👥 User Roles & Permissions

### Role Hierarchy

```
Admin (Full Access)
  ├── All Author permissions
  ├── Manage all posts (update/delete any post)
  └── User management (future feature)

Author (Content Creator)
  ├── All Reader permissions
  ├── Create posts
  ├── Update own posts
  └── Delete own posts

Reader (Basic Access)
  ├── View published posts
  ├── Search and filter posts
  └── View user profiles
```

### Permission Matrix

| Action | Reader | Author | Admin |
|--------|:------:|:------:|:-----:|
| View published posts | ✅ | ✅ | ✅ |
| View draft posts | ❌ | Own only | ✅ |
| Create posts | ❌ | ✅ | ✅ |
| Update own posts | ❌ | ✅ | ✅ |
| Update any post | ❌ | ❌ | ✅ |
| Delete own posts | ❌ | ✅ | ✅ |
| Delete any post | ❌ | ❌ | ✅ |

---

## 💾 Database Schema

### User Model

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false  // Never return in queries by default
  },
  role: {
    type: String,
    enum: ['reader', 'author', 'admin'],
    default: 'reader'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes:**
- `email` (unique)
- `role`

**Virtual Fields:**
- `posts` - All posts by this user (populated on demand)

---

### Post Model

```javascript
{
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    minlength: 10
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    minlength: 2,
    maxlength: 30
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes:**
- `author`
- `status`
- `tags`
- `createdAt` (descending)
- Text index on `title` and `content` for full-text search

**Validation:**
- Maximum 5 tags per post
- Tags are automatically converted to lowercase
- Automatically updates `updatedAt` on modification

---

## 🧪 Testing

### Manual Testing with cURL

**1. Register a new user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "SecurePass123",
    "role": "author"
  }'
```

**2. Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "SecurePass123"
  }'
```

**3. Get current user (replace TOKEN):**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**4. Create a post:**
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post. It contains useful information about Node.js development.",
    "tags": ["nodejs", "express", "mongodb"],
    "status": "published"
  }'
```

**5. Get all posts with filters:**
```bash
curl -X GET "http://localhost:5000/api/posts?tags=nodejs&limit=5&sort=-createdAt"
```

**6. Update a post (replace POST_ID and TOKEN):**
```bash
curl -X PUT http://localhost:5000/api/posts/POST_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Updated Post Title",
    "status": "published"
  }'
```

**7. Delete a post:**
```bash
curl -X DELETE http://localhost:5000/api/posts/POST_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Testing with Postman

1. **Import Collection:** Create a new collection with the API endpoints
2. **Set Environment Variables:**
   - `base_url`: `http://localhost:5000/api`
   - `token`: Auto-populated from login response
3. **Use Pre-request Scripts:** Automatically set authorization header
4. **Create Test Suites:** Validate response status and data structure

---

## 🛠️ Development

### Available Scripts

```bash
# Start in development mode with auto-reload
npm run dev

# Start in production mode
npm start

# Run linter
npm run lint

# Run tests (configure jest first)
npm test

# Run tests with coverage
npm run test:coverage
```

### Adding New Features

1. **Create Model** (if needed): `models/NewModel.js`
2. **Create Controller**: `controllers/newController.js`
3. **Create Routes**: `routes/newRoutes.js`
4. **Add Validation**: `middleware/validation.js`
5. **Register Routes**: Import in `server.js`
6. **Update Documentation**: Add to this README

### Code Style Guidelines

- Use ES6+ features (async/await, arrow functions, destructuring)
- Follow consistent naming: camelCase for variables/functions, PascalCase for classes
- Add JSDoc comments for functions
- Keep functions small and focused
- Use meaningful variable names
- Handle errors explicitly

---

## 📊 HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| `200` | OK | Successful GET, PUT, DELETE |
| `201` | Created | Successful POST (resource created) |
| `400` | Bad Request | Validation errors, malformed requests |
| `401` | Unauthorized | Missing or invalid authentication |
| `403` | Forbidden | Authenticated but insufficient permissions |
| `404` | Not Found | Resource doesn't exist |
| `409` | Conflict | Duplicate resource (e.g., email exists) |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Server Error | Unexpected server error |

---

## 🚨 Error Handling

### Validation Errors

```json
{
  "success": false,
  "error": "Please provide a valid email address"
}
```

### Authentication Errors

```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

### Database Errors

```json
{
  "success": false,
  "error": "User with this email already exists"
}
```

### Rate Limit Errors

```json
{
  "success": false,
  "error": "Too many requests from this IP, please try again after 15 minutes"
}
```

---

## 🔮 Future Enhancements

- [ ] **Comments System** - Allow users to comment on posts
- [ ] **Likes/Reactions** - Enable post likes and reactions
- [ ] **User Profiles** - Extended user profile with bio, avatar
- [ ] **Email Verification** - Verify email on registration
- [ ] **Password Reset** - Forgot password functionality
- [ ] **Refresh Tokens** - Implement token refresh mechanism
- [ ] **Image Upload** - Support for post cover images
- [ ] **Markdown Support** - Render markdown in post content
- [ ] **Categories** - Organize posts into categories
- [ ] **Analytics** - Track post views and engagement
- [ ] **Social Sharing** - Share posts on social media
- [ ] **Export Data** - Export user data (GDPR compliance)
- [ ] **Admin Dashboard** - Web interface for administration
- [ ] **Webhooks** - Notify external services on events

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Write clear, descriptive commit messages
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ⚠️ Liability and warranty limitations

---

## 👨‍💻 Author

**Blazehue**
- GitHub: [@Blazehue](https://github.com/Blazehue)
- Repository: [RestAPIBlog](https://github.com/Blazehue/RestAPIBlog)

---

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [MongoDB](https://www.mongodb.com/) - Document database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [JWT.io](https://jwt.io/) - JSON Web Token debugger
- [Postman](https://www.postman.com/) - API development environment
- The Node.js community for excellent documentation and support

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [documentation](#-api-documentation)
2. Search [existing issues](https://github.com/Blazehue/RestAPIBlog/issues)
3. Create a [new issue](https://github.com/Blazehue/RestAPIBlog/issues/new)

---

## ⭐ Show Your Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🍴 Forking for your own use
- 📢 Sharing with others
- 🐛 Reporting bugs
- 💡 Suggesting new features

---

**Made with ❤️ and ☕ by Blazehue**
