import React, { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"

export const Search = () => {
  const [open, setOpen] = useState(false)

  const close = () => {
    setOpen(null)
  }
  return (
    <>
      <div className='header_container_right_search'>
        {open ? (
          ""
        ) : (
          <div className='icon size-45' onClick={() => setOpen(!open)}>
            <BiSearch size={25} />
          </div>
        )}
        <div className={open ? "openSearch" : "closeSearch"}>
          <div className='input flex'>
            <BiSearch size={25} className='icons' />
            <input type='text' placeholder='Type and press enter' />
            <button className='header_container_right_search_box_close' onClick={close}>
              <AiOutlineClose className='icons' size={25} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
