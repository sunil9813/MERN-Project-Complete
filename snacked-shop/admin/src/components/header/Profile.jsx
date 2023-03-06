import React, { useEffect, useState } from "react"
import { BiLogIn } from "react-icons/bi"
import { profiles } from "../assets/data"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectName, SET_LOGIN, SET_NAME, SET_USER } from "../../redux/auth/authSlice"
import { getUser, logoutUser } from "../../services/authServices"

export const Profile = () => {
  const [openModel, setOpenModel] = useState(false)

  const close = () => {
    setOpenModel(null)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const name = useSelector(selectName)

  const logOut = async () => {
    await logoutUser()
    await dispatch(SET_LOGIN(false))
    navigate("/login")
  }

  const [profile, setProfile] = useState(null)

  // fetch user data
  useEffect(() => {
    async function getUserData() {
      const data = await getUser()
      setProfile(data)
      await dispatch(SET_USER(data))
      await dispatch(SET_NAME(data.name))
    }
    getUserData()
  }, [dispatch])

  return (
    <>
      <section className='header_profile'>
        <div className='header_profile_img' onClick={() => setOpenModel(!openModel)}>
          {profile?.photo ? <img src={profile?.photo} alt='' className='img-cover' /> : <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWDGL-6ZdKn31umHjbxRA6twySHbALSURWNA&usqp=CAU' alt='avtar' />}
        </div>
        {openModel && (
          <div className='modelContent' onClick={close}>
            <div className='modelContent_boxs'>
              <div className='profilePic'>
                <div className='profilePic_img'>{profile?.photo ? <img src={profile?.photo} alt='' className='img-cover' /> : <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWDGL-6ZdKn31umHjbxRA6twySHbALSURWNA&usqp=CAU' alt='avtar' />}</div>
                <div className='profilePic_text'>
                  <h3 className='capitalize'>{name}</h3>
                  <p>{profile.phone}</p>
                </div>
              </div>
              {profiles.map((item) => (
                <div className='modelContent_boxs_box'>
                  <div className={`modelContent_boxs_box_item ${item.class}`}>
                    <i className='icon'>{item.icon}</i>
                  </div>
                  <div className='text'>
                    <Link to={item.name.toLowerCase()}>
                      <h3>{item.name}</h3>
                      <p>{item.desc}</p>
                    </Link>
                  </div>
                  <div className='date'>
                    <p>{item.time}</p>
                  </div>
                </div>
              ))}
              <button onClick={logOut}>
                <BiLogIn className='icon' />
                Logout
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
