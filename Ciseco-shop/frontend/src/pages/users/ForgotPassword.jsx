import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { clearError, forgotPassword } from "../../redux/actions/authAction"

export const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const dispatch = useDispatch()
  const history = useHistory()

  const { error, loading, message } = useSelector((state) => state.forgotPassword)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
    if (message) {
      toast.success(message)
    }
  }, [dispatch, history, error, message])

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.set("email", email)

    dispatch(forgotPassword(formData))
  }

  return (
    <>
      <section className='login'>
        <div className='container'>
          <h1 style={{ fontSize: "45px", textAlign: "left" }}>Forgot Password </h1>

          <form className='login_form' onSubmit={submitHandler} encType='multipart/form-data'>
            <div className='input'>
              <label>Enter Email</label>
              <input type='email' name='email' placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <button type='submit' className='button' disabled={loading ? true : false}>
              Continue
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
