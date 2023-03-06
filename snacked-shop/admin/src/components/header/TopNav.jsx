import React from "react"
import logo from "../assets/images/favicon.png"
import { Link } from "react-router-dom"
import { topNavLeftLink } from "../assets/data"
import { ShowOnLogin, ShowOnLogOut } from "../protect/HiddenLinks"

export const TopNav = () => {
  return (
    <>
      <section className='login py-[11px] bg-white rounded-lg border-solid border-2 border-gray-200 border-5'>
        <div className='flex justify-between items-center max-w-7xl m-auto '>
          <div className='left flex center'>
            <div className='logo flex justify-center items-center mr-10'>
              <img src={logo} alt='logo ' width='50px' />
              <h3 className='text-blue text-2xl'>SNACKED</h3>
            </div>
            <ul className='inline-block'>
              {topNavLeftLink.map((item) => (
                <li className='inline-block p-2 text-gray_100  hover:text-gray_500'>
                  <Link to={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='right'>
            <ul className='inline-block'>
              <li className='inline-block p-2 text-gray_100 hover:text-gray_500'>
                <Link>English</Link>
              </li>
              <li className='inline-block p-2 text-gray_100  hover:text-gray_500'>
                <Link>Supoort</Link>
              </li>
              <ShowOnLogOut>
                <li className='inline-block p-2 text-gray_100  hover:text-gray_500'>
                  <Link to='/login'>
                    <button className='variantButton'>Login</button>
                  </Link>
                </li>
              </ShowOnLogOut>

              <ShowOnLogOut>
                <li className='inline-block p-2 text-gray_100  hover:text-gray_500'>
                  <Link to='/register'>
                    <button className='variantButton-outline'>Register</button>
                  </Link>
                </li>
              </ShowOnLogOut>

              <ShowOnLogin>
                <li className='inline-block p-2 text-gray_100  hover:text-gray_500  '>
                  <Link to='/dashboard'>
                    <button className='variantButton-outline'>Dashboard</button>
                  </Link>
                </li>
              </ShowOnLogin>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
