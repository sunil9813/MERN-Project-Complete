import React, { useState } from "react"
import { BsFillBellFill } from "react-icons/bs"
import { notification } from "../assets/data"

export const Notification = () => {
  const [openModel, setOpenModel] = useState(false)
  const close = () => {
    setOpenModel(null)
  }
  return (
    <>
      <section className='header_notification'>
        <div className='badge' onClick={() => setOpenModel(!openModel)}>
          <BsFillBellFill className='icon' />
          <span>5</span>
        </div>
        {openModel && (
          <div className='modelContent' onClick={close}>
            <div className='modelContent_boxs'>
              <h2>Notifications</h2>
              {notification.map((item) => (
                <div className='modelContent_boxs_box'>
                  <div className={`modelContent_boxs_box_item ${item.class}`}>
                    <i>{item.icon}</i>
                  </div>
                  <div className='text'>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <div className='date'>
                    <p>{item.time}</p>
                  </div>
                </div>
              ))}
              <button>View All Notifications</button>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
