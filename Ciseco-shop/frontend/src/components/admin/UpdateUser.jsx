import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { UPDATE_USER_RESET } from "../../redux/constrants/userConstrants"
import { updateUserRole, getUserDetails } from "../../redux/actions/authAction"
import { clearError } from "../../redux/actions/productAction"

export const UpdateUser = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()

  const { error, isUpdated } = useSelector((state) => state.user)
  const { user } = useSelector((state) => state.userDetails)
  const userId = params.id

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
    }
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
    if (isUpdated) {
      history.push("/admin/users")
      dispatch({
        type: UPDATE_USER_RESET,
      })
      toast.success("Updated Successful")
    }
  }, [dispatch, history, error, isUpdated, user, userId])

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.set("name", name)
    formData.set("email", email)
    formData.set("role", role)

    dispatch(updateUserRole(user._id, formData))
  }

  return (
    <>
      <main className='main'>
        <Sidebar />
        <section className='updateUser create_product admin viewUserAdmin'>
          <h1>All User </h1>

          <div className='content'>
            <form className='login_form' onSubmit={submitHandler} encType='multipart/form-data'>
              <div className='input'>
                <label>Username</label>
                <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='input'>
                <label>Email</label>
                <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <label>Role</label>
              <select name='role' value={role} onChange={(e) => setRole(e.target.value)}>
                <option value='user'>user</option>
                <option value='admin'>admin</option>
              </select>

              <button type='submit' className='button'>
                Continue
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}
