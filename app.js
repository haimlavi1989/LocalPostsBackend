const express = require('express');
const postsRoutes = require('./routes/postsRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// midllware - enable request body
app.use(express.json());

app.use('/api/v1/posts', postsRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
