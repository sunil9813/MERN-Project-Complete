const catchAsyncError = require("../middlewares/catchAsyncError")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

//console.log("KEY", process.env.STRIPE_SECRET_KEY)

//Process stripe payments
const processPayment = catchAsyncError(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",

    metadata: { integration_check: "accept_a_payment" },
  })

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  })
})

//Send stripe apikey
const sendStripeAPI = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  })
})

module.exports = {
  processPayment,
  sendStripeAPI,
}
