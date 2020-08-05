const fs = require('fs');
const express = require('express');

const app = express();

// midllware - enable request body
app.use(express.json());

const port = 3000;
postsDataPath = `${__dirname}/dev-data/data/posts.json`;
const posts = JSON.parse(fs.readFileSync(postsDataPath));

app.get('/api/v1/posts', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
  });
});

app.get('/api/v1/posts/:id', (req, res) => {
  const id = req.params.id * 1;
  if (id > posts.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  const post = posts.find((el) => {
    return el.id === id;
  });
  console.log(post);
  console.log(id);
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

app.post('/api/v1/posts', (req, res) => {
  NewId = posts[posts.length - 1].id + 1;
  NewPost = Object.assign({ id: NewId }, req.body);
  posts.push(NewPost);
  fs.writeFile(postsDataPath, JSON.stringify(posts), (err) => {});
  res.status(201).json({
    status: 'success',
    results: posts.length,
    data: {
      post: NewPost,
    },
  });
});

app.listen(port, () => {
  console.log(`running on port:${port}`);
});
