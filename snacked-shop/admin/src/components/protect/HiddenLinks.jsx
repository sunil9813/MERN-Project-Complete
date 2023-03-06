import { Component } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet, Route } from "react-router-dom"
import { selectIsLoggedIn, selectUser } from "../../redux/auth/authSlice"
import { LogInHome, UserProfile } from "../../routes"

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  if (isLoggedIn) {
    return <>{children}</>
  }
  return null
}
export const ShowOnLogOut = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  if (!isLoggedIn) {
    return <>{children}</>
  }
  return null
}
export const ShowLink = ({ children, isAdmins }) => {
  const isAdmin = useSelector(selectUser)
  console.log(isAdmin)
  if (isAdmin.role === "admin" && isAdmins === true) {
    return <>{children}</>
  }
  return null
}

/*export const AdminRoute = ({ isAdmin, element: Element, ...rest }) => {
  const { user } = useSelector((state) => state.user)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <>
      <Route
        {...rest}
        element={(props) => {
          if (isLoggedIn === false) {
            return <Navigate to='/login' />
          }
          if (isAdmin === true && user.role !== "admin") {
            return <Navigate to='/login' />
          }
          return <Element {...props} />
        }}
      />
    </>
  )
}*/
//isLoggedIn && isAuth.role === "admin" ? <Outlet /> : <Navigate to='/login' />
