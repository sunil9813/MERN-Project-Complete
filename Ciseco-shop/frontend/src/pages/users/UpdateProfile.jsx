import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { clearError, loadUser, updateProfile } from "../../redux/actions/authAction"
import { UPDATE_PROFILE_RESET } from "../../redux/constrants/userConstrants"
import { Loader } from "../../components/common/Loader"

export const UpdateProfile = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState("/images/user.png")

  const dispatch = useDispatch()
  const history = useHistory()

  const { user } = useSelector((state) => state.auth)
  const { error, isUpdated, loading } = useSelector((state) => state.user)

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setAvatarPreview(user.avatar.url)
    }
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
    if (isUpdated) {
      dispatch(loadUser())
      history.push("/me")
      dispatch({
        type: UPDATE_PROFILE_RESET,
      })
      toast.success("Updated Successful")
    }
  }, [dispatch, history, error, isUpdated])

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.set("name", name)
    formData.set("email", email)
    formData.set("avatar", avatar)

    dispatch(updateProfile(formData))
  }

  const onChange = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      // 3 state => 0 mean just created, 1 means processsing and 2 mean everything in ready
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result)
        setAvatar(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className='login'>
          <div className='container'>
            <h1>Update Profile</h1>

            <form className='login_form' onSubmit={submitHandler} encType='multipart/form-data'>
              <div className='input'>
                <label>Username</label>
                <input type='text' name='name' placeholder='Jone done' value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='input'>
                <label>Email address</label>
                <input type='email' name='email' placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className='images'>
                <label htmlFor='avatar_upload'>Avatar</label>
                <div className='flex'>
                  <div className='img'>
                    <div className='img'>
                      <img src={avatarPreview} alt='avatarPreview' />
                    </div>
                  </div>
                  <div className='input'>
                    <div className='custom-file-upload'>
                      <input type='file' name='avatar' accept='images/*' onChange={onChange} id='file' aria-label='File browser example' />
                    </div>
                  </div>
                </div>
              </div>
              <button type='submit' className='button' disabled={loading ? true : false}>
                Continue
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  )
}
