import React from "react"

export const Title = ({ title1, title2 }) => {
  return (
    <>
      <h1 className='title'>
        {title1} <span>{{ title2 }}</span>
      </h1>
    </>
  )
}
