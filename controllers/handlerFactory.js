const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = (Model) => async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);

      if (!doc) {
        return next(new AppError('No document found with that ID', 404));
      }
  
      res.status(204).json({
        status: 'success',
        data: null
      });

    } catch (err) {
      return next(new AppError(err, 500));
    }
  };

exports.updateOne = (Model) => async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      if (!doc) {
        return next(new AppError('No document found with that ID', 404));
      }
  
      res.status(200).json({
        status: 'success',
        data: doc
      });

    } catch (err) {
      return next(new AppError(err, 500));
    }
  };

exports.createOne = (Model) => async (req, res, next) => {
    try {
      const doc = await Model.create(req.body);

      res.status(201).json({
        status: 'success',
        data: doc
      });

    } catch (err) {
      return next(new AppError(err, 500));
    }
  };

exports.getOne = (Model, popOptions) => async (req, res, next) => {

    try {
      let query = Model.findById(req.params.id);
      if (popOptions) query = query.populate(popOptions);
      const doc = await query;
  
      if (!doc) {
        return next(new AppError('No document found with that ID', 404));
      }
  
      res.status(200).json({
        status: 'success',
        data: doc
      });

    } catch (err) {
      return next(new AppError(err, 500));
    }
  };

exports.getAll = (Model, popOptions) => async (req, res, next) => {
    try {
      
      // To allow for nested GET comm on post (hack)
      let filter = {};
      if (req.params.postId) filter = { post: req.params.postId };

      const fullResoults = await Model.find(filter).countDocuments();
      const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      // const doc = await features.query.explain();
      let doc = features.query;
      if (popOptions) doc = doc.populate(popOptions);
      doc = await doc;
  
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        fullResoults,
        results: doc.length,
        data: doc
      });

    } catch (err) {
      return next(new AppError(err, 500));
    }
  };
