import React from "react"

export const User = ({ userProf, name, email, role, handleInputChange, saveUserUpdateRole }) => {
  return (
    <>
      <form onSubmit={saveUserUpdateRole} className='bg-white card rounded-lg p-4 w-1/3 m-7'>
        <h4 className='text-xl text-primary mr-4'>Update User </h4>

        <div className='input w-full mt-5'>
          <label className='mb-2 block'>User Name</label>
          <input name='name' value={name} onChange={handleInputChange} type='text' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' placeholder='Product Name' />
        </div>
        <div className='input w-full mt-5'>
          <label className='mb-2 block'>User Email</label>
          <input name='email' value={email} onChange={handleInputChange} type='text' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' placeholder='Product Name' />
        </div>
        <div className='input w-full mt-5'>
          <label className='mb-2 block'>Select Role</label>
          <select name='role' value={userProf?.role} onChange={handleInputChange} className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300'>
            <option value=''>Choose Role</option>
            <option value='admin'>admin</option>
            <option value='normal'>normal</option>
          </select>
        </div>
        <button type='submit' class='rounded-lg mt-4 py-2.5 px-4 text-smfont-medium text-center text-white bg-blue  border-2 border-solid border-blue focus:ring-4 focus:outline-none focus:ring-blue-300 '>
          Update User
        </button>
      </form>
    </>
  )
}
