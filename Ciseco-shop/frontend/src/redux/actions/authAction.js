import axios from "axios"
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERROS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, NEW_PASSWORD_REQUEST, NEW_PASSWORD_SUCCESS, NEW_PASSWORD_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, ALL_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL } from "../constrants/userConstrants"

export const validateEmail = (email) => {
  return email.match(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/) // eslint-disable-line
}

//Login User
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST })
    const config = {
      //request body contains data in the JSON format.
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post("/api/login", { email, password }, config)
    dispatch({ type: LOGIN_SUCCESS, payload: data.user })
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    })
  }
}

//Register User
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST })
    const config = {
      //This format is commonly used when submitting forms that include file uploads.
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    const { data } = await axios.post("/api/register", userData, config)
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    })
  }
}

//Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST })

    const { data } = await axios.get("/api/me")
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    })
  }
}

//Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/logout")
    dispatch({ type: LOGOUT_USER_SUCCESS })
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response.data.message,
    })
  }
}

//Update User
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST })
    const config = {
      //This format is commonly used when submitting forms that include file uploads.
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    const { data } = await axios.put("/api/me/update", userData, config)
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    })
  }
}

//Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST })
    const config = {
      //This format is commonly used when submitting forms that include file uploads.
      headers: {
        "Content-Type": "multipart/json",
      },
    }
    const { data } = await axios.put("/api/password/update", passwords, config)
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    })
  }
}

//Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST })
    const config = {
      headers: {
        "Content-Type": "multipart/json",
      },
    }
    const { data } = await axios.post("/api/password/forgot", email, config)
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message })
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    })
  }
}

//Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST })
    const config = {
      headers: {
        "Content-Type": "multipart/json",
      },
    }
    const { data } = await axios.put(`/api/password/reset/${token}`, passwords, config)
    dispatch({ type: NEW_PASSWORD_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: error.response.data.message,
    })
  }
}

// For admin
// Get all users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST })

    const { data } = await axios.get("/api/admin/users")
    dispatch({ type: ALL_USER_SUCCESS, payload: data.users })
  } catch (error) {
    dispatch({
      type: ALL_USER_FAIL,
      payload: error.response.data.message,
    })
  }
}

//Update Password
export const updateUserRole = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST })
    const config = {
      headers: {
        "Content-Type": "multipart/json",
      },
    }
    const { data } = await axios.put(`/api/admin/user/${id}`, userData, config)
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    })
  }
}

//Get user details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/admin/user/${id}`)
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

//delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST })

    const { data } = await axios.delete(`/api/admin/user/${id}`)
    dispatch({ type: USER_DELETE_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response.data.message,
    })
  }
}
//Clear Erros
export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROS,
  })
}
