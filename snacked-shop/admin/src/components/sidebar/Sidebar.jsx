import React, { useState } from "react"
import logo from "../assets/images/favicon.png"
import { AiOutlineMenu } from "react-icons/ai"
import { sideNav } from "../assets/data"
import { SidebarItem } from "./SidebarItem"
import { NavLink } from "react-router-dom"

/*const SingleTab = ({ link, isActive, isShrinkView, hanldeClick }) => {
  return (
    <div className='' isActive={isActive} onClick={hanldeClick}>
      <NavLink to={link.path}>
        <i className='icon'>{link.icon} </i>
        {isOpen && link.link}
      </NavLink>
    </div>
  )
}
const SingleCollapsable = ({ link, isActive, isShrinkView, hanldeClick }) => {
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false)

  const handleClickFuncs = () => {
    setIsOpenSubMenu(!isOpenSubMenu)
    hanldeClick()
  }
  return (
    <div className='' isActive={isActive} onClick={hanldeClick}>
      <h1>hello</h1>
    </div>
  )
}*/

export const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)

  /* const [isShrinkView, setIsShrinkView] = useState(false)
  const [activeLink, setActiveLink] = useState(1)
*/
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
            {sideNav.map((link, index) => (
              <SidebarItem key={index} item={link} isOpen={isOpen} />
            ))}
            {/*  <li className='sidebar_bottom_lists' key={key}>
              <NavLink to={link.path} className={`sidebar_bottom_lists_list ${activeLink}`}>
                <i className='icon'>{link.icon} </i>
                {isOpen && link.link}
              </NavLink>
            </li>*/}
          </ul>
        </section>
        <main className={isOpen ? "changeWidth" : "restWidth"}>{children}</main>
      </div>
    </>
  )
}
