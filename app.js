const express = require('express');
const postsRoutes = require('./routes/postsRoutes');

const app = express();

// midllware - enable request body
app.use(express.json());

app.use('/api/v1/posts', postsRoutes);

module.exports = app;
