//Error Handler Class
//Error is parent class of ErrorHandler
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    // super() stant for the constructor of parent class in this case it will represent error class
    super(message)
    this.statusCode = statusCode

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = ErrorHandler
