import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { SpinnerImg } from "../../components/loader/Loader"
import useRedirectLoggedOutUser from "../../customeHook/useRedirectLoggedOutUser"
import { SET_NAME, SET_USER } from "../../redux/auth/authSlice"
import { getUser } from "../../services/authServices"

export const ViewUserProfile = () => {
  useRedirectLoggedOutUser("/login")

  const dispatch = useDispatch()
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // fetch user data
  useEffect(() => {
    setIsLoading(true)

    async function getUserData() {
      const data = await getUser()

      setProfile(data)
      setIsLoading(false)
      await dispatch(SET_USER(data))
      await dispatch(SET_NAME(data.name))
    }
    getUserData()
  }, [dispatch])
  return (
    <>
      <div className='bg-white card rounded-lg p-4 h-[105vh] w-full col-span-1'>
        {isLoading && <SpinnerImg />}
        {!isLoading && profile === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <>
            <div className='img size-150 m-auto'>
              <img src={profile?.photo} alt='profileImg' className='bg-black size-150 object-cover rounded-full shadow-xl' />
            </div>
            <div className='flex justify-between my-10 p-4 text-center'>
              <div>
                <h3 className='text-primary text-2xl'>45</h3>
                <span>Friends</span>
              </div>
              <div>
                <h3 className='text-primary text-2xl'>15</h3>
                <span>Photos</span>
              </div>
              <div>
                <h3 className='text-primary text-2xl'>86</h3>
                <span>Comments</span>
              </div>
            </div>
            <h1 className='text-3xl text-primary text-center capitalize'>{profile?.name}, 22</h1>
            <label className='block text-center'>Kathamandu ,Nepal</label>

            <h4 className='text-lg text-primary text-center mt-7'>Web Developer - Youtube Technology</h4>
            <label className='block text-center'>University of Information Technology</label>

            <hr className='my-5' />
            <h3 className='text-primary text-2xl my-5'>About</h3>
            <p className='text-lg'>{profile?.bio} </p>

            <div className='flex mt-7'>
              <h4 className='text-lg text-primary mr-4'>Email : </h4>
              <label>{profile?.email} </label>
            </div>
            <div className='flex mt-2'>
              <h4 className='text-lg text-primary mr-4'>Phone : </h4>
              <label> {profile?.phone}</label>
            </div>
            <label> {profile?.role}</label>
          </>
        )}
      </div>
    </>
  )
}
