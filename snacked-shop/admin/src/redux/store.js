import { configureStore } from "@reduxjs/toolkit"
import adminSlice from "./auth/adminSlice"
import authSlice from "./auth/authSlice"
import filterSlice from "./filterSlice"
import productSlice from "./product/productSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    admin: adminSlice,
    product: productSlice,
    filter: filterSlice,
  },
})
