// export dependencies
const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const path = require("path")
const cors = require("cors")

// export Routes file
const userRoute = require("./routes/userRoute")
const productRoute = require("./routes/productRoute")
const errorHandler = require("./middleWare/errorMiddleWare")
const cartsRoute = require("./routes/cartsRouter")

const app = express()

// MiddleWares
app.use(express.json()) // it handle JSON data in our application
app.use(express.urlencoded({ extended: false })) // it handle data that come form url
app.use(bodyParser.json()) // when we send infomation from frontend to backend body-parser help use pass that infomation or data and convert it so that we can easliy access that data in backend
app.use(cookieParser())

//to exchange credentials
app.use(
  cors({
    origin: ["http://localhost:3000", "https://SNACKED_SHOP_MANAGEMENT.app"],
    credentials: true,
  })
)
// Before connect to monngose this is neccessary
const PORT = process.env.PORT || 5000

//Connect to DB
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })

//Routes Middleware
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartsRoute)

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

//error middleware
app.use(errorHandler)

// test
app.get("/", (req, res) => {
  res.send("Home Pages of Snacked Shop")
})
