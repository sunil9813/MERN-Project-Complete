import React from "react"
import { BsArrowUp, BsCurrencyDollar } from "react-icons/bs"
import { FaShoppingBasket, FaUserFriends } from "react-icons/fa"
import { BiWinkSmile } from "react-icons/bi"

export const TotalSection = () => {
  return (
    <>
      <div className='grid grid-cols-4 gap-7'>
        <div className='flex justify-between items-center bg-white p-3 card rounded-xl'>
          <div className='text'>
            <span className='text-gray_500'>Total Orders</span>
            <h1 className='text-2xl my-2'>5.8K</h1>
            <p className='flex justify-center'>
              <BsArrowUp className='mr-1' /> 22.5% from last week
            </p>
          </div>
          <div className='size-50 rounded-full bg-blue flexCenter'>
            <FaShoppingBasket size={20} className='text-white' />
          </div>
        </div>
        <div className='flex justify-between items-center bg-white p-3 card rounded-xl'>
          <div className='text'>
            <span className='text-gray_500'>Total Income</span>
            <h1 className='text-2xl my-2'>$9,768</h1>
            <p className='flex justify-center'>
              <BsArrowUp className='mr-1' /> 13.5% from last week
            </p>
          </div>
          <div className='size-50 rounded-full bg-green-600 flexCenter'>
            <BsCurrencyDollar size={20} className='text-white' />
          </div>
        </div>
        <div className='flex justify-between items-center bg-white p-3 card rounded-xl'>
          <div className='text'>
            <span className='text-gray_500'>Total Views</span>
            <h1 className='text-2xl my-2'>875</h1>
            <p className='flex justify-center'>
              <BsArrowUp className='mr-1' /> 12.3% from last week
            </p>
          </div>
          <div className='size-50 rounded-full bg-red-500 flexCenter'>
            <BiWinkSmile size={20} className='text-white' />
          </div>
        </div>
        <div className='flex justify-between items-center bg-white p-3 card rounded-xl'>
          <div className='text'>
            <span className='text-gray_500'>New Clients</span>
            <h1 className='text-2xl my-2'>9853</h1>
            <p className='flex justify-center'>
              <BsArrowUp className='mr-1' /> 32.7% from last week
            </p>
          </div>
          <div className='size-50 rounded-full bg-sky-500 flexCenter'>
            <FaUserFriends size={20} className='text-white' />
          </div>
        </div>
      </div>
    </>
  )
}
