const express = require("express")
const router = express.Router()
const { createProduct, getProduct, getProducts, deleteProduct, updateProduct, getAllProducts, getAdminProducts } = require("../controllers/productController")
const { protect, verifyTokenAndAdmin } = require("../middleWare/authMiddleWare")
const { upload } = require("../utils/fileUpload")

router.post("/", protect, upload.single("image"), createProduct)
router.get("/", protect, getProducts)
router.get("/allproduct", getAllProducts)
router.get("/:id", protect, getProduct)
router.delete("/:id", protect, deleteProduct)
router.patch("/:id", protect, upload.single("image"), updateProduct)

// for admin only
router.get("/admin/products", protect, verifyTokenAndAdmin("admin"), getAdminProducts)

module.exports = router
