const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Electronics",
        "Clothing",
        "Home & Kitchen",
        "Beauty & Personal Care",
        "Books",
        "Sports & Outdoors",
        "Toys & Games",
        "Grocery",
        "Furniture",
        "Automotive",
      ],
    },
    imageUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
