const Post = require('./../models/postsModel');
const AppError = require('./../utils/appError');
const factory = require('./../controllers/handlerFactory');
const dateFormat = require('dateFormat');
const multer = require('multer');
const { json } = require('body-parser');

exports.getAllPosts = factory.getAll(Post);
exports.getPost = factory.getOne(Post,);
//exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);

exports.createPost = async (req, res, next) => {
  try {
    const post = new Post({
      subject: req.body.subject,
      description: req.body.description,
      location: JSON.parse(req.body.location),
      //createdBy: req.user._id
    });
    
    req.post = await Post.create(post);
    next();
  } catch (err) {
    return next(new AppError(err, 500));
  }

}

exports.createPostResponse = async (req, res, next) => {
  try {
    let doc;
    if (req.file) {
      const filePath = {imageCover:`public/img/posts/${req.file.filename}`};
      doc = await Post.findByIdAndUpdate({ _id: req.post._id }, filePath, {
        runValidators: true
      });
    }

    doc = await Post.findById(req.post._id);

      res.status(201).json({
        status: 'success',
        data: {
          data: doc
        }
      });

  } catch (err) {
    return next(new AppError(err, 500));
  }

}

const createResponse = (doc, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
}

// /distances/:distance/center/:latlng/unit/:unit
// /distances/233/center/34.111745,-118.113491/unit/mi

exports.getDistances = async (req, res, next) => {
  const { latlng, unit } = req.params;
  let distance = req.params.distance * 1;
  const [lat, lng] = latlng.split(',');

  //const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat,lng.',
        400
      )
    );
  }

  const distances = await Post.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [ lat*1,  lng*1],
        },
        distanceField: 'distance',
        maxDistance: distance, //maximum distance in meters
      },
    },
  ]);

  // Add distance mark M - meter / KM - kelometer  
  const AddDistanceMark = (distance) => {
     let newDistance = Math.round(distance);
     if (newDistance >= 0 && newDistance < 1000) {
      newDistance = `${newDistance}${'M'}`; 
     } else if ( newDistance >= 1000 ) {
      newDistance = `${newDistance}${'KM'}`;  
     }
     return newDistance;
  }

  distances.forEach( (post) => {
    post.distance = AddDistanceMark(post.distance);
    post.publishDate = dateFormat(new Date(post.publishDate), "dd/mm/yyyy h:mmtt");
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
};
