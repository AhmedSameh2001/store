const mongoose = require("mongoose");

//create Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Name must unique "],
      minlength: [3, "Short Name"],
      maxlength: [30, "Long Name"],
    },
    //A and B => shopping.com/a-and-b
    sulg: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true } // add 2 feilds in collection work ( Created At & Updated At )
);
const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};
// findOne, findAll and update
categorySchema.post('init', (doc) => {
  setImageURL(doc);
});

// create
categorySchema.post('save', (doc) => {
  setImageURL(doc);
});
//create Model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
