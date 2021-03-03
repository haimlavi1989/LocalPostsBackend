const mongoose = require('mongoose');


const ObjectId = mongoose.Schema.ObjectId;

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: ObjectId,
      ref: 'Post',
      required: [true, 'Like must belong to a Post.']
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: [true, 'Like must belong to a user']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

likeSchema.index({ post: 1, user: 1 }, { unique: true });

const Like = mongoose.model('like', likeSchema);

module.exports = Like;
