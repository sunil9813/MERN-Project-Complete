import React from "react"
import { AiFillStar } from "react-icons/ai"
import { chat } from "../../components/assets/data"
import { Dashboardtitle } from "../../components/common/Dashboardtitle"
import { DashboardChat } from "./DashboardChat"

export const DashboardCustomer = () => {
  return (
    <>
      <section className='grid grid-cols-2 gap-7'>
        <div className='relative bg-white p-3 card rounded-xl col-span-1 h-[80vh]'>
          <Dashboardtitle title='Customer Reviews' />
          <div className='h-[65vh] overflow-hidden hover:overflow-y-scroll'>
            {chat.map((user, i) => (
              <div className='flex py-4 border-t-2 border-gray-200 chats' key={i}>
                <div className='size-80'>
                  <img src={user.profile} alt='profile' className='rounded-full' />
                </div>
                <div className='text ml-5 w-full'>
                  <div className='flex'>
                    <AiFillStar className='text-yellow' size={17} />
                    <AiFillStar className='text-yellow' size={17} />
                    <AiFillStar className='text-yellow' size={17} />
                    <AiFillStar className='text-yellow' size={17} />
                    <AiFillStar className='text-yellow' size={17} />
                  </div>
                  <div className='flex justify-between w-full my-3'>
                    <h3>{user.name}</h3>
                    <span>February 16, 2021</span>
                  </div>
                  <p className='text-sm'>{user.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex sticky bg-white bottom-[-15px] left-0 w-full p-8'></div>
        </div>
        <DashboardChat />
      </section>
    </>
  )
}
