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
        data: {
          data: doc
        }
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
        data: {
          data: doc
        }
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
        data: {
          data: doc
        }
      });

    } catch (err) {
      return next(new AppError(err, 500));
    }
  };

exports.getAll = (Model) => async (req, res, next) => {
    try { 
      const fullResoults = await Model.find().countDocuments();
      const features = new APIFeatures(Model.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      // const doc = await features.query.explain();
      const doc = await features.query;
  
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        fullResoults,
        results: doc.length,
        data: {
          data: doc
        }
      });

    } catch (err) {
      return next(new AppError(err, 500));
    }
  };
