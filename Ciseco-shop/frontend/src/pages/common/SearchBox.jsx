import React from "react"
import { FiSearch } from "react-icons/fi"

export const SearchBox = () => {
  return (
    <>
      <div className='searchBox'>
        <div className='search_item flex'>
          <FiSearch className='search-icon' size={20} />
          <input type='text' placeholder='Search here...' />
        </div>
      </div>
    </>
  )
}
