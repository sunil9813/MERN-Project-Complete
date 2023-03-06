import React from "react"
import { TopNav } from "../../routes"
import "react-toastify/dist/ReactToastify.css"

export const LogInHome = ({ children }) => {
  return (
    <>
      <TopNav />
      <div>{children}</div>
    </>
  )
}
