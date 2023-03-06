const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter product name"],
    trim: true,
    //maxLength: [300, "Product name cannot be longer than 100 characters"],
  },
  price: {
    type: Number,
    require: [true, "Please enter product price"],
    maxLength: [5, "Product name cannot be longer than 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    require: [true, "Please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  sku: {
    type: String,
    require: true,
    default: "SKU",
    trime: true,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please select category for this product"],
    enum: {
      values: ["Electronics", "Laptop", "Smartphones", "Sports", "Television", "video devices", "Food", "Gaming", "Books", "Shoes", "Beautys/Health", "Accessories", "Outdoor", "Home", "Grocery", "Toys", "Furniture", "Kitchen", "Plant", "Cloth"],
      message: "Please select a correct category for this products.",
    },
  },
  seller: {
    type: String,
    require: [true, "Please enter product owner name"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock "],
    maxLength: [5, "Product name cannot be longer than 5 characters"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model("Porduct", productSchema)
