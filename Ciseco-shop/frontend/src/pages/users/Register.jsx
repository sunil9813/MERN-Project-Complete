import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { Loader } from "../../components/common/Loader"
import { clearError, register, validateEmail } from "../../redux/actions/authAction"

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { name, email, password } = user

  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState("/images/user.png")

  const dispatch = useDispatch()
  const history = useHistory()

  const { isAuth, error, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuth) {
      history.push("/")
    }
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [dispatch, alert, isAuth, error, history])

  const submitHandler = (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      return toast.error("All fields are required.")
    }
    if (password.length < 8) {
      return toast.error("Password must be 8 characters")
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter valid email")
    }

    const formData = new FormData()
    formData.set("name", name)
    formData.set("email", email)
    formData.set("password", password)
    formData.set("avatar", avatar)

    dispatch(register(formData))
    toast.success("Register Successful")
  }

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader()
      reader.onload = () => {
        // 3 state => 0 mean just created, 1 means processsing and 2 mean everything in ready
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }
  return (
    <>
      <section className='login'>
        <div className='container'>
          <h1>Register</h1>

          <form className='login_form' onSubmit={submitHandler} encType='multipart/form-data'>
            <div className='input'>
              <label>Username</label>
              <input type='text' name='name' placeholder='Jone done' value={name} onChange={onChange} />
            </div>
            <div className='input'>
              <label>Email address</label>
              <input type='email' name='email' placeholder='example@gmail.com' value={email} onChange={onChange} />
            </div>
            <div className='input'>
              <label>Password</label>
              <input type='password' name='password' value={password} onChange={onChange} />
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
          <p>
            Already have an account? <Link to='/login'> Sign in</Link>
          </p>
        </div>
      </section>
    </>
  )
}
