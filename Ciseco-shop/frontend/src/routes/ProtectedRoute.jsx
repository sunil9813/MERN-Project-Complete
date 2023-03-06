import React from "react"
import { render } from "react-dom"
import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom"

export const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { isAuth, loading, user } = useSelector((state) => state.auth)

  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuth === false) {
              return <Redirect to='/login' />
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to='/' />
            }

            return <Component {...props} />
          }}
        />
      )}
    </>
  )
}
