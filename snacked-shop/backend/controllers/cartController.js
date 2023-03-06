const asyncHandler = require("express-async-handler")
const Cart = require("../model/cart")

// Create Cart
const createCart = asyncHandler(async (req, res) => {
  //res.send("Create Cart")
  const newCart = new Cart(req.body)

  try {
    const savedCart = await newCart.save()
    res.status(200).json(savedCart)
    throw new Error("Product is addes in Cart.")
  } catch (error) {
    res.status(500).json(error)
  }
})

/*// Create Product
const createProduct = asyncHandler(async (req, res) => {
  res.send("login User")
})*/

module.exports = {
  createCart,
}
