import React, { useState } from "react"
import { BsFillChatRightFill } from "react-icons/bs"
import { chat } from "../assets/data"

export const Chat = () => {
  const [openModel, setOpenModel] = useState(false)
  const close = () => {
    setOpenModel(null)
  }
  return (
    <>
      <section className='header_chat'>
        <div className='badge' onClick={() => setOpenModel(!openModel)}>
          <BsFillChatRightFill className='icon' />
          <span>5</span>
        </div>
        {openModel && (
          <div className='modelContent' onClick={close}>
            <div className='modelContent_boxs'>
              <h2>Message</h2>
              {chat.map((item) => (
                <div className='modelContent_boxs_box'>
                  <div className='modelContent_boxs_box_item'>
                    <img src={item.profile} alt='' />
                  </div>
                  <div className='text'>
                    <h3>{item.name}</h3>
                    <p>{item.desc.slice(0, 30)}...</p>
                  </div>
                  <div className='date w-7'>
                    <p>{item.time}</p>
                  </div>
                </div>
              ))}
              <button>View All Messages</button>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
