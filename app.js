const express = require('express');
const postsRoutes = require('./routes/postsRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Start express app
const app = express();

// Enable request body
app.use(express.json());

// ****** Security ******

// Set security HTTP headers
app.use(helmet());
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
// Preventing Parameter Pollution
app.use(hpp());

// Routes
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
