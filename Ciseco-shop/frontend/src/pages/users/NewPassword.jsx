import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { clearError, forgotPassword, resetPassword } from "../../redux/actions/authAction"

export const NewPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()

  const { error, success, loading } = useSelector((state) => state.forgotPassword)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
    if (success) {
      toast.success("Password Updated Successfully")
      history.push("/login")
    }
  }, [dispatch, history, error, success])

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.set("password", password)
    formData.set("confirmPassword", confirmPassword)

    dispatch(resetPassword(params.token, formData))
  }

  return (
    <>
      <section className='login'>
        <div className='container'>
          <h1 style={{ fontSize: "45px", textAlign: "left" }}>New Password Reset </h1>

          <form className='login_form' onSubmit={submitHandler} encType='multipart/form-data'>
            <div className='input'>
              <label>Password</label>
              <input type='text' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='input'>
              <label>Confirm Password</label>
              <input type='text' name='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
