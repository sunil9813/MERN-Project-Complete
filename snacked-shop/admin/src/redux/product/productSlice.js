import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import productService from "../../services/productServices"

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
}

// create new product
export const createProduct = createAsyncThunk("products/create", async (formData, thunkAPI) => {
  try {
    return await productService.createProduct(formData)
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
    console.log(message)
    return thunkAPI.rejectWithValue(message)
  }
})

// get user product
export const getUserProduct = createAsyncThunk("products/getuserproduct", async (_, thunkAPI) => {
  try {
    return await productService.getUserProducts()
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
    console.log(message)
    return thunkAPI.rejectWithValue(message)
  }
})

// get user product
export const deleteProduct = createAsyncThunk("products/delete", async (id, thunkAPI) => {
  try {
    return await productService.deleteProduct(id)
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
    console.log(message)
    return thunkAPI.rejectWithValue(message)
  }
})

// get user product
export const getProduct = createAsyncThunk("products/getProduct", async (id, thunkAPI) => {
  try {
    return await productService.getProduct(id)
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
    console.log(message)
    return thunkAPI.rejectWithValue(message)
  }
})

// update product
export const updateProduct = createAsyncThunk("products/updateProduct", async ({ id, formData }, thunkAPI) => {
  try {
    return await productService.updateProduct(id, formData)
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
    console.log(message)
    return thunkAPI.rejectWithValue(message)
  }
})

/*-----------only access for admin------- */
// get all product
export const getAdminProducts = createAsyncThunk("products/getadminproduct", async (_, thunkAPI) => {
  try {
    return await productService.getAdminProducts()
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
    console.log(message)
    return thunkAPI.rejectWithValue(message)
  }
})

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    SET_LOGIN() {},
    SET_NAME() {},
    SET_USER() {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        console.log(action.payload)
        state.products.push(action.payload)
        toast.success("Product add successfully")
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      }) // get user product
      .addCase(getUserProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        console.log(action.payload)
        state.products = action.payload
      })
      .addCase(getUserProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      }) // delete product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("Product Deleted Successfully")
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      }) // get single product
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.product = action.payload
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      }) // update product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("Product Updated Successfully")
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      }) // only acccess for amdin
      .addCase(getAdminProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAdminProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        console.log(action.payload)
        state.products = action.payload
      })
      .addCase(getAdminProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
  },
})

export const { SET_LOGIN, SET_NAME, SET_USER } = productSlice.actions

export const selectIsLoading = (state) => state.product.isLoading
export const selectProduct = (state) => state.product.product
export default productSlice.reducer
