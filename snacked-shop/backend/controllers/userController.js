const UserModal = require("../model/userModel")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const Token = require("../model/tokenModel")
const sendEmail = require("../utils/sendEmail")

//When user login or register it will generate Token ,so we will generate token using userId
const generateToken = (id) => {
  /*sign() => it will take some paramter 
    ->1st is what do you with create a token i.e id
    ->2nd JWT_SECRET
    ->3nd how logn your token is valid or used
*/
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

// Register User
const registerUser = asyncHandler(async (req, res) => {
  //res.send("Register User")
  const { name, email, password } = req.body

  // validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please fill in all required fileds ")
  }

  if (password.length < 8) {
    res.status(400)
    throw new Error("Password must be upto 8 characters")
  }

  // email xa db ma already bhane
  const oldUser = await UserModal.findOne({ email })
  if (oldUser) {
    res.status(400)
    throw new Error("Email is already exit")
  }
  // Encrypt password before saving to DB
  // yadi hami le password direclty controller bata hashed garyo bhane hami le yo nai chai 3 ota tau ma garnu parxa i.e register ,change password, reset password so tei bhayara hami le directly model ma garcau
  /*const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)*/

  // create garne new user
  const user = await UserModal.create({
    name,
    email,
    password,
  })

  //Generate Token
  const token = generateToken(user._id)

  /* 
   yadi hami le chai token chai header bata dirlecty pass garyo ani save garyo
   localStorage ma bhane yadi kunai 1ota dependcy chai crash bhayo bhane hacker le chai
   hamro token easliy access garna pauxa to protected form this method we used we used
   http-only cookies 
  */

  //send HTTP-ONLY cookie
  /* 
  how to save your cookies in fronted is => token
  how to save your cookies 
  when cookies expires 
  */
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 2592000), // 30day
    sameSite: "none",
    secure: true,
  })

  if (user) {
    const { _id, name, email, photo, phone, bio, isAdmin } = user
    res.status(201).json({ _id, name, email, photo, phone, bio, isAdmin, token })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// Login User
const loginUser = asyncHandler(async (req, res) => {
  //res.send("login User")
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error("Please add Email and Password")
  }

  //Check user is in DB or not
  const user = await UserModal.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error("User not Found,Please signup")
  }

  // IF user is exits then Check password is correct or not and decrypt it and compare
  const passwordIsCorrect = await bcrypt.compare(password, user.password)

  //Generate Token
  const token = generateToken(user._id)
  //send HTTP-ONLY cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 2592000), // 30day
    sameSite: "none",
    secure: true,
  })

  if (user && passwordIsCorrect) {
    const { _id, name, email, photo, phone, bio, isAdmin } = user
    res.status(201).json({ _id, name, email, photo, phone, bio, isAdmin, token })
  } else {
    res.status(400)
    throw new Error("Invalid Email or Password ")
  }
})

//  Logout User
const logOutUser = asyncHandler(async (req, res) => {
  // res.send("logOutUser User")

  //send HTTP-ONLY cookie
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // 0
    sameSite: "none",
    secure: true,
  })
  res.status(200)
  throw new Error("Successfully Logged Out")
})

//  Get User
const getUser = asyncHandler(async (req, res) => {
  //res.send("Get User")

  const user = await UserModal.findById(req.user._id)

  if (user) {
    const { _id, name, email, phone, photo, bio, role } = user
    res.status(200).json({ _id, name, email, phone, photo, bio, role })
  } else {
    res.status(400)
    throw new Error("User not found")
  }
})

// Login Status
const loginStatus = asyncHandler(async (req, res) => {
  //res.send("login User")

  // first check request form forntend have a cookies or not
  const token = req.cookies.token
  if (!token) {
    return res.json(false)
  }

  // Verfiy Token
  const verified = jwt.verify(token, process.env.JWT_SECRET)

  if (verified) {
    return res.json(true)
  }
  return res.json(false)
})

// Update User
const updateUser = asyncHandler(async (req, res) => {
  //res.send("Update User")
  const user = await UserModal.findById(req.user._id)

  // we dont change email address of user
  if (user) {
    const { name, email, photo, phone, bio } = user
    user.email = email
    user.name = req.body.name || name
    user.phone = req.body.phone || phone
    user.bio = req.body.bio || bio
    user.photo = req.body.photo || photo

    const updateUser = await user.save()
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      photo: updateUser.photo,
      phone: updateUser.phone,
      bio: updateUser.bio,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// Change Password
const changePassword = asyncHandler(async (req, res) => {
  //res.send("Change Password")

  const user = await UserModal.findById(req.user._id)
  const { oldPassword, password } = req.body

  if (!user) {
    res.status(400)
    throw new Error("User not found, Please signup")
  }

  // validation
  if (!oldPassword || !password) {
    res.status(400)
    throw new Error("Please add old and new password")
  }

  // check if oldPassword is match to DB Password
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password)

  //save new password
  if (user && passwordIsCorrect) {
    user.password = password
    await user.save()
    res.status(200)
    throw new Error("Password Chanage Successfully.")
  } else {
    res.status(400)
    throw new Error("Your Old Password is incorrect!")
  }
})

/*// Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
  //res.send("forgot Password User")
  const { email } = req.body

  // check email in DB
  const user = await UserModal.findOne({ email })

  // if email doesnt exits
  if (!user) {
    res.status(404)
    throw new Error("User does not exist")
  }

  //delete token if it is exits in DB
  let token = await Token.findOne({ userId: user._id })
  if (token) {
    await token.deleteOne()
  }

  // if user exits then create token for reset password
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id
  console.log(resetToken)

  // hash token before saving to DB
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")
  //console.log(resetToken)

  //save to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // 30 min
  }).save()

  //Construct Rest URL
  const resetUrl = `${process.env.FORNTEND_URL}/resetpassword/${resetToken}`
  res.send("Forgot Password")

  //Reset Email
  const message = `
  <h2>Hello ${user.name}</h2>
  <p>Please use the url below to reset your password</p>
  <p>This reset link is valid only for 30 Minutes.</p>
  <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  <p>Regards...</p>
  <p>GorkCoder Team</p>
  `

  const subject = "Password Reset Request"
  const send_to = user.email
  const send_form = process.env.EMAIL_USER

  try {
    await sendEmail(subject, message, send_to, send_form)
    res.status(200).json({ success: true, message: "Reset Email is Send" })
  } catch (error) {
    res.status(500)
    throw new Error("Email not sent,please try again")
  }
})

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  //res.send("Reset Password")

  const { password } = req.body
  const { resetToken } = req.params

  // hash token ,then compare to token in DB
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

  //find token in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() }, //$gt => selects those documents where the value of the field is greater than
  })

  if (!userToken) {
    res.status(404)
    throw new Error("Invalid or Expired Token")
  }

  // find user
  const user = await UserModal.findOne({ _id: userToken.userId })
  user.password = password
  await user.save()
  res.status(200).json({ message: "Password reset successful, Please Login" })
})
*/
const forgotPassword = asyncHandler(async (req, res) => {
  //res.send("Forget Password")
  const { email } = req.body
  const user = await UserModal.findOne({ email })
  if (!user) {
    res.status(404)
    throw new Error("User does not exits")
  }
  //delete token if it exits in DB
  let token = await Token.findOne({ userId: user._id })
  if (token) {
    await token.deleteOne()
  }

  //create reset token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id
  console.log(resetToken)

  // hash token before saving to DB
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")
  //console.log(hashedToken)
  //console.log(resetToken)

  //save Token to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // 30 Min
  }).save()

  // Construct Rest URl
  const resetUrl = `${process.env.FRONT_END_URL}/resetpassword/${resetToken}`

  // Reset Email
  const message = `
  <h2>Hello ${user.name}</h2>
  <p>Please use the url below to reset your password</p>
  <p>This reset link is valid for only for 30 Minutes.</p>
  <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  <p>Regards...</p>
  <p>GorkCoder Team </p>
  `
  const subject = "Password Reset Request"
  const send_to = user.email
  const send_from = process.env.EMAIL_USER

  try {
    await sendEmail(subject, message, send_to, send_from)
    res.status(200).json({ success: true, message: "Rest Email is Send" })
  } catch (error) {
    res.status(500)
    throw new Error("Email not sent, please try again")
  }
})

const resetPassword = asyncHandler(async (req, res) => {
  //res.send("Forget Password")
  const { password } = req.body
  const { resetToken } = req.params

  // hash token  , then compare to token in DB
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")
  //find token in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  })
  if (!userToken) {
    res.status(404)
    throw new Error("invalid or Expired Token")
  }

  // find user
  const user = await UserModal.findOne({ _id: userToken.userId })
  user.password = password
  await user.save()
  res.status(200).json({ message: "Password reset successful, Please Login" })
})

/*----access for only if role === "admin"------- */

// Get All User IF Admin
const getAllUser = asyncHandler(async (req, res, next) => {
  try {
    const getUsers = await UserModal.find()
    res.status(200).json(getUsers)
  } catch (error) {
    res.status(400)
    throw new Error("You are not allowed to do this!")
  }
})

// Get Single User For Admin
const getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await UserModal.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error("User not found, Please signup")
  }
  res.status(200).json(user)
})

// Update User For Admin
/*const updateUserRole = asyncHandler(async (req, res) => {
  const { name, email, role } = req.body
  const { id } = req.params

  const user = await UserModal.findById(id)

  if (!user) {
    res.status(404)
    throw new Error("User not Found!")
  }

  const updatedUser = await UserModal.findByIdAndUpdate(
    {
      _id: id,
    },
    { name, email, role },
    { new: true, runValidators: true }
  )
  res.status(200).json(updatedUser)
})*/

const updateUserRole = asyncHandler(async (req, res, next) => {
  const newUserData = {
    /*name: req.body.name,
    email: req.body.email,*/
    role: req.body.role,
  }

  const user = await UserModal.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({ user, message: "Update user successfully" })
})

//Delete User For Admin
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await UserModal.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error("User not Found,Please signup")
  }
  await user.remove()
  res.status(200).json({ message: "User has been Deleted." })
})
module.exports = {
  registerUser,
  loginUser,
  logOutUser,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
}

/* 
<------------- Step for Register User ---------------->
Step 1: Destructure property  const { name, email, password } = req.body
Step 2: Validtion for property
Step 3: Create newUser
Step 4: Now hashed password : 
        yadi hami le password direclty controller bata hashed garyo bhane hami 
        le yo nai chai 3 ota tau ma garnu parxa i.e register ,change password, 
	    reset password so tei bhayara hami le directly model ma garcau kina bhane
	    hamro forntend ma froget password ,change password bhane UI pani create
	    garrako xa 
Step 5: Create Token or Generate Token
        =>Used jsonwebtoken to verify user is correclty login or not i.e it help use to
        magange user 
        =>When user register in website than we do want to send back to login page
        again and again so used cookies
Step 6: In index.js add cookieParser
Step 7: Send cookies to frontend

<------------- Step for Login User ---------------->
Step 1: Required email and password & validation 
Step 2: Check user is in DB or not
Step 3: Check password is correct or not and decrypt password
Step 4: Generate token 
Step 5: User email & password is correct login
 
<------------- Step for LogOut User ---------------->
Step 1: Expires 

<------------- Step for Get User ---------------->
Step 1: From user ID find user 
Step 2: IF user is find destructure property of user

<------------- Step for change Password ---------------->
Step 1: From userModal find userID 
Step 2: oldpass ra newpass lai body ma get garne
Step 3: user lai check garne
Step 4: oldpass ra newpass validation garne
Step 5: oldpass ra newpass compare garne
Step 6: save password in DB

<------------- Step for change Password ---------------->
Step 1: create token model 
Step 2: create email sender 
Step 3: create controller function 
*/
