const express = require('express');
const Router = express.Router();
const postsController = require('./../controllers/postsController');

//Router.param('id', postsController.checkId);

Router.route('/')
  .get(postsController.getAllPosts)
  .post(postsController.createPost);
Router.route('/:id')
  .get(postsController.getPost)
  .patch(postsController.updatePost)
  .delete(postsController.deletePost);

module.exports = Router;
