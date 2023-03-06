import React, { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"

export const Search = ({ history }) => {
  const [open, setOpen] = useState(false)

  //Search function
  const [keyword, setKeyword] = useState("")
  const searchHandler = (e) => {
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push("/")
    }
  }

  const close = () => {
    setOpen("")
    setKeyword(null)
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
        <form onClick={searchHandler} className={open ? "openSearch" : "closeSearch"}>
          <div className='input flex'>
            <BiSearch size={25} className='icons' />
            <input type='text' placeholder='Type and press enter' onChange={(e) => setKeyword(e.target.value)} />
            <button className='header_container_right_search_box_close' onClick={close}>
              <AiOutlineClose className='icons' size={25} />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
