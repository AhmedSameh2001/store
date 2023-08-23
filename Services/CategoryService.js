// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewars/uploadImageMiddleware");
const Category = require("../models/categoryModel");

// Upload single image
exports.uploadCategoryImage = uploadSingleImage("image");

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/Categories/${filename}`);

    // Save image into our db
    req.body.image = filename;
  }
  next();
});

// Get list of categories
exports.getCategories = factory.getAll(Category);

// Get specific category by id
exports.getCategory = factory.getOne(Category);

// Create category
exports.createCategory = factory.createOne(Category);

// Update specific category
exports.updateCategory = factory.updateOne(Category);

// Delete specific category
exports.deleteCategory = factory.deleteOne(Category);

//لما استخدم الشارب لازم اتعامل مع المومري ستوريج عشان المومري ستوريج برجع بافر
//DiskStorage => بترجعش بافر بعكس المومري ستوريج

// 1) DiskStorage Engin:

// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/Categories");
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1];
//     const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
//     cb(null, filename);
//   },
// });

// 2) MemoryStrorage Engin:
// const multerStorage = multer.memoryStorage();

// const multerFilter = function (req, file, cb) {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new ApiError("only Image allowed", 400), false);
//   }
// };
// const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
