const express = require("express")
const { newOrder, loggedInUserOrders, getSingleOrder, getAllOrderByAdmin, updateOrderByAdmin, deleteOrderByAdmin } = require("../controllers/orderController")
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/verification")

router.post("/order/new", isAuthenticatedUser, newOrder)
router.get("/order/me", isAuthenticatedUser, loggedInUserOrders)
router.get("/order/:id", isAuthenticatedUser, getSingleOrder)
router.get("/admin/orders/", isAuthenticatedUser, authorizeRoles("admin"), getAllOrderByAdmin)
router.put("/admin/orders/:id", isAuthenticatedUser, authorizeRoles("admin"), updateOrderByAdmin)
router.delete("/admin/orders/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteOrderByAdmin)

module.exports = router
