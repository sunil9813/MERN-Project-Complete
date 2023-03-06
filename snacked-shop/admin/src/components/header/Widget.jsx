import React, { useState } from "react"
import { IoAppsSharp } from "react-icons/io5"
import { widget } from "../assets/data"
import { Link } from "react-router-dom"

export const Widget = () => {
  const [openModel, setOpenModel] = useState(false)
  const close = () => {
    setOpenModel(null)
  }
  return (
    <>
      <section className='header_widget'>
        <div className='badge' onClick={() => setOpenModel(!openModel)}>
          <IoAppsSharp className='icon' />
        </div>
        {openModel && (
          <div className='modelContent' onClick={close}>
            <div className='modelContent_boxs'>
              {widget.map((item) => (
                <div className='modelContent_boxs_box'>
                  <div className={`modelContent_boxs_box_item ${item.class}`}>
                    <Link to={item.name.toLowerCase()}>
                      <i>{item.icon}</i>
                    </Link>
                  </div>
                  <div className='text'>
                    <h3>{item.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
