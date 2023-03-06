const Product = require("../models/productModle")
const catchAsyncError = require("../middlewares/catchAsyncError")
const ErrorHandler = require("../utils/ErrorHandler")
const AIPFeatures = require("../utils/features")
const cloudinary = require("cloudinary").v2

//Create new Product

const createProduct = catchAsyncError(async (req, res, next) => {
  // image upload
  let images = []
  if (typeof req.body.images === "string") {
    // if one image push it and it will be object
    images.push(req.body.images)
  } else {
    // if multiple image push it and it will array
    images = req.body.images
  }
  let imagesLinks = []

  for (let i = 0; i < images?.length; i++) {
    // upload image one by one
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "Ciseco-Shop/products",
    })
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    })
  }
  req.body.images = imagesLinks
  /* -------end here-------- */

  req.body.user = req.user.id

  // get all data from body and create new Product
  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    product,
  })
})

//get product
const getProducts = catchAsyncError(async (req, res, next) => {
  const perPage = 4
  const productsCount = await Product.countDocuments()

  //const apifeatures = new AIPFeatures(Product.find(), req.query).search().filter().pagination(perPage)
  const apifeatures = new AIPFeatures(Product.find(), req.query).search().filter()

  // if product is less than perpage dont show pagination
  let products = await apifeatures.query
  //console.log(products)
  let filteredProductsCount = products.length

  apifeatures.pagination(perPage)
  products = await apifeatures.query.clone()

  //setTimeout(() => {
  res.status(200).json({
    success: true,
    productsCount,
    perPage,
    filteredProductsCount,
    products,
    //count: products.length,
  })
  /* console.log("Total Product " + productsCount)
  console.log("Perpage Product " + perPage)
  console.log("Filter Product " + filteredProductsCount)*/
  //}, 2000)
})

//Get Single Product
const getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }

  res.status(200).json({
    success: true,
    product,
  })
})

//Update Product
const updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }

  // image upload
  let images = []
  if (typeof req.body.images === "string") {
    // if one image push it and it will be object
    images.push(req.body.images)
  } else {
    // if multiple image push it and it will array
    images = req.body.images
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images?.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    let imagesLinks = []

    for (let i = 0; i < images?.length; i++) {
      // upload image one by one
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "Ciseco-Shop/products",
      })
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      })
    }
    req.body.images = imagesLinks
  }

  /* -------end here-------- */

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    product,
  })
})

const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }

  //delete images from cloud
  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
  }
  await product.remove()

  res.status(200).json({
    success: true,
    message: "Product is Deleted.",
  })
})

// Create new review
const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  }

  const product = await Product.findById(productId)

  const isReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())

  // if review is add two time then 2nd time review will update 1st review
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment
        review.rating = rating
      }
    })
  } else {
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }

  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

  const saveData = await product.save({ validateBeforeSave: false })

  res.status(200).json({
    success: true,
    saveData,
  })
})

// Get product review of single product
const getProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id)

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  })
})

//Delete Product Review
const deleteProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId)

  const reviews = product.reviews.filter((review) => review._id.toString() !== req.query.id.toString())

  const numOfReviews = reviews.length

  const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )

  res.status(200).json({
    success: true,
    message: "Delete Successfully",
  })
})

// Access only for ---Admin
//Get all Products for admin
const getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find()

  res.status(200).json({
    success: true,
    products,
  })
})

module.exports = {
  getSingleProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReview,
  deleteProductReview,
  getAdminProducts,
}
