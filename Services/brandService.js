const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require('sharp');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewars/uploadImageMiddleware');
const Brand = require('../models/brandModel');

// Upload single image
exports.uploadBrandImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brands-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${filename}`);

  // Save image into our db 
   req.body.image = filename;

  next();
});

// Get list of brands
exports.getBrands = factory.getAll(Brand);

// Get specific brand by id
exports.getBrand = factory.getOne(Brand);

// Create brand
exports.createBrand = factory.createOne(Brand);

// Update specific brand
exports.updateBrand = factory.updateOne(Brand);

// Delete specific brand
exports.deleteBrand = factory.deleteOne(Brand);