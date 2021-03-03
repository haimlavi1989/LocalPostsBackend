const Post = require('./../models/postsModel');
const AppError = require('./../utils/appError');
const factory = require('./../controllers/handlerFactory');
const dateFormat = require('dateformat');
const multer = require('multer');
const { json } = require('body-parser');
const APIFeatures = require('./../utils/apiFeatures');

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

  distances = await Post.aggregate([
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

    {
      $lookup:{
        from: 'comments',
        localField: '_id',
        foreignField: 'post',
        as: 'posts_comments'
      }
    },

    {
      $lookup:{
        from: 'likes',
        localField: '_id',
        foreignField: 'post',
        as: 'posts_likes'
      }
    },

    {
      $lookup:{
        from: "likes",
        let: { post_item: "$_id" },
        pipeline: [
          {"$limit" : 1},
          { $match:
              { $expr:
                { $and:
                    [
                      { $eq: [ '$post',  { $convert: { input: '$$post_item', to: "objectId" } } ] },
                      { $eq: [ '$user',  { $convert: { input: req.user.id, to: "objectId" } } ] },
                    ]
                }
              }
          },
          { $project: { id: '$_id', _id: 0 } }
        ],
        as: "currentUserLike"
      }
    },

    { 
      $project: { 
      'id': '$_id',
      '_id': 0,
      'publishDate': 1,
      'subject': 1,
      'description': 1,
      'imageCover': 1,
      'distance': 1,
      'location': 1,
      'createdBy': 1,
      'numberOfComments': { $size: "$posts_comments" },
      'numberOfLikes': { $size: "$posts_likes" },
      'currentUserLike': 1,
      } 
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: distances,
  });
};
