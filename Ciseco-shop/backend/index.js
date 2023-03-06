const app = require("./app")
const connectDB = require("./config/database")
const dotenv = require("dotenv").config()
const cloudinary = require("cloudinary").v2

//Handle uncaught exceptions
// This error is console.log(a) i.e here a is not define
process.on("uncaughtException", (err) => {
  console.log(`ERROR : ${err.stack}`)
  console.log(`ERROR : ${err.message}`)
  console.log("Shutting down server due to unaught exception.")
  process.exit(1)
})

//Connecting to Database
connectDB()

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//Handle Unhadled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR : ${err.message}`)
  console.log(`Shutting Down the server due to Unhandled Promise rejection`)
  server.close(() => {
    process.exit(1)
  })
})

//Setting up config file

//Setting up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEYS,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
})

//"start": "nodemon backend/index.js"
