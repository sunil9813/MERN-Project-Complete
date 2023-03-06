/*import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import { Navigate, Route } from "react-router-dom"

export const ProtectedRoute = ({ isAdmin, children, ...rest }) => {
  const { isLoading, isAuth, user } = useSelector((state) => state.user)

  return (
    <>
      {isLoading === false && (
        <Route
          {...rest}
          element={(props) => {
            if (isAuth === false) {
              return <Navigate to='/login' />
            }
            if (isAdmin === true && user.role !== "admin") {
              return <Navigate to='/login' />
            }
            return { children }
          }}
        />
      )}
    </>
  )
}
*/
