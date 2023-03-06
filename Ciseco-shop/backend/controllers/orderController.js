const Order = require("../models/orderModel")
const Product = require("../models/productModle")
const catchAsyncError = require("../middlewares/catchAsyncError")
const ErrorHandler = require("../utils/ErrorHandler")

//create a new Order
const newOrder = catchAsyncError(async (req, res, next) => {
  const { shippingInfo, orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentInfo } = req.body

  const order = await Order.create({
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  })

  res.status(200).json({
    success: true,
    order,
  })
})

//Get login user Order
const loggedInUserOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id })

  res.status(200).json({
    success: true,
    orders,
  })
})

//Get Single Order
const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email")

  if (!order) {
    return next(new ErrorHandler("No order Found withh this ID", 404))
  }

  res.status(200).json({
    success: true,
    order,
  })
})

/*--------------Access only for --Admin ---------- */
//Get All Order  --By Admin
const getAllOrderByAdmin = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find()

  let totalAmount = 0
  orders.forEach((order) => {
    totalAmount += order.totalPrice
  })

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  })
})

//update Order --By Admin
const updateOrderByAdmin = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (order?.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have alredy delivered this order", 400))
  }

  order?.orderItems.forEach(async (item) => {
    await updateStock(item?.product, item?.qunatity)
  })

  order.orderStatus = req.body.status
  order.deliveredAt = Date.now()

  await order.save()

  res.status(200).json({
    success: true,
  })
})

async function updateStock(id, qunatity) {
  const product = await Product.findById(id)

  product.stock = product.stock - qunatity

  await product.save({ validateBeforeSave: false })
}

//Delete Order --By Admin
const deleteOrderByAdmin = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorHandler("No order Found withh this ID", 404))
  }

  await order.remove()

  res.status(200).json({
    success: true,
    message: "Order Delete Successfully.",
  })
})

module.exports = {
  newOrder,
  getSingleOrder,
  loggedInUserOrders,
  getAllOrderByAdmin,
  updateOrderByAdmin,
  deleteOrderByAdmin,
}
