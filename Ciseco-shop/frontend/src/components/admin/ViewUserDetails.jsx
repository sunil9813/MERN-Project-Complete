import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { clearError, getUserDetails } from "../../redux/actions/authAction"
import { Loader } from "../common/Loader"
import { Sidebar } from "./Sidebar"

export const ViewUserDetails = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const { user, error, loading } = useSelector((state) => state.userDetails)
  const userId = params.id
  console.log(user)
  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId))
    }
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [dispatch, error, user, userId])

  return (
    <>
      <main className='main dashboard'>
        <Sidebar />
        <section className='create_product admin viewUserAdmin'>
          <h1>User Details</h1>
          {loading ? (
            <Loader />
          ) : (
            <div className='login_form'>
              <div className='left'>
                <div className='input'>
                  <label>Username</label>
                  <input type='text' name='name' value={user.name} readOnly />
                </div>
                <div className='input'>
                  <label>Email</label>
                  <input type='text' name='email' value={user.email} readOnly />
                </div>
                <div className='input'>
                  <label>Role</label>
                  <input type='text' name='email' value={user.role} readOnly />
                </div>
              </div>
              <div className='right'>
                <div className='img'>
                  <img src={user?.avatar?.url} alt='' />
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
