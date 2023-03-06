import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { clearError, loadUser, updatePassword } from "../../redux/actions/authAction"
import { UPDATE_PASSWORD_RESET } from "../../redux/constrants/userConstrants"
import { Loader } from "../../components/common/Loader"

export const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const history = useHistory()

  const { error, isUpdated, loading } = useSelector((state) => state.user)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
    if (isUpdated) {
      toast.success("Password Updated Successful")
      dispatch(loadUser())
      history.push("/me")
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      })
    }
  }, [dispatch, history, error, isUpdated])

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.set("oldPassword", oldPassword)
    formData.set("password", password)

    dispatch(updatePassword(formData))
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className='login'>
          <div className='container'>
            <h1 style={{ fontSize: "45px", textAlign: "left" }}>Update Password </h1>

            <form className='login_form' onSubmit={submitHandler} encType='multipart/form-data'>
              <div className='input'>
                <label>Old Password</label>
                <input type='password' name='name' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </div>
              <div className='input'>
                <label>New Password</label>
                <input type='password' name='email' value={password} onChange={(e) => setPassword(e.target.value)} />
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
