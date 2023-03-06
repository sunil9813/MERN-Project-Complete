import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useLocation } from "react-router-dom"
import { Loader } from "../../components/common/Loader"
import { clearError, login, validateEmail } from "../../redux/actions/authAction"
import { toast } from "react-toastify"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const history = useHistory()

  // yo chai shipping ko time ma garne
  const location = useLocation()
  const redirect = location.search ? location.search.split("=")[1] : "/"
  // yadi user login xaina bhane check out button ma click garna kojako xa bane
  // login page ma send garxa first ma login page ma send garxa and after login redirect garxa to check out page ma
  // ----end here

  const { isAuth, error, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuth) {
      history.push("/")
      // this is also yo chai shipping ko time ma garne
      history.push(redirect)
      toast.success("Login Successful")
    }
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [dispatch, alert, isAuth, error, history])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!email || !password) {
      return toast.error("All fields are required")
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter valid email")
    }

    dispatch(login(email, password))
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className='login'>
          <div className='container'>
            <h1>Login</h1>

            <form className='login_form' onSubmit={submitHandler}>
              <div className='input'>
                <label>Email address</label>
                <input type='email' name='email' placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='input'>
                <div className='flex-between'>
                  <label>Password</label>
                  <Link to='/password/forgot'>Forgot Password</Link>
                </div>
                <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type='submit' className='button'>
                Continue
              </button>
            </form>
            <p>
              New user? <Link to='/register'> Create an account</Link>
            </p>
          </div>
        </section>
      )}
    </>
  )
}
