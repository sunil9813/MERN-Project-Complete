import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { changePassoword } from "../../services/authServices"

const initialState = {
  oldPassword: "",
  password: "",
  confirm_password: "",
}

export const ChangePassword = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)
  //const [isLoading, setIsLoading] = useState(false)

  const { oldPassword, password, confirm_password } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const chaPassword = async (e) => {
    e.preventDefault()
    if (password !== confirm_password) {
      return toast.error("New Password do not match")
    }

    const formData = {
      oldPassword,
      password,
    }

    const data = await changePassoword(formData)
    toast.success(data.message)
    navigate("/profile")
  }
  return (
    <>
      <section className='w-[35%] m-auto my-5'>
        <div className='bg-white card rounded-lg h-auto p-7'>
          <form onSubmit={chaPassword}>
            <div className='inputs border-2 border-gray-200 rounded-lg mb-4'>
              <h3 className='text-md p-3 text-primary'>CHANGE PASSWORD</h3>
              <hr />
              <div className='px-3 w-full mt-5'>
                <div className='input m-2 mr-2'>
                  <label className='mb-2 block'>Old Password</label>
                  <input type='password' name='oldPassword' value={oldPassword} onChange={handleInputChange} className='rounded-lg border-2 border-solid border-gray-300 text-gray-900  text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
                </div>
              </div>
              <div className='px-3 w-full'>
                <div className='input m-2 mr-2'>
                  <label className='mb-2 block'>New Password</label>
                  <input type='password' name='password' value={password} onChange={handleInputChange} className='rounded-lg border-2 border-solid border-gray-300 text-gray-900  text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
                </div>
              </div>
              <div className='px-3 w-full'>
                <div className='input m-2 mr-2'>
                  <label className='mb-2 block'>Confirm New Password</label>
                  <input type='password' name='confirm_password' value={confirm_password} onChange={handleInputChange} className='rounded-lg border-2 border-solid border-gray-300 text-gray-900  text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
                </div>
              </div>
            </div>
            <button type='submit' className='rounded-lg mt-4 py-2.5 px-12 text-smfont-medium text-center text-white bg-blue  border-2 border-solid border-blue focus:ring-4 focus:outline-none focus:ring-blue-300 '>
              Changes Password
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
