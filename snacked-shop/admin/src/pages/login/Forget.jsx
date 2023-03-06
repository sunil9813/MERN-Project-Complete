import React from "react"
import { useState } from "react"
import { BiLockAlt } from "react-icons/bi"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import forgetImg from "../../components/assets/images/f2.webp"
import { forgotPassword, validateEmail } from "../../services/authServices"

export const Forget = () => {
  const [email, setEmail] = useState("")

  const forgot = async (e) => {
    e.preventDefault()

    if (!email) {
      return toast.error("Please enter an email.")
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter valid email.")
    }

    const userData = {
      email,
    }

    await forgotPassword(userData)
    setEmail("")
  }
  return (
    <>
      <div className='forgot'>
        <section className='max-w-5xl h-[70vh] m-auto mt-[7%] bg-white rounded-[30px] border-solid border-2 border-gray-200 shadow-lg'>
          <div className='container flex justify-between'>
            <div className='left border-solid border-r-2 border-gray-200 w-[50%] h-[70vh] flex justify-center items-center'>
              <img src={forgetImg} alt='img' width='100%' height='100%' className='bg-contain' />
            </div>
            <div className='right w-[50%] p-12'>
              <h3 className='text-2xl text-gray-500'>Forget Password?</h3>
              <p className='mt-2 mb-10'>Enter your registered email ID to reset the password</p>

              <form onSubmit={forgot}>
                <label className='text-gray_100'>Email ID</label>
                <div class='input relative block mb-5 mt-2'>
                  <span class='absolute inset-y-0 left-0 flex items-center pl-5'>
                    <BiLockAlt class='h-5 w-5 fill-gray-500' />
                  </span>
                  <input
                    class='bg-white w-full border-solid border-2 border-gray-300
		   rounded-full py-3 pl-12 pr-3 sm:text-sm placeholder:text-gray-400'
                    placeholder='Email'
                    type='text'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button type='submit' className='variantButton w-[100%] h-[50px] btn-l my-3'>
                  Send
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
