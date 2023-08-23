const mongoose = require("mongoose");

//create Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand is required"],
      unique: [true, "Brand must unique "],
      minlength: [3, "Short Brand Name"],
      maxlength: [30, "Long Brand Name"],
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
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};
brandSchema.post('init', (doc) => {
  setImageURL(doc);
});

brandSchema.post('save', (doc) => {
  setImageURL(doc);
});

//create Model
const brand = mongoose.model("Brand", brandSchema);

module.exports = brand;
