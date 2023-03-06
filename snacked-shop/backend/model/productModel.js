const mongoose = require("mongoose")

/* 
When type is string 
trime: true,
"ABC " , "     ABC  ", ==> "ABC"
*/
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    name: {
      type: String,
      require: [true, "Please add a product name"],
      trime: true,
    },
    // sku = unique number to identify
    sku: {
      type: String,
      require: true,
      default: "SKU",
      trime: true,
    },
    category: {
      type: Array,
      require: [true, "Please add a category"],
      trime: true,
    },
    quantity: {
      type: String,
      require: [true, "Please add a quantity"],
    },
    price: {
      type: String,
      require: [true, "Please add a price"],
    },
    description: {
      type: String,
      require: [true, "Please add a description"],
      trime: true,
    },
    size: {
      type: Array,
      //require: [true, "Please add a size"],
    },
    color: {
      type: Array,
      require: [true, "Please add a color"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [String],
      default: [],
    },
    image: {
      type: Object,
      default: {},
    },
    /*images: [
      {
        public_id: {
          type: String,
          require: true,
        },
        url: {
          type: String,
          require: true,
        },
      },
    ],*/
    /*seller: {
      type: String,
      require: [true, "Please enter product seller"],
    },*/
    numOfReviews: {
      type: Number,
      default: 0,
    },
    /* reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          require: true,
        },
        name: {
          type: String,
          require: true,
        },
        rating: {
          type: Number,
          require: true,
        },
        comment: {
          type: String,
          // require: true,
        },
        time: {
          type: Date,
          default: Date.now(),
        },
      },
    ],*/
  },
  { timestamps: true }
)

const product = mongoose.model("Product", productSchema)
module.exports = product
