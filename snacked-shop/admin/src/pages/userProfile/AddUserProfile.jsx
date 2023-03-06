import React from "react"
import { Link } from "react-router-dom"

export const AddUserProfile = () => {
  return (
    <>
      <div className='bg-white card rounded-lg w-full'>
        <h2 className='text-lg p-3 text-primary'>My Account</h2>
        <hr className='my-4 mt-2' />

        <div className='m-4'>
          <form>
            <div className='inputs border-2 border-gray-200 rounded-lg mb-4'>
              <h3 className='text-md p-3 text-primary'>USER INFORMATION</h3>
              <hr />
              <div className='p-3 w-full'>
                <div className='flex justify-between'>
                  <div className='input w-full m-2'>
                    <label className='mb-2 block'>Username</label>
                    <input type='text' placeholder='@sunil' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900  text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
                  </div>
                  <div className='input w-full m-2'>
                    <label className='mb-2 block'>Email Address</label>
                    <input type='text' placeholder='sunil@gmail.com' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
                  </div>
                </div>
                <div className='flex justify-between'>
                  <div className='input w-full m-2'>
                    <label className='mb-2 block'>First Name</label>
                    <input type='text' placeholder='Sunil' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900  text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
                  </div>
                  <div className='input w-full m-2'>
                    <label className='mb-2 block'>Last Name</label>
                    <input type='text' placeholder='BK' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
                  </div>
                </div>
              </div>
            </div>
            <div className='inputs border-2 border-gray-200 rounded-lg mb-4'>
              <h3 className='text-md p-3 text-primary'>CONTACT INFORMATION</h3>
              <hr />
              <div className='p-3 w-full'>
                <div className='flex justify-between'>
                  <div className='input w-full m-2'>
                    <label className='mb-2 block'>Address</label>
                    <input type='text' placeholder='47-A,City Name, Nepal' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900  text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
                  </div>
                  <div className='input w-full m-2'>
                    <label className='mb-2 block'>Country</label>
                    <input type='text' placeholder='Nepal' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
                  </div>
                </div>
                <div className='input m-2 mr-2'>
                  <label className='mb-2 block'>Pine Code</label>
                  <input type='text' placeholder='Sunil' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900  text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
                </div>
                <div className='input m-2 mr-2'>
                  <label className='mb-2 block'>About Me</label>
                  <textarea placeholder='Describe Yourself' name='' id='' cols='30' rows='10' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900  text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300'></textarea>
                </div>
              </div>
            </div>
            <Link to='/edit-profile'>
              <button className='rounded-lg mt-4 py-2.5 px-12 text-smfont-medium text-center text-white bg-blue  border-2 border-solid border-blue focus:ring-4 focus:outline-none focus:ring-blue-300 ' type='button'>
                Save Changes
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}
