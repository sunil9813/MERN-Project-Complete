import React from "react"
import { AiOutlineDiff } from "react-icons/ai"
import { BsStars } from "react-icons/bs"
import { HiOutlineUserCircle } from "react-icons/hi"
import { IoCartOutline } from "react-icons/io5"
import { RiDashboardLine } from "react-icons/ri"
import { TbBrandProducthunt } from "react-icons/tb"
import { NavLink, NavNavLink } from "react-router-dom"

export const Sidebar = () => {
  return (
    <>
      <nav className='sidebar'>
        <ul>
          <li>
            <NavLink to='/dashboard'>
              <RiDashboardLine size={20} className='aicon' /> Dashboard
            </NavLink>
          </li>
          <li>
            <i></i>
            <NavLink to='/admin/product'>
              <TbBrandProducthunt size={20} className='aicon' />
              All Product
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/create'>
              <AiOutlineDiff size={20} className='aicon' />
              Create Product
            </NavLink>
          </li>
          <li>
            <i></i>
            <NavLink to='/admin/order'>
              <IoCartOutline size={20} className='aicon' />
              Orders
            </NavLink>
          </li>
          <li>
            <i></i>
            <NavLink to='/admin/users'>
              <HiOutlineUserCircle size={20} className='aicon' />
              User
            </NavLink>
          </li>
          <li>
            <i></i>
            <NavLink to='/admin/review'>
              <BsStars size={20} className='aicon' />
              Review
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}
