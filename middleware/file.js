const multer = require('multer');
const sharp = require('sharp');
const AppError = require('./../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: process.env.MAX_SIZE_2 },
  fileFilter: multerFilter
});

exports.uploadPhoto = upload.single('file');

exports.resizePhoto = async (req, res, next) => {
  try {
    if (!req.file) return next();

    req.file.filename = `post-coverimage-${req.post._id}-${req.user.id}.jpeg`;
  
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/posts/${req.file.filename}`);
  
    next();
  } catch (err) {
    return next(new AppError(err, 404));
  }
};