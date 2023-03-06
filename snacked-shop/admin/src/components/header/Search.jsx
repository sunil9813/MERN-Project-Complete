import React from "react"
import { BiSearch } from "react-icons/bi"

export const Search = () => {
  return (
    <>
      <div className='header_search'>
        <div className='header_search_input'>
          <BiSearch className='icon' />
          <input type='text' placeholder='Type here to search' />
        </div>
      </div>
    </>
  )
}
