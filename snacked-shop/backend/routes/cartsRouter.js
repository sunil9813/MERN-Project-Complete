const express = require("express")
const { createCart } = require("../controllers/cartController")
const { protect } = require("../middleWare/authMiddleWare")
const router = express.Router()

router.post("/", protect, createCart)

module.exports = router
