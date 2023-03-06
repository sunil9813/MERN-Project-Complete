import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { SpinnerImg } from "../../../components/loader/Loader"
import useRedirectLoggedOutUser from "../../../customeHook/useRedirectLoggedOutUser"
import { viewUser } from "../../../redux/auth/adminSlice"
import { selectIsLoggedIn } from "../../../redux/auth/authSlice"

export const ViewUser = () => {
  useRedirectLoggedOutUser("/login")

  const dispatch = useDispatch()
  const { id } = useParams()

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { user, isLoading, isError, message } = useSelector((state) => state.admin)

  const roles = (role) => {
    if (role === "admin") {
      return <span className='text-green-500'>Admin User</span>
    }
    return <span className='text-red-500'>Normal User</span>
  }

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(viewUser(id))
    }
    console.log(user)

    if (isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

  return (
    <>
      <div className='bg-white card rounded-lg p-4 w-1/3 m-7'>
        {isLoading && <SpinnerImg />}
        {user && (
          <>
            <div className='img size-150 m-auto'>
              <img src={user?.photo} alt='profileImg' className='bg-black size-150 object-cover rounded-full shadow-xl' />
            </div>

            <h1 className='text-3xl my-3 text-primary text-center capitalize'>{user?.name} </h1>

            <hr className='my-5' />
            <h3 className='text-primary text-2xl my-5'>About</h3>
            <p className='text-lg'>{user?.bio} </p>

            <div className='flex mt-7'>
              <h4 className='text-lg text-primary mr-4'>Email : </h4>
              <label>{user?.email} </label>
            </div>
            <div className='flex mt-2'>
              <h4 className='text-lg text-primary mr-4'>Phone : </h4>
              <label> {user?.phone}</label>
            </div>
            <div className='flex mt-2'>
              <h4 className='text-lg text-primary mr-4'>Role : </h4>
              <label> {roles(user?.role)}</label>
            </div>
          </>
        )}
      </div>
    </>
  )
}
