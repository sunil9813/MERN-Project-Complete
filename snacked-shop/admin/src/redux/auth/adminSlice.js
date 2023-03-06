import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import adminServices from "../../services/authServices"

const initialState = {
  user: null,
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// get all user for Admin
export const getAllUser = createAsyncThunk("admin/getallusers", async (_, thunkAPI) => {
  try {
    return await adminServices.getAllUser()
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
    console.log(message)
    return thunkAPI.rejectWithValue(message)
  }
})

// view user details for Admin
export const viewUser = createAsyncThunk("admin/viewuser", async (id, thunkAPI) => {
  try {
    return await adminServices.viewUser(id)
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
    console.log(message)
    return thunkAPI.rejectWithValue(message)
  }
})

//update user details for Admin
export const updateByAdminUser = createAsyncThunk("admin/updatebyadmin", async ({ id, formData }, thunkAPI) => {
  try {
    return await adminServices.updateByAdminUser(id, formData)
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
    console.log(message)
    return thunkAPI.rejectWithValue(message)
  }
})

//delete user details for Admin
export const deleteByAdminUser = createAsyncThunk("admin/deletuser", async (id, thunkAPI) => {
  try {
    return await adminServices.deleteByAdminUser(id)
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
    console.log(message)
    return thunkAPI.rejectWithValue(message)
  }
})

const adminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        console.log(action.payload)
        state.users = action.payload
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      }) // view single user
      .addCase(viewUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(viewUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.user = action.payload
      })
      .addCase(viewUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      }) // delete user by admin
      .addCase(deleteByAdminUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteByAdminUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("User Deleted Successfully")
      })
      .addCase(deleteByAdminUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(updateByAdminUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateByAdminUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("User Updated Successfully")
      })
      .addCase(updateByAdminUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
  },
})

export const selectIsAdminLoading = (state) => state.admin.isLoading
export const selectUserByAdmin = (state) => state.admin.user

export default adminSlice.reducer
