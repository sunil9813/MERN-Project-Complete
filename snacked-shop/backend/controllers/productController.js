const asyncHandler = require("express-async-handler")
const Product = require("../model/productModel")
const { fileSizeFormatter } = require("../utils/fileUpload")
const cloudinary = require("cloudinary").v2

// Create Product
const createProduct = asyncHandler(async (req, res) => {
  //  res.send("Create Product")
  //accept data from body
  const { name, sku, category, quantity, price, description, size, color } = req.body

  // validation
  if (!name || !category || !quantity || !price || !description || !size || !color) {
    res.status(400) // Bad request
    throw new Error("Please fill in all fields")
  }

  // Handle Image upload
  let fileData = {}

  if (req.file) {
    //step : 2 save image to cloudinary
    let uploadedFile
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Snacked Shop",
        resource_type: "image",
      })
    } catch (error) {
      res.status(500)
      throw new Error("image cloud not be uploaded")
    }

    // step : 1
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      filSize: fileSizeFormatter(req.file.size, 2),
      // fileSize: req.file.size, // file ko size chai byte ma dinxa so we have to convert into KB
    }
  }
  //create product in DB
  const product = await Product.create({
    // property we want to create in product
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    size,
    color,
    image: fileData,
  })
  res.status(201).json(product)
})

/*const createProduct = asyncHandler(async (req, res) => {
  //  res.send("Create Product")
  //accept data from body
  const { name, sku, category, quantity, price, description, size, color } = req.body

  // validation
  if (!name || !category || !quantity || !price || !description || !color) {
    res.status(400) // Bad request
    throw new Error("Please fill in all fields")
  }

  let images = []

  if (typeof req.body.images === "string") {
    images.push(req.body.images)
  } else {
    images = req.body.images
  }

  // Handle Image upload
  const imagesLinks = []

  for (let i = 0; i < images?.length; i++) {
    const result = await cloudinary.v2.uploder.upload(images[i], {
      folder: "Snacked Shop",
    })

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    })
  }
  req.body.images = imagesLinks
  //create product in DB
  const product = await Product.create({
    // property we want to create in product
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    size,
    color,
    images: imagesLinks,
  })
  res.status(201).json(product)
})*/

// Get All Product of User
const getProducts = asyncHandler(async (req, res) => {
  //res.send("Get All Product")
  const products = await Product.find({ user: req.user.id }).sort("-createdAt")
  res.status(200).json(products)
})

// Get All Product
const getAllProducts = asyncHandler(async (req, res) => {
  //localhost:5000/api/products/allproduct?new=true
  const qNew = req.query.new // search by new=true
  const qCat = req.query.category // search by product?category=man

  try {
    let products
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5)
    } else if (qCat) {
      products = await Product.find({
        category: {
          $in: [qCat],
        },
      })
    } else {
      products = await Product.find()
    }
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
  /*const products = await Product.find().sort("-createdAt")
  res.status(200).json(products)*/
})

// Get Single Product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  //if product doesn't exits
  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }

  //match product to user
  if (product.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }
  res.status(200).json(product)
})

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  //if product doesn't exits
  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }

  //match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  await product.remove()
  res.status(200).json({ message: "Product has been Deleted." })
})

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  //accept data from body
  const { name, category, quantity, price, description, size, color } = req.body
  const { id } = req.params

  const product = await Product.findById(id)

  //if product doesn't exits
  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }

  //match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  // Handle Image upload
  let fileData = {}

  if (req.file) {
    //step : 2 save image to cloudinary
    let uploadedFile
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Snacked Shop",
        resource_type: "image",
      })
    } catch (error) {
      res.status(500)
      throw new Error("image cloud not be uploaded")
    }

    // step : 1
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      filSize: fileSizeFormatter(req.file.size, 2),
      // fileSize: req.file.size, // file ko size chai byte ma dinxa so we have to convert into KB
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      size,
      color,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  )
  res.status(200).json(updatedProduct)
})

// only access for admin
// get all product
const getAdminProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
  res.status(200).json(products)
})

module.exports = {
  createProduct,
  getProducts,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getAdminProducts,
}
