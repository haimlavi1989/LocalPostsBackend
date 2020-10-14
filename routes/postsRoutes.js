const express = require('express');
const Router = express.Router();
const postsController = require('./../controllers/postsController');
const authController = require('./../controllers/authController');

//Router.param('id', postsController.checkId);

Router.route('/')
  .get(postsController.getAllPosts)
  .post(authController.protect, postsController.createPost);
Router.route('/:id')
  .get(postsController.getPost)
  .patch(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    postsController.updatePost
  )
  .delete(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    postsController.deletePost
  );

// /distances?distance=233&center=-40,45&unit=km
// /distances/233/center/-40,45/unit/km
Router.route('/distances/:distance/center/:latlng/unit/:unit').get(
  postsController.getDistances
);

module.exports = Router;
