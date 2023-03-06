const express = require("express")
const router = express.Router()

const { getProducts, createProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReview, deleteProductReview, getAdminProducts } = require("../controllers/productController")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/verification")

router.post("/products/new", isAuthenticatedUser, createProduct)
router.get("/products", getProducts)
router.get("/products/:id", getSingleProduct)
router.put("/seller/products/:id", isAuthenticatedUser, updateProduct)
router.delete("/seller/products/:id", isAuthenticatedUser, deleteProduct)

router.put("/review", isAuthenticatedUser, createProductReview)
router.get("/reviews", isAuthenticatedUser, getProductReview)
router.delete("/reviews", isAuthenticatedUser, deleteProductReview)

// Access only for ---Admin
router.get("/admin/products", getAdminProducts)

module.exports = router
