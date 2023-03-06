const express = require("express")
const router = express.Router()
const { processPayment, sendStripeAPI } = require("../controllers/paymentController")

const { isAuthenticatedUser } = require("../middlewares/verification")

router.post("/payment/process", isAuthenticatedUser, processPayment)
router.get("/stripeapi", isAuthenticatedUser, sendStripeAPI)

module.exports = router
