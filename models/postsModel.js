const mongoose = require('mongoose');
const dateFormat = require('dateformat');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
    select: false,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const ObjectId = mongoose.Schema.ObjectId;

const postsSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'A post must have title'],
  },
  imageCover: {
    type: String,
    default: '',
  },
  images: [String],
  description: {
    type: String,
    required: [true, 'A post must have text'],
  },
  publishDate: {
    type: Date,
    default: Date(),
  },
  location: {
    type: pointSchema,
    index: '2dsphere',
  },
  createdAt: {
    type: Date,
    default: Date(),
    select: false,
  },
  createdBy: {
    type: ObjectId,
    ref: 'User',
    select: false,
  },
});

const Post = mongoose.model('Post', postsSchema);

module.exports = Post;
