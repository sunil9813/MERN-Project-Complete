import React from "react"
import { BiPaperPlane } from "react-icons/bi"
import profile from "../../components/assets/images/avatar-1.png"
import { Dashboardtitle } from "../../components/common/Dashboardtitle"

export const DashboardChat = () => {
  return (
    <>
      <div className='relative bg-white p-3 card rounded-xl col-span-1 h-[80vh]'>
        <Dashboardtitle title='Chat Box' /> <hr />
        <div className='h-[65vh] overflow-hidden hover:overflow-y-scroll'>
          <div className='flexCenter my-3'>
            <div className='size-80'>
              <img src={profile} alt='profile' className='rounded-full' />
            </div>
            <div className='rounded-lg ml-5 border-2 border-solid border-gray-300 w-full p-4'>
              <p>Hello, Codervent</p>
            </div>
          </div>
          <div className='flexCenter my-3'>
            <div className='rounded-lg mr-5 border-2 border-solid border-gray-300 w-full p-4'>
              <p>Hello, Codervent</p>
            </div>
            <div className='size-80'>
              <img src={profile} alt='profile' className='rounded-full' />
            </div>
          </div>
          <div className='flexCenter my-3'>
            <div className='size-80'>
              <img src={profile} alt='profile' className='rounded-full' />
            </div>
            <div className='rounded-lg ml-5 border-2 border-solid border-gray-300 w-full p-4'>
              <p>Hello, Codervent</p>
            </div>
          </div>
          <div className='flexCenter my-3'>
            <div className='rounded-lg mr-5 border-2 border-solid border-gray-300 w-full p-4'>
              <p>Hello, Codervent</p>
            </div>
            <div className='size-80'>
              <img src={profile} alt='profile' className='rounded-full' />
            </div>
          </div>
          <div className='flexCenter my-3'>
            <div className='size-80'>
              <img src={profile} alt='profile' className='rounded-full' />
            </div>
            <div className='rounded-lg ml-5 border-2 border-solid border-gray-300 w-full p-4'>
              <p>Hello, Codervent</p>
            </div>
          </div>
          <div className='flexCenter my-3'>
            <div className='rounded-lg mr-5 border-2 border-solid border-gray-300 w-full p-4'>
              <p>Hello, Codervent</p>
            </div>
            <div className='size-80'>
              <img src={profile} alt='profile' className='rounded-full' />
            </div>
          </div>
          <div className='flexCenter my-3'>
            <div className='size-80'>
              <img src={profile} alt='profile' className='rounded-full' />
            </div>
            <div className='rounded-lg ml-5 border-2 border-solid border-gray-300 w-full p-4'>
              <p>Hello, Codervent</p>
            </div>
          </div>
          <div className='flexCenter my-3'>
            <div className='rounded-lg mr-5 border-2 border-solid border-gray-300 w-full p-4'>
              <p>Hello, Codervent</p>
            </div>
            <div className='size-80'>
              <img src={profile} alt='profile' className='rounded-full' />
            </div>
          </div>
        </div>
        <div className='flex sticky bg-white bottom-[-15px] left-0 w-full border-t-2 border-gray-200 py-3 px-2'>
          <input type='text' id='website-admin' className='rounded-none rounded-l-lg bg-gray-100 border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' placeholder='Type your message...' />
          <button className='flex-shrink-0 z-10 inline-flex items-center rounded-r-lg py-2.5 px-4 text-smfont-medium text-center text-gray-900 bg-blue  border-2 border-solid border-blue focus:ring-4 focus:outline-none focus:ring-blue-300 ' type='button'>
            <BiPaperPlane className='text-white' size={20} />
          </button>
        </div>
      </div>
    </>
  )
}
