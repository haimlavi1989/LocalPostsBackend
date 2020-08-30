const Post = require('./../models/postsModel');

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();

  res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
  });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
};

exports.createPost = async (req, res) => {
  const newPost = await Post.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      post: newPost,
    },
  });
};

exports.updatePost = async (req, res) => {
  const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      post: updatePost,
    },
  });
};

exports.deletePost = async (req, res) => {
  const newPost = await Post.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
