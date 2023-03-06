import React, { useState } from "react"
import { Card, Profile, Search } from "../../routes/index"
import { navList } from "../assets/data/data"
import logo from "../assets/images/logo.svg"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import { Link, Route } from "react-router-dom"

export const Header = () => {
  // scroll navbar
  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header")
    header.classList.toggle("active", this.window.scrollY > 100)
  })

  const [mobile, setMobile] = useState(false)

  return (
    <>
      <header className='header'>
        <section className='header_container container'>
          <div className='logo'>
            <img src={logo} alt='logo' />
          </div>
          <div className='header_container_nav'>
            <ul className={mobile ? "mobile-nav" : "menu"}>
              {navList.map((list) => (
                <li key={list.id}>
                  <Link to={list.path}>{list.name}</Link>
                </li>
              ))}
            </ul>
            <div className='toggle'>
              <button onClick={() => setMobile(!mobile)}>{mobile ? <AiOutlineClose className='close' size={22} /> : <AiOutlineMenu className='open' size={22} />}</button>
            </div>
          </div>

          <div className='header_container_right'>
            <Route render={({ history }) => <Search history={history} />} />
            <Card />
            <Profile />
          </div>
        </section>
      </header>
    </>
  )
}
