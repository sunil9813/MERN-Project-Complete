const express = require("express")
const app = express()
const ErrorMiddleWare = require("./middlewares/error")
const cookieParser = require("cookie-parser")
const bodyparser = require("body-parser")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv").config()

app.use(express.json({ limit: "50mb" }))
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }))
app.use(cookieParser())
app.use(fileUpload())

//Import all routes
const productsRoute = require("./routes/product")
const usersRoute = require("./routes/user")
const ordersRoute = require("./routes/order")
const paymentRoute = require("./routes/payment")

app.use("/api", productsRoute)
app.use("/api", usersRoute)
app.use("/api", ordersRoute)
app.use("/api", paymentRoute)

//middleware to handle errors
app.use(ErrorMiddleWare)

module.exports = app
