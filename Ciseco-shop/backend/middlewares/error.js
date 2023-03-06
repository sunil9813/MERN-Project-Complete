const ErrorHandler = require("../utils/ErrorHandler")

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500

  if (process.env.NODE_ENV === "DEVELOPEMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    })
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err }

    error.message = err.message

    //Wrong Mongoose Object ID Error
    // suppose hami le wrong id enter gayo junchai DB xaina bhane teyoo error lai handle garxa
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`
      error = new ErrorHandler(message, 400)
    }

    //Handling Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message)
      error = new ErrorHandler(message, 400)
    }

    // Handling Mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`
      error = new ErrorHandler(message, 400)
    }

    // Handling wrong JWt Error
    if (err.name === "JsonWebTokenError") {
      const message = "Json web Token is invalid. Try Again!!"
      error = new ErrorHandler(message, 400)
    }

    // Handling Expired JWt Error
    if (err.name === "TokenExpiredError") {
      const message = "Json web Token is expired. Try Again!!"
      error = new ErrorHandler(message, 400)
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    })
  }
}
