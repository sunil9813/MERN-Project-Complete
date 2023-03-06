import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { deleteProductReducer, deleteProductReviewReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewReducer } from "./reducer/productReducer"
import { allUserReducer, authReducer, forgotPasswordReducer, userDetailsReducer, userReducer } from "./reducer/authReducer"
import { cartReducer } from "./reducer/cartReducer"
import { allOrderReducer, myOrdersReducer, newOrderReducer, orderReducer, ordersDetailsReducer } from "./reducer/orderReducer"

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  ordersDetails: ordersDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  deleteProduct: deleteProductReducer,
  allOrder: allOrderReducer,
  order: orderReducer,
  allUser: allUserReducer,
  userDetails: userDetailsReducer,
  productReview: productReviewReducer,
  deleteProductReview: deleteProductReviewReducer,
})

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
  },
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
