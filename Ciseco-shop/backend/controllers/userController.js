const User = require("../models/usersModel")
const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary")

//Register a user
const regsiterUser = catchAsyncError(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "Ciseco-Shop/avatars",
    /* width: 150,
    crop: "scale",*/
  })

  const { name, email, password } = req.body

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  })

  /* const token = user.getJwtToken()

  res.status(201).json({
    success: true,
    token,
  })*/

  sendToken(user, 200, res)
})

//Login User
const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body

  // Check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password"), 400)
  }

  // Finding user in DB
  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password"), 401)
  }

  // Check if password is correct or not
  const isPasswordMatch = await user.comparePassword(password)

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email or Password"), 401)
  }

  /*const token = user.getJwtToken()

  res.status(200).json({
    success: true,
    token,
  })*/

  sendToken(user, 201, res)
})

// Logout User
const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: "Logged Out",
  })
})

// Forget Password
const forgetPassword = catchAsyncError(async (req, res, next) => {
  //check email provide
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorHandler("User not found with this email"), 404)
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  //create reset password url
  //const resetUrl = `{${req.protocol}://${req.get("host")}}/api/password/reset/${resetToken}`
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

  const message = `Your password reset token is as follow:- \n\n${resetUrl}\n\nIF you have not requested this email , then ignore it.`

  try {
    await sendEmail({
      email: user.email,
      subject: "Ciseco Shop Password Recovery",
      message,
    })

    res.status(200).json({
      success: true,
      message: `Email sent to : ${user.email}`,
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save({ validateBeforeSave: false })

    return next(new ErrorHandler(error.message, 500))
  }
})

//Reset Passoword
const resetPassword = catchAsyncError(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(new ErrorHandler("Password reset toke is invalid or has been expired."), 400)
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match."), 400)
  }

  // set up new password
  user.password = req.body.password

  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  sendToken(user, 200, res)
})

//Get currently logged in user details
const getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    user,
  })
})

// Update / Chanage Password
const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password")

  //Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword)

  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect ", 400))
  }

  user.password = req.body.password
  await user.save()

  sendToken(user, 200, res)
})

//Update user profile
const updatePorfile = catchAsyncError(async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
  }

  // Update avatar
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id)
    const image_id = user.avatar.public_id
    const res = await cloudinary.v2.uploader.destroy(image_id)

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "Ciseco-Shop/avatars",
      //width: 150,
      //crop: "scale",
    })

    userData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    }
  }
  const user = await User.findByIdAndUpdate(req.user.id, userData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    //user,
  })
})

// <------------Only Access for --Amdin-------------->
// get all user
const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    success: true,
    users,
  })
})

// Get user Detaials by admin
const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new ErrorHandler(`User does not found with id: ${(req.params, id)}.`), 400)
  }
  res.status(200).json({
    success: true,
    user,
  })
})

//Update user profile by admin
const updatePorfileByAdmin = catchAsyncError(async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  // user  =>  params ma chnage garne natra baki ko same  nai ho mate bata
  const user = await User.findByIdAndUpdate(req.params.id, userData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    user,
  })
})

//Delete user by admin
const deleteUserProfileByAdmin = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new ErrorHandler(`User does not found with id: ${(req.params, id)}.`), 400)
  }

  //Remove avatar from Cloudinary
  const image_id = user.avatar.public_id
  await cloudinary.v2.uploader.destroy(image_id)

  await user.remove()

  res.status(200).json({
    success: true,
    message: "Delete User Successfully.",
  })
})

module.exports = {
  regsiterUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updatePorfile,
  getAllUsers,
  getUserDetails,
  updatePorfileByAdmin,
  deleteUserProfileByAdmin,
}
