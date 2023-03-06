import React, { useState } from "react"
import img from "../../components/assets/images/register-auth.png"
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { ImLinkedin } from "react-icons/im"
import { BsFacebook } from "react-icons/bs"
import { MdOutlineMarkEmailUnread } from "react-icons/md"
import { BiLockAlt, BiUserCircle } from "react-icons/bi"
import { useDispatch } from "react-redux"
import Loader from "../../components/loader/Loader"
import { toast } from "react-toastify"
import { registerUser, validateEmail } from "../../services/authServices"
import { SET_LOGIN, SET_NAME } from "../../redux/auth/authSlice"

//what are thinks that we need in frontend
// but password_conform doesnt fetch from backend
const initialState = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
}

export const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)

  const { name, email, password, confirm_password } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    //validation to frontend
    if (!name || !email || !password) {
      return toast.error("All fields are required.")
    }
    //match password
    if (password !== confirm_password) {
      return toast.error("Password do not match")
    }
    if (password.length < 8) {
      return toast.error("Password must be 8 characters")
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter valid email")
    }

    const userData = {
      name,
      email,
      password,
    }

    //to register user
    setIsLoading(true)
    try {
      const data = await registerUser(userData)
      console.log(data)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate("/dashboard")
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error.message)
    }
    console.log(formData)
  }
  return (
    <>
      <section className='login max-w-7xl m-auto my-10 bg-white rounded-lg border-solid border-2 border-gray-200 border-5 '>
        {isLoading && <Loader />}
        <div className='container flex justify-between'>
          <div className='left border-solid border-r-2 border-gray-200 w-[70%] h-auto flex justify-center items-center'>
            <img src={img} alt='img' width='100%' height='100%' className='bg-contain' />
          </div>
          <div className='right w-[30%] p-5'>
            <h3 className='text-xl'>Sign Up</h3>
            <p className='mt-2 mb-10'>See your growth and get consulting support!</p>
            <form onSubmit={handleRegister}>
              <label className='text-gray_100'>Username</label>
              <div class='input relative block mb-5 mt-2'>
                <span class='absolute inset-y-0 left-0 flex items-center pl-5'>
                  <BiUserCircle class='h-5 w-5 fill-gray-500' />
                </span>
                <input
                  class='bg-white w-full border-solid border-2 border-gray-300
                 rounded-full py-3 pl-12 pr-3 sm:text-sm placeholder:text-gray-400'
                  placeholder='Username'
                  type='text'
                  name='name'
                  value={name}
                  onChange={handleInputChange}
                />
              </div>
              <label className='text-gray_100'>Email Address</label>
              <div class='input relative block mb-5 mt-2'>
                <span class='absolute inset-y-0 left-0 flex items-center pl-5'>
                  <MdOutlineMarkEmailUnread class='h-5 w-5 fill-gray-500' />
                </span>
                <input
                  class='bg-white w-full border-solid border-2 border-gray-300
                 rounded-full py-3 pl-12 pr-3 sm:text-sm placeholder:text-gray-400'
                  placeholder='Email'
                  type='text'
                  name='email'
                  value={email}
                  onChange={handleInputChange}
                />
              </div>
              <label className='text-gray_100'>Enter Password</label>
              <div class='inputs relative block mt-2 mb-5'>
                <span class='absolute inset-y-0 left-0 flex items-center pl-5'>
                  <BiLockAlt class='h-5 w-5 fill-gray-500' />
                </span>
                <input
                  class='bg-white w-full border-solid border-2 border-gray-300 
                rounded-full py-3 pl-12 pr-3 sm:text-sm placeholder:text-gray-400'
                  placeholder='Password'
                  type='password'
                  name='password'
                  value={password}
                  onChange={handleInputChange}
                />
              </div>
              <label className='text-gray_100'>Confirm Password</label>
              <div class='inputs relative block mt-2'>
                <span class='absolute inset-y-0 left-0 flex items-center pl-5'>
                  <BiLockAlt class='h-5 w-5 fill-gray-500' />
                </span>
                <input
                  class='bg-white w-full border-solid border-2 border-gray-300 
                rounded-full py-3 pl-12 pr-3 sm:text-sm placeholder:text-gray-400'
                  placeholder='Password'
                  type='password'
                  name='confirm_password'
                  value={confirm_password}
                  onChange={handleInputChange}
                />
              </div>

              <div className='flex items-center my-10'>
                <input type='checkbox' className='w-8 h-5' /> <label>Remember Me</label>
                <Link to='/forget' className='text-blue ml-14'>
                  Forget Password?
                </Link>
              </div>
              <button type='submit' className='variantButton w-[100%] h-10  btn-l'>
                Sign In
              </button>
            </form>

            <div className='flex justify-center items-center mt-10'>
              <hr className='border-solid border-1 border-gray-300 bg-gray-300 w-[25%]' />
              <p className='text-gray_100'>OR SIGN IN WITH EMAIL</p>
              <hr className='border-solid border-1 border-gray-300  bg-gray-300 w-[25%]' />
            </div>

            <div className='flex justify-evenly mt-4'>
              <div className='w-14 h-14 p-3 border-solid border-2 border-gray-100 rounded-lg  hover:border-red-100 ease-in-out cursor-pointer'>
                <FcGoogle size={25} />
              </div>
              <div className='w-14 h-14 p-3 border-solid border-2 border-gray-100 rounded-lg hover:border-[#678eb552] ease-in-out cursor-pointer'>
                <ImLinkedin size={25} className='text-[#0A66C2]' />
              </div>
              <div className='w-14 h-14 p-3 border-solid border-2 border-gray-100 rounded-lg hover:border-[#399fe352] ease-in-out cursor-pointer'>
                <BsFacebook size={25} className='text-blue' />
              </div>
            </div>
            <p className='text-center py-2'>
              Don't have an account yet?
              <Link to='/login' className='text-blue text-sm'>
                Sign In here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
