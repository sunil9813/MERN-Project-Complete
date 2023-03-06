const express = require("express")
const { regsiterUser, loginUser, logoutUser, forgetPassword, resetPassword, getUserProfile, updatePassword, updatePorfile, getAllUsers, getUserDetails, updatePorfileByAdmin, deleteUserProfileByAdmin } = require("../controllers/userController")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/verification")
const router = express.Router()

router.post("/register", regsiterUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.post("/password/forgot", forgetPassword)
router.put("/password/reset/:token", resetPassword)
router.get("/me", isAuthenticatedUser, getUserProfile)
router.put("/password/update", isAuthenticatedUser, updatePassword)
router.put("/me/update", isAuthenticatedUser, updatePorfile)

// Access only for --Admin
router.get("/admin/users", isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
router.get("/admin/user/:id", isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
router.put("/admin/user/:id", isAuthenticatedUser, authorizeRoles("admin"), updatePorfileByAdmin)
router.delete("/admin/user/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteUserProfileByAdmin)

module.exports = router
