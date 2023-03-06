import React from "react"
import ReactDOM from "react-dom"
import "./Loader.css"

const Loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
      <span className='loader'></span>
    </div>,
    document.getElementById("loader")
  )
}
export const SpinnerImg = () => {
  return (
    <>
      <div className='center-all'>
        <span className='loader'></span>
      </div>
    </>
  )
}

export default Loader
