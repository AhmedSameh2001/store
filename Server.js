const path = require('path');

const express = require("express");

// for middleware
const morgan = require("morgan");

// for config.env
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });

const dbConnection = require("./Config/database");
const ApiError = require("./Utils/ApiError");
const globalError = require("./middlewars/ErrorMiddleware");

//Route
const categoryRouter = require("./Routes/CategoryRoute");
const subCategoryRouter = require("./Routes/subCategoryRoute");
const brandRouter = require("./Routes/BrandRoute");
const productRouter = require("./Routes/productRoute");
const userRoute = require('./Routes/userRoute');
const authRoute = require('./Routes/authRoute');

//connect with db
dbConnection();

//express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

//Mount Route
app.use("/api/V1/categories", categoryRouter);
app.use("/api/V1/subCategories", subCategoryRouter);
app.use("/api/V1/brands", brandRouter);
app.use("/api/V1/products", productRouter);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);

// لكل راوت مش مودود بدخل هان وبعدين بتم ارساله لل  (Error Handler Middleware)
app.all("*", (req, res, next) => {
  // create error and send it to error handling middleware
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
});

//Error Handler Middleware   (Global Error Handler Middleware)
app.use(globalError);

//Server run
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server Running port ${PORT}`);
});

//أي ايرور ممكن يصير برة الاكسبرس ممكن اعمل التالي , بشيل الكاتش تبعت مثلا الاتصال عالداتابيز(برة الاكسبرس)
// Events -> list -> callback(error)
// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting down...");
    process.exit(1);
  });
});