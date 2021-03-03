const Like = require('../models/likeModel');
const factory = require('./handlerFactory');

exports.setPostUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.post) req.body.post = req.params.post;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllLikes = factory.getAll(Like, "user");
exports.getLike = factory.getOne(Like);
exports.createLike = factory.createOne(Like);
exports.updateLike = factory.updateOne(Like);
exports.deleteLike = factory.deleteOne(Like);
