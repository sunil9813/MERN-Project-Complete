const jwt = require("jsonwebtoken")
const User = require("../models/usersModel")
const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncError = require("./catchAsyncError")

//Check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  // we can access http cookie only in server side not in frontend side
  const { token } = req.cookies
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401))
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(decoded.id)

  next()
  // console.log(token)
})

// Access only for admin
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403))
    }
    next()
  }
}
