const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a name"],
    },
    email: {
      type: String,
      require: [true, "Please add a email"],
      unique: true,
      trim: true,
      match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
      minLength: [8, "Password must be up to 8 characters"],
      //maxLength: [20, "Password should not be more than 20 characters"],
    },
    photo: {
      type: String,
      require: [true, "Please add a photo"],
      default: "https://icons8.com/icon/LPk9CY756Am8/circled-user-male-skin-type-7",
    },
    phone: {
      type: String,
      default: "+977 98",
    },
    bio: {
      type: String,
      default: "Hello i am Sunil B.K. I am a developer if this project",
      maxLength: [200, "Bio sholud not be more than 200 characters"],
    },
    role: {
      type: String,
      default: "normal",
    },
  },
  { timestamps: true }
)
// Encrypt password before saving to DB
// whenever we register, change and reset password than this function will fired
userSchema.pre("save", async function (next) {
  /*when ever we edit or update the user than expect password we want change 
    other property than how to specify only for that specifc property  
    then we use if statement*/
  if (!this.isModified("password")) {
    // basicaly chai yadai hami lai passoword modified garnu xaina bhane go to next bhane i.e go to down step
    return next()
  }
  // hash password
  const salt = await bcrypt.genSalt(10)
  //password chai property ho so direclty passowrd ma point garna paudaina tei bhayara this used garxa
  const hashedPassword = await bcrypt.hash(this.password, salt)
  this.password = hashedPassword
  next()
})

const User = mongoose.model("User", userSchema)
module.exports = User
