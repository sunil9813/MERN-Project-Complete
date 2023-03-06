const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        qunatity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      require: true,
    },
    address: {
      type: Object,
      require: true,
    },
    status: {
      type: Number,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("order", OrderSchema)
