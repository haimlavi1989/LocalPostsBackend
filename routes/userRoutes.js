const express = require('express');
const Router = express.Router();
const authController = require('./../controllers/authController');

Router.post('/signup', authController.signup);
Router.post('/login', authController.login);

Router.post('/forgotPassword', authController.forgotPassword);
Router.patch('/resetPassword/:token', authController.resetPassword);

/*
Router.route('/')
  .get(postsController.getAllUsers)
  .post(postsController.createUser);
Router.route('/:id')
  .get(postsController.getUser)
  .patch(postsController.updateUser)
  .delete(postsController.deleteUser);
*/
module.exports = Router;
