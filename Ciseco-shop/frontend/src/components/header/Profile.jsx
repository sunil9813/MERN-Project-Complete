import React, { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { BiLogIn } from "react-icons/bi"
import { profile } from "../assets/data/data"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { logout } from "../../redux/actions/authAction"
import { MdOutlineDashboard } from "react-icons/md"

export const Profile = () => {
  const [open, setOpen] = useState(false)
  let menuRef = useRef()
  const close = () => {
    setOpen(null)
  }

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false)
        //console.log(menuRef.current)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })

  // user details show
  const dispatch = useDispatch()
  const history = useHistory()

  const { user, loading } = useSelector((state) => state.auth)

  const logoutHandler = () => {
    dispatch(logout())
    toast.success("Logout Successfully.")
    history.push("/")
  }

  return (
    <>
      {user ? (
        <div className='header_container_right_profile' ref={menuRef}>
          <div className='icon size-40' onClick={() => setOpen(!open)}>
            <img src={user.avatar && user.avatar.url} alt='user' className='size-40' />
          </div>

          {setOpen && (
            <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
              <div className='header_container_right_profile_images flex'>
                <div className='header_container_right_profile_images_img'>
                  <img src={user.avatar && user.avatar.url} alt='user' className='size-50' />
                </div>
                <div className='header_container_right_profile_images_details'>
                  <h4>{user.name}</h4>
                  <span>{user.email}</span>
                </div>
              </div>
              <hr />

              {user && user?.role === "admin" && (
                <Link to='/dashboard' onClick={close}>
                  <button className='header_container_right_profile_box flex'>
                    <i>
                      <MdOutlineDashboard size={17} />
                    </i>
                    <h3> Dashboard</h3>
                  </button>
                </Link>
              )}
              {profile.map((item, i) => (
                <div className='header_container_right_profile_box flex' key={i} onClick={close}>
                  <i>{item.icon}</i>
                  <Link to={item.link}>
                    <h3>{item.name}</h3>
                  </Link>
                </div>
              ))}
              <button className='header_container_right_profile_box flex' onClick={logoutHandler}>
                <i>
                  <BiLogIn size={17} />
                </i>
                <h3> Logout</h3>
              </button>
            </div>
          )}
        </div>
      ) : (
        !loading && (
          <div className='HeaderLogin'>
            <Link to='/login'>
              <button className='priceBox'>Login</button>
            </Link>
          </div>
        )
      )}
    </>
  )
}
