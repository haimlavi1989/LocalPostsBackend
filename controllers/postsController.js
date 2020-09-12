const Post = require('./../models/postsModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./..//utils/appError');

exports.getAllPosts = async (req, res, next) => {
  /*
  const features = await new APIFeatures(Post.find(), req.qurey).sort();
  // Execute query
  const posts = await features.qurey;
  */
  try {
    const posts = await Post.find();

    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    });
  } catch (err) {
    return next(new AppError(err, 404));
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    return next(new AppError(err, 404));
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        post: updatePost,
      },
    });
  } catch (err) {
    return next(new AppError(err, 404));
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const newPost = await Post.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    return next(new AppError(err, 404));
  }
};
