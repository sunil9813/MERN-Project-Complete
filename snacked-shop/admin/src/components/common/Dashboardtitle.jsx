import React from "react"
import { BsThreeDots } from "react-icons/bs"

export const Dashboardtitle = ({ title }) => {
  return (
    <>
      <div className='flex justify-between items-center mb-3'>
        <h3>{title}</h3>
        <BsThreeDots />
      </div>
    </>
  )
}
