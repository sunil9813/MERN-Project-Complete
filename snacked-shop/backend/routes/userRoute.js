const express = require("express")
const { registerUser, loginUser, logOutUser, getUser, getAllUser, loginStatus, updateUser, changePassword, forgotPassword, resetPassword, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController")
const { protect, verifyTokenAndAdmin } = require("../middleWare/authMiddleWare")
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logOutUser)
router.get("/getuser", protect, getUser)
router.get("/loggedin", loginStatus)
router.patch("/updateuser/", protect, updateUser)
router.patch("/changepassword", protect, changePassword)
router.post("/forgotpassword", forgotPassword)
router.put("/resetpassword/:resetToken", resetPassword)

// only for admin access
router.get("/admin", protect, verifyTokenAndAdmin("admin"), getAllUser)
router.get("/admin/:id", protect, verifyTokenAndAdmin("admin"), getSingleUser)
router.patch("/admin/:id", protect, verifyTokenAndAdmin("admin"), updateUserRole)
router.delete("/admin/:id", protect, verifyTokenAndAdmin("admin"), deleteUser)

module.exports = router
