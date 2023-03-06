import axios from "axios"
import { toast } from "react-toastify"

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const API_URL = `${BACKEND_URL}/api/users/admin/`

// step 2 :
export const validateEmail = (email) => {
  return email.match(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/) // eslint-disable-line
}

//Register User
export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/users/register`, userData, { withCredentials: true })
    toast.success("User Registered Successfully")
    return res.data
  } catch (error) {
    // this are possible error format
    //this is exact method to pick error from backend
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
  }
}

//Login User
export const loginUser = async (userData) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/users/login`, userData)
    toast.success("User LogIn Successfully")
    return res.data
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
  }
}

//Logout User
export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/api/users/logout`)
    toast.success("Logout Successfully")
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
  }
}

//Forget Password
export const forgotPassword = async (userData) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/users/forgotpassword`, userData)
    toast.success(res.data.message)
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
  }
}
//Reset Password
export const resetPassword = async (userData, resetToken) => {
  try {
    const res = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`, userData)
    toast.success(res.data.message)
    return res.data
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
  }
}

// get login status
// when page reload then we loss every data
export const getLoginStatus = async (userData) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/users/loggedin`, userData)
    return res.data
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
  }
}

// Get User Profile
export const getUser = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/users/getuser`)
    return res.data
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
  }
}
//  Update Profile
export const updateUser = async (formData) => {
  try {
    const res = await axios.patch(`${BACKEND_URL}/api/users/updateuser`, formData)
    return res.data
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
  }
}
//  Change Passoword
export const changePassoword = async (formData) => {
  try {
    const res = await axios.patch(`${BACKEND_URL}/api/users/changepassword`, formData)
    return res.data
  } catch (error) {
    const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
    toast.error(message)
  }
}

// Get all user for --Admin
const getAllUser = async () => {
  const res = await axios.get(`${API_URL}`)
  return res.data
}
// View user details for --Admin
const viewUser = async (id) => {
  const res = await axios.get(API_URL + id)
  return res.data
}
// update  user details for --Admin
/*const updateByAdminUser = async (id, formData) => {
  const res = await axios.patch(`${BACKEND_URL}/api/users/admin/${id}`, formData)
  return res.data
}*/
const updateByAdminUser = async (id, formData) => {
  const res = await axios.patch(`${API_URL}${id}`, formData)
  return res.data
}

// delete  user details for --Admin
const deleteByAdminUser = async (id) => {
  const res = await axios.delete(API_URL + id)
  return res.data
}

const adminServices = {
  getAllUser,
  viewUser,
  updateByAdminUser,
  deleteByAdminUser,
}
export default adminServices
