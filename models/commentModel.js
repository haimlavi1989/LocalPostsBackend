const mongoose = require('mongoose');


const ObjectId = mongoose.Schema.ObjectId;

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment can not be empty!']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    post: {
      type: ObjectId,
      ref: 'Post',
      required: [true, 'Comment must belong to a Post.']
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
