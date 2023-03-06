import React, { useState } from "react"
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md"
import { NavLink } from "react-router-dom"

const activeLink = ({ isActive }) => (isActive ? "active" : "link")
const activeSublink = ({ isActive }) => (isActive ? "active" : "link")

export const SidebarItem = ({ item, index, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false)
  if (item.childrens) {
    return (
      <div className={expandMenu ? "sidebar-item s-parent open" : "sidebar-item s-parent"}>
        <div className='sidebar-title'>
          <li className='sidebar_bottom_lists' onClick={() => setExpandMenu(!expandMenu)}>
            <div className='sidebar_bottom_lists_list parent_list'>
              <div className='flex'>
                <i className='icon'>{item.icon} </i>
                {isOpen && item.link}
              </div>
              {expandMenu ? <MdKeyboardArrowDown size={25} /> : <MdKeyboardArrowRight size={25} />}
            </div>
          </li>
        </div>
        <div className='sidebar-content'>
          {item.childrens.map((child, index) => {
            return (
              <div key={index} className='s-child'>
                <li className={`sidebar_bottom_lists ${activeSublink}`} key={index}>
                  <NavLink to={child.path} className={`sidebar_bottom_lists_list`}>
                    <i className='icon'>{child.icon} </i>
                    {isOpen && child.link}
                  </NavLink>
                </li>
              </div>
            )
          })}
        </div>
      </div>
    )
  } else {
    return (
      <li className={`sidebar_bottom_lists ${activeLink}`} key={index}>
        <NavLink to={item.path} className={`sidebar_bottom_lists_list`}>
          <i className='icon'>{item.icon} </i>
          {isOpen && item.link}
        </NavLink>
      </li>
    )
  }
}
