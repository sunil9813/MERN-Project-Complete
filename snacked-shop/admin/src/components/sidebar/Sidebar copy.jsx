import React, { useState } from "react"
import logo from "../assets/images/favicon.png"
import { AiOutlineMenu } from "react-icons/ai"
import { NavLink } from "react-router-dom"
import { sideNav } from "../assets/data"
import { useSelector } from "react-redux"
import { selectUser } from "../../redux/auth/authSlice"

const activeLink = ({ isActive }) => (isActive ? "active" : "link")

export const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)

  const user = useSelector(selectUser)
  // console.log(user)
  return (
    <>
      <div className={isOpen ? "changeWidth" : "restWidth"}>
        <section className={isOpen ? "sidebarOpen" : "sidebar"}>
          <div className='sidebar_top'>
            {isOpen && (
              <div className='sidebar_top_logo'>
                <img src={logo} alt='logo' />
                <h2 className='text-2xl'>Snacked</h2>
              </div>
            )}
            <button className='sidebar_top_toggle' onClick={toggle}>
              <AiOutlineMenu className='icon' />
            </button>
          </div>
          <ul className='sidebar_bottom'>
            {sideNav.map((link, i) => (
              <>
                <li className='sidebar_bottom_lists' key={i}>
                  <NavLink to={link.path} className={`sidebar_bottom_lists_list ${activeLink}`}>
                    <i className='icon'>{link.icon} </i>
                    {isOpen && link.link}
                  </NavLink>
                </li>
              </>
            ))}
          </ul>
        </section>
        <main className={isOpen ? "changeWidth" : "restWidth"}>{children}</main>
      </div>
    </>
  )
}
