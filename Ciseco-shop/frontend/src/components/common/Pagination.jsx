import React from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"

export const Pagination = () => {
  return (
    <>
      <div className='pagination'>
        <div className='box1'>
          <p>Showing 1 to 3 of 3 entries</p>
        </div>
        <div className='box flex'>
          <div className='row flex'>
            <h4>Row per page :</h4>
            <select name='' id='' className='btn'>
              <option value=''>10</option>
              <option value=''>20</option>
              <option value=''>30</option>
              <option value=''>40</option>
              <option value=''>50</option>
            </select>
          </div>
          <div className='flex buttons'>
            <button className='btn'>
              <BsArrowLeft />
            </button>
            <button className='btn'>
              <BsArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
