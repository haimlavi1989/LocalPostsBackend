const Post = require('./../models/postsModel');
const AppError = require('./../utils/appError');
const factory = require('./../controllers/handlerFactory');


exports.getAllPosts = factory.getAll(Post);
exports.getPost = factory.getOne(Post,);
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);

// /distances/:distance/center/:latlng/unit/:unit
// /distances/233/center/34.111745,-118.113491/unit/mi

exports.getDistances = async (req, res, next) => {
  const { latlng, unit } = req.params;
  let distance = req.params.distance * 1;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

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
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
        maxDistance: distance,
        distanceMultiplier: multiplier,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
};
