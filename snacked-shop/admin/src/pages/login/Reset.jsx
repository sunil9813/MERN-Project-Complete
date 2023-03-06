import React, { useState } from "react"
import { BiLockAlt } from "react-icons/bi"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import resetImg from "../../components/assets/images/r1.webp"
import { resetPassword } from "../../services/authServices"

const initialState = {
  password: "",
  confirm_password: "",
}
export const Reset = () => {
  const [formData, setFormData] = useState(initialState)
  const { password, confirm_password } = formData

  const { resetToken } = useParams()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const reset = async (e) => {
    e.preventDefault()
    console.log(formData)
    console.log(resetToken)

    if (password.length < 8) {
      return toast.error("Password must be 8 Characters")
    }
    if (password !== confirm_password) {
      return toast.error("Password doesn't match")
    }

    const userData = {
      password,
      confirm_password,
    }

    try {
      const data = await resetPassword(userData, resetToken)
      toast.success(data.message)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <div className='reset'>
        <section className='max-w-5xl h-[70vh] m-auto mt-[7%] bg-white rounded-[30px] border-solid border-2 border-gray-200 shadow-lg'>
          <div className='container flex justify-between'>
            <div className='left border-solid border-r-2 border-gray-200 w-[50%] h-[70vh] flex justify-center items-center'>
              <img src={resetImg} alt='img' width='100%' height='100%' className='bg-contain' />
            </div>
            <div className='right w-[50%] p-12'>
              <h3 className='text-2xl text-gray-500'>Genrate New Password</h3>
              <p className='mt-2 mb-10'>We received your reset password request. Please enter your new password!</p>
              <form onSubmit={reset}>
                <label className='text-gray_100'>New Password</label>
                <div class='input relative block mb-5 mt-2'>
                  <span class='absolute inset-y-0 left-0 flex items-center pl-5'>
                    <BiLockAlt class='h-5 w-5 fill-gray-500' />
                  </span>
                  <input
                    class='bg-white w-full border-solid border-2 border-gray-300
                 rounded-full py-3 pl-12 pr-3 sm:text-sm placeholder:text-gray-400'
                    placeholder='Enter New Password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleInputChange}
                  />
                </div>
                <label className='text-gray_100'>Confirm Password</label>
                <div class='input relative block mb-5 mt-2'>
                  <span class='absolute inset-y-0 left-0 flex items-center pl-5'>
                    <BiLockAlt class='h-5 w-5 fill-gray-500' />
                  </span>
                  <input
                    class='bg-white w-full border-solid border-2 border-gray-300
                 rounded-full py-3 pl-12 pr-3 sm:text-sm placeholder:text-gray-400'
                    placeholder='Confirm Password'
                    type='password'
                    name='confirm_password'
                    value={confirm_password}
                    onChange={handleInputChange}
                  />
                </div>

                <button type='submit' className='variantButton w-[100%] h-[50px] btn-l my-3'>
                  Chanage Password
                </button>
              </form>

              <p className='text-center py-2'>
                <Link to='/login' className='text-xl'>
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
