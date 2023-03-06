import React from "react"
import { Footer, Header } from "../../routes/index"

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {/*<div className={isOpen ? "changeWidth" : "restWidth"}>{childern}</div>*/}
      <div className='flex min-h-[87vh]'>{children}</div>
      <Footer />
    </>
  )
}
