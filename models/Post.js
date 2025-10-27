// Post model - Defines the schema for blog posts in the database
// References the User model for author information

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
    minlength: [10, 'Content must be at least 10 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
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
});

// Update the updatedAt timestamp before saving
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Limit tags to maximum of 5
postSchema.pre('save', function(next) {
  if (this.tags && this.tags.length > 5) {
    const err = new Error('Cannot have more than 5 tags');
    next(err);
  }
  next();
});

// Add indexes for frequently queried fields
postSchema.index({ author: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ status: 1 });
postSchema.index({ tags: 1 });

module.exports = mongoose.model('Post', postSchema);
