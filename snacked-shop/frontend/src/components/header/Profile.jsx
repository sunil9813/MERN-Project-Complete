import React, { useState } from "react"
import { RiUserLine } from "react-icons/ri"
import { useRef } from "react"
import { useEffect } from "react"
import { BiLogIn } from "react-icons/bi"
import { profile } from "../assets/data/data"
import user from "../assets/images/user.png"

export const Profile = () => {
  const [open, setOpen] = useState(false)
  let menuRef = useRef()

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false)
        console.log(menuRef.current)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })
  return (
    <>
      <div className='header_container_right_profile' ref={menuRef}>
        <div className='icon size-45' onClick={() => setOpen(!open)}>
          <RiUserLine size={25} />
        </div>

        {setOpen && (
          <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
            <div className='header_container_right_profile_images flex'>
              <div className='header_container_right_profile_images_img'>
                <img src={user} alt='user' className='size-50' />
              </div>
              <div className='header_container_right_profile_images_details'>
                <h4>Eden Smith</h4>
                <span>Los Angeles,CA</span>
              </div>
            </div>
            <hr />
            {profile.map((item) => (
              <div className='header_container_right_profile_box flex'>
                <i>{item.icon}</i>
                <a href={`/${item.name.toLowerCase()}`}>
                  <h3>{item.name}</h3>
                </a>
              </div>
            ))}
            <button className='header_container_right_profile_box flex'>
              <i>
                <BiLogIn size={17} />
              </i>
              <h3> Logout</h3>
            </button>
          </div>
        )}
      </div>
    </>
  )
}
