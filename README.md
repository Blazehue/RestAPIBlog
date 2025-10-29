# 📚 Blog REST API - Enhanced Edition

> A production-ready RESTful API for a modern blog platform with advanced features, comprehensive security, real-time capabilities, and enterprise-grade architecture.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green.svg)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Enhanced Features

### 🆕 New Capabilities
- 🔄 **Real-time Updates** - WebSocket support for live notifications and collaboration
- 📸 **Media Management** - Image/video upload with automatic optimization and CDN integration
- 🌐 **Multi-language Support** - i18n for global audience
- 🔍 **Elasticsearch Integration** - Advanced full-text search with fuzzy matching
- 📊 **Analytics Dashboard** - Post views, engagement metrics, and user insights
- 💬 **Comments & Reactions** - Nested comments with emoji reactions
- 🔖 **Bookmarks & Reading Lists** - Save posts for later reading
- 👥 **Social Features** - Follow authors, activity feeds
- 📧 **Email Notifications** - Transactional emails with templates
- 🎨 **Rich Text Editor** - Markdown, HTML, and WYSIWYG support
- 🔐 **2FA Authentication** - TOTP-based two-factor authentication
- 🌙 **Dark Mode API** - User preference support
- 📱 **Mobile Optimized** - Responsive data structures
- 🔄 **Versioning** - API versioning (v1, v2)
- 🧪 **Test Coverage** - 90%+ code coverage with Jest

### 🛡️ Enhanced Security
- ✅ **Rate Limiting Tiers** - Different limits per user role
- 🔒 **CSRF Protection** - Cross-site request forgery prevention
- 🛡️ **SQL Injection Prevention** - NoSQL query sanitization
- 🔐 **Password Policy** - Configurable complexity requirements
- 🚫 **IP Whitelisting** - Admin route protection
- 📝 **Audit Logging** - Complete action history
- 🔑 **API Key Management** - For third-party integrations
- 🔄 **Token Rotation** - Automatic refresh token rotation
- 🛑 **Account Lockout** - Brute force protection
- 🔍 **Security Headers** - Helmet.js with strict CSP

### ⚡ Performance Optimizations
- 🚀 **Redis Caching** - Response caching and session storage
- 📦 **Database Indexing** - Optimized compound indexes
- 🔄 **Query Optimization** - Lean queries and field selection
- 📊 **Connection Pooling** - Efficient database connections
- 🗜️ **Response Compression** - Gzip/Brotli compression
- 🎯 **Lazy Loading** - Paginated and cursor-based pagination
- 📈 **Performance Monitoring** - APM integration ready

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18.0 or higher
- **MongoDB** v6.0 or higher (with replica set for transactions)
- **Redis** v7.0 or higher (for caching and sessions)
- **npm** v9.0 or higher (or yarn/pnpm)

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

# 4. Initialize database with indexes
npm run db:init

# 5. Run database migrations
npm run migrate

# 6. Seed initial data (optional)
npm run seed

# 7. Start Redis server
redis-server

# 8. Start the server
npm run dev
```

The API will be available at `http://localhost:5000/api/v1`

---

## ⚙️ Enhanced Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=production
PORT=5000
API_VERSION=v1
BASE_URL=https://api.yourdomain.com

# Database
MONGO_URI=mongodb://localhost:27017/blog-api
MONGO_REPLICA_SET=rs0
MONGO_POOL_SIZE=50

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
REDIS_DB=0
CACHE_TTL=3600

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
JWT_EXPIRE=15m
JWT_REFRESH_SECRET=your_refresh_token_secret_minimum_32_characters
JWT_REFRESH_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Email Configuration (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=YourBlog

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,video/mp4

# AWS S3 (for production)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_BUCKET_NAME=your-bucket-name
AWS_REGION=us-east-1
CDN_URL=https://cdn.yourdomain.com

# Elasticsearch
ELASTICSEARCH_NODE=http://localhost:9200
ELASTICSEARCH_INDEX=blog_posts

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS_READER=50
RATE_LIMIT_MAX_REQUESTS_AUTHOR=100
RATE_LIMIT_MAX_REQUESTS_ADMIN=200
LOGIN_RATE_LIMIT=5

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=your_session_secret_minimum_32_characters
CSRF_SECRET=your_csrf_secret_minimum_32_characters
ENABLE_2FA=true
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_TIME=1800000

# CORS
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
CORS_CREDENTIALS=true

# Monitoring & Logging
LOG_LEVEL=info
SENTRY_DSN=your_sentry_dsn
DATADOG_API_KEY=your_datadog_key

# Feature Flags
ENABLE_COMMENTS=true
ENABLE_REACTIONS=true
ENABLE_BOOKMARKS=true
ENABLE_ANALYTICS=true
ENABLE_WEBSOCKET=true
ENABLE_SEARCH=true

# Pagination
DEFAULT_PAGE_SIZE=20
MAX_PAGE_SIZE=100

# Webhooks
WEBHOOK_SECRET=your_webhook_secret
```

### Enhanced Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MONGO_REPLICA_SET` | MongoDB replica set name | - | Yes (prod) |
| `REDIS_HOST` | Redis server host | `localhost` | Yes |
| `JWT_REFRESH_SECRET` | Refresh token secret | - | Yes |
| `SENDGRID_API_KEY` | Email service API key | - | No |
| `AWS_BUCKET_NAME` | S3 bucket for file storage | - | No |
| `ELASTICSEARCH_NODE` | Elasticsearch server URL | - | No |
| `ENABLE_2FA` | Enable two-factor auth | `false` | No |
| `MAX_LOGIN_ATTEMPTS` | Failed login limit | `5` | No |
| `SENTRY_DSN` | Error tracking DSN | - | No |

---

## 📂 Enhanced Project Structure

```
blog-rest-api/
├── src/
│   ├── config/
│   │   ├── database.ts           # MongoDB connection with pooling
│   │   ├── redis.ts              # Redis client configuration
│   │   ├── elasticsearch.ts      # Search engine setup
│   │   ├── aws.ts                # S3 and CDN configuration
│   │   ├── email.ts              # Email service setup
│   │   └── constants.ts          # Application constants
│   ├── controllers/
│   │   ├── v1/
│   │   │   ├── authController.ts
│   │   │   ├── postController.ts
│   │   │   ├── commentController.ts
│   │   │   ├── userController.ts
│   │   │   ├── mediaController.ts
│   │   │   ├── analyticsController.ts
│   │   │   └── bookmarkController.ts
│   │   └── v2/
│   │       └── postController.ts  # API v2 with new features
│   ├── middleware/
│   │   ├── auth.ts               # JWT & role verification
│   │   ├── cache.ts              # Redis caching layer
│   │   ├── errorHandler.ts       # Global error handler
│   │   ├── validation.ts         # Input validation chains
│   │   ├── rateLimiter.ts        # Tiered rate limiting
│   │   ├── sanitize.ts           # Input sanitization
│   │   ├── upload.ts             # File upload handler
│   │   ├── csrf.ts               # CSRF protection
│   │   ├── compression.ts        # Response compression
│   │   └── logger.ts             # Request logging
│   ├── models/
│   │   ├── User.ts               # Enhanced user schema
│   │   ├── Post.ts               # Enhanced post schema
│   │   ├── Comment.ts            # Comment system
│   │   ├── Reaction.ts           # Post reactions
│   │   ├── Bookmark.ts           # Saved posts
│   │   ├── Follow.ts             # User relationships
│   │   ├── Media.ts              # File metadata
│   │   ├── Analytics.ts          # Post analytics
│   │   └── AuditLog.ts           # Security audit trail
│   ├── routes/
│   │   ├── v1/
│   │   │   ├── auth.ts
│   │   │   ├── posts.ts
│   │   │   ├── comments.ts
│   │   │   ├── users.ts
│   │   │   ├── media.ts
│   │   │   ├── analytics.ts
│   │   │   └── bookmarks.ts
│   │   └── index.ts              # Route aggregator
│   ├── services/
│   │   ├── authService.ts        # Authentication logic
│   │   ├── emailService.ts       # Email sending
│   │   ├── searchService.ts      # Elasticsearch queries
│   │   ├── cacheService.ts       # Redis operations
│   │   ├── uploadService.ts      # File upload to S3
│   │   ├── analyticsService.ts   # Metrics tracking
│   │   └── notificationService.ts # Real-time notifications
│   ├── utils/
│   │   ├── errorResponse.ts      # Custom error classes
│   │   ├── logger.ts             # Winston logger
│   │   ├── helpers.ts            # Utility functions
│   │   ├── validators.ts         # Custom validators
│   │   └── encryption.ts         # Encryption utilities
│   ├── websocket/
│   │   ├── server.ts             # Socket.io setup
│   │   ├── handlers/
│   │   │   ├── notification.ts
│   │   │   └── collaboration.ts
│   │   └── middleware.ts         # WS authentication
│   ├── jobs/
│   │   ├── emailQueue.ts         # Background email jobs
│   │   ├── analyticsQueue.ts     # Analytics processing
│   │   └── cleanupQueue.ts       # Data cleanup
│   ├── types/
│   │   ├── express.d.ts          # Express type extensions
│   │   └── index.ts              # Global types
│   └── app.ts                    # Express app setup
├── tests/
│   ├── unit/
│   │   ├── models/
│   │   ├── services/
│   │   └── utils/
│   ├── integration/
│   │   ├── auth.test.ts
│   │   ├── posts.test.ts
│   │   └── comments.test.ts
│   └── e2e/
│       └── workflows.test.ts
├── migrations/
│   ├── 001_initial_indexes.js
│   └── 002_add_analytics.js
├── seeds/
│   └── initial_data.js
├── docs/
│   ├── API.md                    # API documentation
│   ├── DEPLOYMENT.md             # Deployment guide
│   └── CONTRIBUTING.md           # Contribution guide
├── .env.example
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── docker-compose.yml            # Docker setup
├── Dockerfile
├── jest.config.js                # Test configuration
├── tsconfig.json                 # TypeScript config
├── package.json
├── README.md
└── server.ts                     # Entry point
```

---

## 📖 Enhanced API Documentation

### Base URL
```
Production: https://api.yourdomain.com/api/v1
Development: http://localhost:5000/api/v1
```

### Enhanced Response Format

**Success Response with Metadata:**
```json
{
  "success": true,
  "data": { /* response data */ },
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    },
    "timestamp": "2025-10-29T12:00:00.000Z",
    "version": "v1"
  },
  "links": {
    "self": "/api/v1/posts?page=1",
    "next": "/api/v1/posts?page=2",
    "prev": null,
    "first": "/api/v1/posts?page=1",
    "last": "/api/v1/posts?page=8"
  }
}
```

**Enhanced Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format",
        "value": "invalid-email"
      }
    ],
    "timestamp": "2025-10-29T12:00:00.000Z",
    "path": "/api/v1/auth/register",
    "requestId": "req_abc123"
  }
}
```

---

## 🔐 Enhanced Authentication

### Register with Email Verification

**Endpoint:** `POST /api/v1/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "author",
  "acceptTerms": true,
  "newsletter": false
}
```

**Enhanced Validation:**
- Password: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
- Email: Disposable email detection
- Name: No special characters, 2-50 chars
- Accept terms must be true

**Success Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "author",
    "isVerified": false,
    "verificationEmailSent": true,
    "createdAt": "2025-10-29T10:00:00.000Z"
  },
  "message": "Registration successful. Please check your email to verify your account."
}
```

---

### Two-Factor Authentication Setup

**Endpoint:** `POST /api/v1/auth/2fa/setup`

**Authentication:** Required

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "secret": "JBSWY3DPEHPK3PXP",
    "qrCode": "data:image/png;base64,iVBORw0KGgo...",
    "backupCodes": [
      "1234-5678-9012",
      "2345-6789-0123",
      "3456-7890-1234"
    ]
  },
  "message": "Scan QR code with authenticator app and save backup codes securely."
}
```

**Verify 2FA:**
`POST /api/v1/auth/2fa/verify`
```json
{
  "token": "123456"
}
```

---

### Enhanced Login with 2FA

**Endpoint:** `POST /api/v1/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!",
  "twoFactorCode": "123456",
  "rememberMe": true
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "author",
      "avatar": "https://cdn.example.com/avatars/john.jpg",
      "isVerified": true,
      "has2FA": true,
      "preferences": {
        "theme": "dark",
        "language": "en",
        "notifications": true
      }
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 900,
      "tokenType": "Bearer"
    }
  }
}
```

---

### Refresh Token

**Endpoint:** `POST /api/v1/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 900
  }
}
```

---

### Password Reset Flow

**1. Request Reset:**
`POST /api/v1/auth/forgot-password`
```json
{
  "email": "john@example.com"
}
```

**2. Reset Password:**
`PUT /api/v1/auth/reset-password/:resetToken`
```json
{
  "password": "NewSecurePass123!"
}
```

---

## 📝 Enhanced Blog Posts

### Advanced Post Creation

**Endpoint:** `POST /api/v1/posts`

**Authentication:** Required (Author or Admin)

**Request Body:**
```json
{
  "title": "Getting Started with Express.js",
  "content": "# Introduction\n\nExpress is amazing...",
  "contentFormat": "markdown",
  "excerpt": "Learn how to build REST APIs",
  "coverImage": "https://cdn.example.com/images/express.jpg",
  "tags": ["javascript", "nodejs", "express"],
  "category": "tutorials",
  "status": "published",
  "publishedAt": "2025-10-29T14:00:00.000Z",
  "featured": false,
  "allowComments": true,
  "seo": {
    "metaTitle": "Express.js Tutorial",
    "metaDescription": "Complete guide to Express",
    "keywords": ["express", "nodejs", "api"],
    "canonicalUrl": "https://blog.example.com/express-tutorial"
  },
  "readingTime": 8,
  "language": "en"
}
```

**Enhanced Validation:**
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `contentFormat` | String | No | `markdown`, `html`, `plaintext` |
| `excerpt` | String | No | Max 300 chars |
| `coverImage` | String | No | Valid URL or upload ID |
| `category` | String | No | Must exist in categories |
| `publishedAt` | Date | No | Future scheduling allowed |
| `seo` | Object | No | SEO optimization fields |
| `readingTime` | Number | No | Auto-calculated if not provided |

---

### Advanced Search with Elasticsearch

**Endpoint:** `GET /api/v1/posts/search`

**Query Parameters:**
```http
GET /api/v1/posts/search?
  q=express nodejs&
  category=tutorials&
  tags=javascript,nodejs&
  author=507f1f77bcf86cd799439011&
  status=published&
  featured=true&
  language=en&
  minReadTime=5&
  maxReadTime=15&
  dateFrom=2025-01-01&
  dateTo=2025-12-31&
  sort=relevance&
  page=1&
  limit=20
```

**Advanced Features:**
- Fuzzy matching for typos
- Phrase search with quotes
- Boolean operators (AND, OR, NOT)
- Faceted search results
- Autocomplete suggestions
- Related posts

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "posts": [...],
    "facets": {
      "categories": {
        "tutorials": 45,
        "guides": 32,
        "news": 18
      },
      "tags": {
        "javascript": 89,
        "nodejs": 67,
        "express": 45
      },
      "authors": [
        {"id": "...", "name": "John Doe", "count": 12}
      ]
    },
    "suggestions": [
      "express.js tutorial",
      "express middleware",
      "express routing"
    ],
    "relatedQueries": [
      "nodejs framework",
      "express vs fastify"
    ]
  },
  "meta": {
    "query": "express nodejs",
    "took": 45,
    "total": 150,
    "maxScore": 8.5
  }
}
```

---

### Post Analytics

**Endpoint:** `GET /api/v1/posts/:id/analytics`

**Authentication:** Required (Post owner or Admin)

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "postId": "507f1f77bcf86cd799439011",
    "overview": {
      "totalViews": 12458,
      "uniqueVisitors": 8932,
      "totalReads": 7821,
      "averageReadTime": "6m 23s",
      "completionRate": 62.8,
      "bounceRate": 28.5,
      "totalReactions": 342,
      "totalComments": 89,
      "totalBookmarks": 156,
      "totalShares": 234
    },
    "traffic": {
      "sources": {
        "organic": 45.2,
        "direct": 28.3,
        "social": 18.7,
        "referral": 7.8
      },
      "topReferrers": [
        {"source": "google.com", "visits": 2341},
        {"source": "twitter.com", "visits": 1823}
      ]
    },
    "engagement": {
      "reactionBreakdown": {
        "like": 234,
        "love": 89,
        "insightful": 19
      },
      "commentsTrend": [
        {"date": "2025-10-01", "count": 12},
        {"date": "2025-10-02", "count": 15}
      ]
    },
    "audience": {
      "topCountries": [
        {"country": "US", "percentage": 42.5},
        {"country": "UK", "percentage": 18.3}
      ],
      "devices": {
        "desktop": 58.2,
        "mobile": 35.4,
        "tablet": 6.4
      }
    },
    "performance": {
      "bestPerformingDay": "Monday",
      "bestPerformingTime": "14:00-15:00",
      "peakViews": 1892,
      "peakDate": "2025-10-15"
    }
  }
}
```

---

## 💬 Comments System

### Add Comment

**Endpoint:** `POST /api/v1/posts/:postId/comments`

**Authentication:** Required

**Request Body:**
```json
{
  "content": "Great article! Very helpful.",
  "parentId": null,
  "mentions": ["507f1f77bcf86cd799439012"]
}
```

**Success Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "_id": "607f1f77bcf86cd799439021",
    "content": "Great article! Very helpful.",
    "author": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "avatar": "https://cdn.example.com/avatars/john.jpg"
    },
    "post": "507f1f77bcf86cd799439011",
    "parentId": null,
    "mentions": [...],
    "reactions": {
      "like": 0,
      "love": 0
    },
    "replies": [],
    "isEdited": false,
    "createdAt": "2025-10-29T12:00:00.000Z"
  }
}
```

---

### Get Comments with Threading

**Endpoint:** `GET /api/v1/posts/:postId/comments`

**Query Parameters:**
- `sort`: `newest`, `oldest`, `popular`
- `page`: Page number
- `limit`: Comments per page

**Success Response:** Returns threaded comments with nested replies

---

## 🎯 Reactions System

**Endpoint:** `POST /api/v1/posts/:postId/reactions`

**Request Body:**
```json
{
  "type": "like"
}
```

**Available Reactions:**
- `like` 👍
- `love` ❤️
- `insightful` 💡
- `celebrate` 🎉
- `curious` 🤔

---

## 🔖 Bookmarks & Reading Lists

### Bookmark Post

**Endpoint:** `POST /api/v1/bookmarks`

**Request Body:**
```json
{
  "postId": "507f1f77bcf86cd799439011",
  "collectionName": "To Read Later",
  "notes": "Check out the authentication section"
}
```

### Get Bookmarks

**Endpoint:** `GET /api/v1/bookmarks`

Returns organized reading lists with collections

---

## 👥 Social Features

### Follow Author

**Endpoint:** `POST /api/v1/users/:userId/follow`

### Get Activity Feed

**Endpoint:** `GET /api/v1/feed`

Returns personalized feed based on followed authors

---

## 📸 Media Management

### Upload Image/Video

**Endpoint:** `POST /api/v1/media/upload`

**Authentication:** Required

**Content-Type:** `multipart/form-data`

**Form Data:**
- `file`: Image or video file
- `type`: `post_cover`, `avatar`, `content_image`
- `optimize`: `true` (auto-resize and compress)

**Success Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "_id": "707f1f77bcf86cd799439031",
    "filename": "express-tutorial-cover.jpg",
    "originalName": "my-image.jpg",
    "mimeType": "image/jpeg",
    "size": 245678,
    "url": "https://cdn.example.com/uploads/express-tutorial-cover.jpg",
    "thumbnails": {
      "small": "https://cdn.example.com/uploads/express-tutorial-cover-sm.jpg",
      "medium": "https://cdn.example.com/uploads/express-tutorial-cover-md.jpg",
      "large": "https://cdn.example.com/uploads/express-tutorial-cover-lg.jpg"
    },
    "dimensions": {
      "width": 1920,
      "height": 1080
    },
    "uploadedBy": "507f1f77bcf86cd799439011",
    "createdAt": "2025-10-29T12:00:00.000Z"
  }
}
```

---

## 🔄 WebSocket Events

### Connection

```javascript
const socket = io('https://api.yourdomain.com', {
  auth: {
    token: 'your_jwt_token'
  }
});
```

### Subscribe to Events

```javascript
// New comment notification
socket.on('post:new-comment', (data) => {
  console.log('New comment on your post:', data);
});

// Post reaction
socket.on('post:reaction', (data) => {
  console.log('Someone reacted to your post:', data);
});

// New follower
socket.on('user:new-follower', (data) => {
  console.log('New follower:', data);
});

// Real-time collaboration
socket.on('post:editing', (data) => {
  console.log('Someone is editing:', data);
});
```

---

## 🛡️ Enhanced Security Features

### CSRF Protection

All state-changing requests require CSRF token:

```http
X-CSRF-Token: your_csrf_token_here
```

Get token: `GET /api/v1/csrf-token`

### API Keys for Third-Party

**Generate API Key:**
`POST /api/v1/auth/api-keys`

**Use API Key:**
```http
X-API-Key: your_api_key_here
```

### Audit Logs

**View Audit Trail:**
`GET /api/v1/admin/audit-logs`

Tracks:
- Login attempts
- Permission changes
- Content modifications
- Data exports
- Admin actions

---

## 📊 Enhanced Monitoring

### Health Check

**Endpoint:** `GET /api/v1/health`

**Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2025-10-29T12:00:00.000Z",
    "uptime": 86400,
    "version": "1.0.0",
    "services": {
      "mongodb": {
        "status": "connected",
        "responseTime": 5,
        "collections": 8
      },
      "redis": {
        "status": "connected",
        "responseTime": 2,
        "memory": "2.4GB"
      },
      "elasticsearch": {
        "status": "connected",
        "responseTime": 12,
        "indices": 3
      }
    },
    "metrics": {
      "requestsPerSecond": 145,
      "averageResponseTime": 87,
      "errorRate": 0.02,
      "activeConnections": 234
    }
  }
}
```

### System Metrics

**Endpoint:** `GET /api/v1/admin/metrics`

**Authentication:** Required (Admin only)

Returns detailed performance metrics, memory usage, and system health

---

## 🚀 Deployment Guide

### Docker Deployment

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGO_URI=mongodb://mongo:27017/blog-api
      - REDIS_HOST=redis
    depends_on:
      - mongo
      - redis
      - elasticsearch
    restart: unless-stopped

  mongo:
    image: mongo:6
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    restart: unless-stopped

  elasticsearch:
    image: elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    volumes:
      - es_data:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  mongo_data:
  redis_data:
  es_data:
```

**Build and Run:**
```bash
# Build image
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Scale application
docker-compose up -d --scale app=3

# Stop services
docker-compose down
```

---

### Production Deployment Checklist

#### Pre-Deployment
- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secrets (min 32 chars)
- [ ] Configure MongoDB replica set
- [ ] Set up Redis with password
- [ ] Configure SSL/TLS certificates
- [ ] Set up CDN for media files
- [ ] Configure email service (SendGrid)
- [ ] Set up monitoring (Sentry, Datadog)
- [ ] Configure backup strategy
- [ ] Set rate limits appropriately
- [ ] Enable CORS for production domains only
- [ ] Review security headers
- [ ] Set up log aggregation

#### Database Setup
```bash
# Initialize MongoDB replica set
mongo --eval "rs.initiate()"

# Create indexes
npm run db:init

# Run migrations
npm run migrate
```

#### Environment Configuration
```bash
# Generate secure secrets
openssl rand -base64 32

# Test configuration
npm run config:validate

# Run health checks
curl https://api.yourdomain.com/api/v1/health
```

---

### Kubernetes Deployment

**deployment.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: blog-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: blog-api
  template:
    metadata:
      labels:
        app: blog-api
    spec:
      containers:
      - name: api
        image: yourusername/blog-api:latest
        ports:
        - containerPort: 5000
        env:
        - name: NODE_ENV
          value: "production"
        - name: MONGO_URI
          valueFrom:
            secretKeyRef:
              name: blog-secrets
              key: mongo-uri
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: blog-secrets
              key: jwt-secret
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /api/v1/health
            port: 5000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/v1/health
            port: 5000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: blog-api-service
spec:
  selector:
    app: blog-api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 5000
  type: LoadBalancer
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test suite
npm test -- auth.test.ts

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Watch mode for development
npm run test:watch
```

### Test Coverage Requirements

- Unit tests: 90%+ coverage
- Integration tests: Critical paths
- E2E tests: Main user workflows

### Example Test

```typescript
import request from 'supertest';
import app from '../src/app';
import { connectDB, closeDB } from '../src/config/database';

describe('Auth API', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'SecurePass123!',
          acceptTerms: true
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.email).toBe('test@example.com');
    });

    it('should reject weak passwords', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'weak',
          acceptTerms: true
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
```

---

## 📚 Advanced Features

### Content Versioning

Track post revision history:

**Endpoint:** `GET /api/v1/posts/:id/versions`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "version": 3,
      "title": "Getting Started with Express.js",
      "content": "...",
      "editedBy": "John Doe",
      "editedAt": "2025-10-29T12:00:00.000Z",
      "changes": {
        "fieldsChanged": ["content", "tags"],
        "additions": 234,
        "deletions": 45
      }
    }
  ]
}
```

### Content Scheduling

Schedule posts for future publication:

```json
{
  "title": "Upcoming Tutorial",
  "content": "...",
  "status": "scheduled",
  "publishedAt": "2025-11-01T09:00:00.000Z"
}
```

### Webhooks

Subscribe to events:

**Endpoint:** `POST /api/v1/webhooks`

**Request Body:**
```json
{
  "url": "https://your-app.com/webhooks/blog",
  "events": ["post.published", "comment.created", "user.followed"],
  "secret": "your_webhook_secret"
}
```

**Webhook Payload:**
```json
{
  "event": "post.published",
  "timestamp": "2025-10-29T12:00:00.000Z",
  "data": {
    "postId": "507f1f77bcf86cd799439011",
    "title": "New Post Title",
    "author": {...}
  },
  "signature": "sha256=abc123..."
}
```

### Multi-tenancy Support

Support multiple blogs/organizations:

```http
X-Tenant-ID: org_abc123
```

### Export Data (GDPR Compliance)

**Endpoint:** `POST /api/v1/users/me/export`

Generates downloadable archive with all user data:
- Posts
- Comments
- Bookmarks
- Analytics
- Account info

---

## 🎨 Rich Text Editor Integration

### Supported Formats

1. **Markdown** (recommended)
   - GitHub Flavored Markdown
   - Code syntax highlighting
   - Tables, task lists
   - Emoji support

2. **HTML** (sanitized)
   - XSS protection
   - Allowed tags whitelist
   - Style sanitization

3. **WYSIWYG**
   - Draft.js compatible
   - Image embedding
   - Media embeds (YouTube, Twitter)

### Upload Images in Content

**Endpoint:** `POST /api/v1/posts/upload-inline`

Returns URL for embedding in content

---

## 📧 Email Templates

### Available Emails

1. **Welcome Email** - Account creation
2. **Email Verification** - Verify email address
3. **Password Reset** - Reset password link
4. **New Comment** - Notification of new comment
5. **New Follower** - Someone followed you
6. **Post Published** - Your post is live
7. **Weekly Digest** - Curated content summary
8. **Security Alert** - Suspicious activity

### Customize Templates

Templates stored in `templates/emails/`

Variables available:
- `{{userName}}`
- `{{postTitle}}`
- `{{actionUrl}}`
- `{{timestamp}}`

---

## 🌐 Internationalization (i18n)

### Supported Languages

- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Japanese (ja)
- Chinese (zh)

### Set Language

**Header:**
```http
Accept-Language: es
```

**Response:**
```json
{
  "success": true,
  "message": "Post creado exitosamente",
  "data": {...}
}
```

### Add New Language

1. Create translation file: `locales/it.json`
2. Add translations
3. Update supported languages config

---

## 🔧 Performance Optimization

### Caching Strategy

```javascript
// Cache configuration
const cacheConfig = {
  // Public posts - 5 minutes
  'GET /api/v1/posts': { ttl: 300, public: true },
  
  // User data - 1 minute
  'GET /api/v1/auth/me': { ttl: 60, private: true },
  
  // Search results - 15 minutes
  'GET /api/v1/posts/search': { ttl: 900, public: true },
  
  // Analytics - 1 hour
  'GET /api/v1/posts/:id/analytics': { ttl: 3600, private: true }
};
```

### Database Optimization

**Compound Indexes:**
```javascript
// Optimize post queries
postSchema.index({ status: 1, createdAt: -1 });
postSchema.index({ author: 1, status: 1, createdAt: -1 });
postSchema.index({ tags: 1, status: 1, createdAt: -1 });

// Text search
postSchema.index({ title: 'text', content: 'text' });
```

**Query Optimization:**
```javascript
// Use lean() for read-only queries
const posts = await Post.find()
  .lean()
  .select('title author tags createdAt')
  .limit(20);

// Avoid N+1 queries with populate
const posts = await Post.find()
  .populate('author', 'name email avatar')
  .exec();
```

### Response Compression

Automatic gzip/brotli compression enabled for:
- Text responses > 1KB
- JSON responses
- HTML content

### CDN Integration

Static assets served from CDN:
- Images: WebP format with fallbacks
- Videos: HLS streaming
- Fonts: Preloaded
- CSS/JS: Minified and bundled

---

## 📊 Monitoring & Alerting

### Metrics Tracked

1. **Performance Metrics**
   - Response times (p50, p95, p99)
   - Throughput (requests/sec)
   - Error rates
   - Database query times

2. **Business Metrics**
   - User registrations
   - Posts published
   - Active users
   - Engagement rates

3. **Infrastructure Metrics**
   - CPU usage
   - Memory usage
   - Disk I/O
   - Network traffic

### Alert Configuration

```javascript
const alerts = {
  // High error rate
  errorRate: {
    threshold: 5, // percentage
    window: 300, // 5 minutes
    severity: 'critical'
  },
  
  // Slow response times
  responseTime: {
    threshold: 1000, // ms
    percentile: 95,
    severity: 'warning'
  },
  
  // Database connection issues
  databaseDown: {
    severity: 'critical',
    notify: ['email', 'slack', 'pagerduty']
  }
};
```

### Integration Options

- **Sentry** - Error tracking
- **Datadog** - APM and metrics
- **New Relic** - Performance monitoring
- **Grafana** - Custom dashboards
- **Prometheus** - Metrics collection
- **ELK Stack** - Log aggregation

---

## 🔒 Security Best Practices

### Input Validation & Sanitization

```javascript
// All inputs validated and sanitized
import { body, param, query } from 'express-validator';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

// Prevent NoSQL injection
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());
```

### Security Headers

```javascript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https://cdn.example.com'],
      connectSrc: ["'self'", 'https://api.example.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### Password Security

- Bcrypt with 12 rounds (configurable)
- Password history (prevent reuse)
- Complexity requirements enforced
- Breached password detection (HaveIBeenPwned API)
- Account lockout after failed attempts

### Session Security

- HTTP-only cookies
- Secure flag in production
- SameSite cookie attribute
- Session rotation on privilege change
- Automatic logout after inactivity

---

## 🚦 Rate Limiting Details

### Tiered Rate Limits

| User Role | Endpoint | Limit | Window |
|-----------|----------|-------|--------|
| Anonymous | All routes | 50 req | 15 min |
| Reader | All routes | 100 req | 15 min |
| Author | All routes | 200 req | 15 min |
| Admin | All routes | 500 req | 15 min |
| All | Login | 5 req | 15 min |
| All | Password reset | 3 req | 1 hour |
| All | Email verification | 5 req | 1 hour |

### Custom Rate Limits

```javascript
// Apply custom rate limit to specific endpoint
import rateLimit from 'express-rate-limit';

const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 20 uploads per hour
  message: 'Too many uploads, please try again later'
});

app.post('/api/v1/media/upload', uploadLimiter, uploadController);
```

---

## 📖 API Versioning

### Current Versions

- **v1** - Current stable version
- **v2** - Beta (opt-in features)

### Version Selection

**URL Path:**
```http
GET /api/v1/posts
GET /api/v2/posts
```

**Header:**
```http
Accept-Version: v1
```

### Deprecation Policy

1. New version released
2. Old version supported for 6 months
3. Deprecation warnings added
4. Sunset headers included
5. Version retired after grace period

---

## 🎯 Best Practices

### API Design

1. **Use RESTful conventions**
   - GET for retrieval
   - POST for creation
   - PUT/PATCH for updates
   - DELETE for removal

2. **Consistent naming**
   - Use plural nouns for collections
   - Use kebab-case for URLs
   - Use camelCase for JSON fields

3. **Proper status codes**
   - 2xx for success
   - 4xx for client errors
   - 5xx for server errors

4. **Pagination for lists**
   - Always paginate collection endpoints
   - Include total count
   - Provide navigation links

5. **Filtering and sorting**
   - Support common filters
   - Allow multiple sort fields
   - Document all query parameters

### Database Design

1. **Indexing strategy**
   - Index frequently queried fields
   - Compound indexes for common queries
   - Monitor slow queries

2. **Data modeling**
   - Embed for 1:few relationships
   - Reference for 1:many relationships
   - Consider query patterns

3. **Validation**
   - Schema-level validation
   - Application-level validation
   - Consistent error messages

### Error Handling

1. **Descriptive messages**
2. **Unique error codes**
3. **Stack traces in development only**
4. **Log all errors**
5. **User-friendly responses**

---

## 🤝 Contributing

We love contributions! Here's how to get started:

### Development Setup

```bash
# Fork and clone
git clone https://github.com/yourusername/RestAPIBlog.git
cd RestAPIBlog

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.development

# Start development servers
npm run dev:services  # Start MongoDB, Redis, Elasticsearch
npm run dev          # Start API server
```

### Code Standards

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking (TypeScript)
npm run type-check
```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add comment reactions
fix: resolve authentication bug
docs: update API documentation
test: add unit tests for auth service
refactor: improve query performance
chore: update dependencies
```

### Pull Request Process

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Make changes and commit
3. Write/update tests
4. Update documentation
5. Push and create PR
6. Wait for review
7. Address feedback
8. Merge after approval

---

## 📚 Additional Resources

### Documentation

- [API Reference](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Contributing Guide](./docs/CONTRIBUTING.md)
- [Security Policy](./docs/SECURITY.md)
- [Changelog](./CHANGELOG.md)

### Example Implementations

- [React Frontend](https://github.com/Blazehue/blog-frontend-react)
- [Vue.js Frontend](https://github.com/Blazehue/blog-frontend-vue)
- [Mobile App (React Native)](https://github.com/Blazehue/blog-mobile)

### Tutorials

- [Getting Started Tutorial](./docs/tutorials/getting-started.md)
- [Authentication Deep Dive](./docs/tutorials/authentication.md)
- [Building a Blog Client](./docs/tutorials/blog-client.md)
- [Advanced Search Implementation](./docs/tutorials/search.md)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author & Maintainer

**Blazehue**
- GitHub: [@Blazehue](https://github.com/Blazehue)
- Repository: [RestAPIBlog](https://github.com/Blazehue/RestAPIBlog)
- Email: support@example.com
- Website: https://blazehue.dev

---

## 🌟 Star History

If this project helped you, please consider giving it a ⭐!

---

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Redis](https://redis.io/) - Caching layer
- [Elasticsearch](https://www.elastic.co/) - Search engine
- [Socket.io](https://socket.io/) - Real-time communication
- [JWT](https://jwt.io/) - Authentication
- [SendGrid](https://sendgrid.com/) - Email service
- [AWS S3](https://aws.amazon.com/s3/) - File storage
- The amazing open-source community

---

## 📞 Support & Community

### Get Help

- 📖 [Documentation](https://docs.example.com)
- 💬 [Discord Community](https://discord.gg/yourinvite)
- 🐦 [Twitter](https://twitter.com/blazehue)
- 📧 [Email Support](mailto:support@example.com)

### Report Issues

Found a bug or security issue?

- 🐛 [Bug Reports](https://github.com/Blazehue/RestAPIBlog/issues/new?template=bug_report.md)
- 🔒 [Security Issues](mailto:security@example.com) (private disclosure)
- 💡 [Feature Requests](https://github.com/Blazehue/RestAPIBlog/issues/new?template=feature_request.md)

---

## 📈 Roadmap

### Q4 2025
- [ ] GraphQL API support
- [ ] Real-time collaborative editing
- [ ] Advanced analytics dashboard
- [ ] Mobile SDK (iOS/Android)

### Q1 2026
- [ ] AI-powered content suggestions
- [ ] Multi-language content support
- [ ] Advanced SEO tools
- [ ] Content recommendation engine

### Q2 2026
- [ ] Blockchain-based content verification
- [ ] Decentralized storage option
- [ ] Advanced monetization features
- [ ] Enterprise SSO integration

---

**Made with ❤️ and ☕ by Blazehue**

*Last Updated: October 29, 2025*
