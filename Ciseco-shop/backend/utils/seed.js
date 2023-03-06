const Product = require("../models/productModle")
const dotenv = require("dotenv").config()
const connectDB = require("../config/database")

const products = require("../data/product")

connectDB()

const seedProducts = async () => {
  try {
    await Product.deleteMany()
    console.log("Product deleted")

    await Product.insertMany(products)
    console.log("All Product are added.")

    process.exit()
  } catch (error) {
    console.log(error.message)
    process.exit()
  }
}

seedProducts()
