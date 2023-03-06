import { createSlice } from "@reduxjs/toolkit"

const name = JSON.parse(localStorage.getItem("name"))

const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload))
      state.name = action.payload
    },
    //save all the user data
    SET_USER(state, action) {
      const profile = action.payload
      // profile contain all the data of user
      state.user.name = profile.name
      state.user.email = profile.email
      state.user.phone = profile.phone
      state.user.bio = profile.bio
      state.user.photo = profile.photo
      state.user.role = profile.role
    },
  },
})

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions

// export individual state = name,user,isLoffedIn
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectName = (state) => state.auth.name
export const selectUser = (state) => state.auth.user

export default authSlice.reducer
