import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../../components/loader/Loader"
import { getAllUser, selectIsAdminLoading, selectUserByAdmin, updateByAdminUser, viewUser } from "../../../redux/auth/adminSlice"
import { User } from "./User"

export const UpdateUser = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(getAllUser)

  /*console.log(`Profiel Name : ${user?.name}`)
  if (user && user._id !== id) {
    console.log(`ID : ${user._id} ==== ${id}`)
  }*/
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getAllUser(id))
    } else {
      setName(user?.name)
      setEmail(user?.email)
      setRole(user?.role)
    }
  }, [dispatch, user, id])

  const saveUserUpdateRole = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.set("name", name)
    formData.set("email", email)
    formData.set("role", role)

    await dispatch(updateByAdminUser({ id, formData }))
    await dispatch(getAllUser())
    navigate("/admin/getalluser")
  }

  /*  const isLoading = useSelector(selectIsAdminLoading)

  const userUpdate = useSelector(selectUserByAdmin)

  const [userProf, setUserProf] = useState(userUpdate)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

  useEffect(() => {
    dispatch(viewUser(id))
  }, [dispatch, id])

  useEffect(() => {
    setUserProf(userUpdate)
    setName(userUpdate && userUpdate.name ? userUpdate.name : "")
    setEmail(userUpdate && userUpdate.email ? userUpdate.email : "")
    setRole(userUpdate && userUpdate.role ? userUpdate.role : "")
  }, [userUpdate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserProf({
      ...userProf,
      [name]: value,
    })
  }
  const saveUserUpdateRole = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    /*   formData.append("name", userProf?.name)
    formData.append("email", userProf?.email)*/
  /* formData.append("role", userProf?.role)

    await dispatch(updateByAdminUser({ id, formData }))
    await dispatch(getAllUser())
    navigate("/admin/getalluser")
  }
*/
  return (
    <>
      {/*{isLoading && <Loader />}*/}

      {/*<User userProf={userProf} name={name} email={email} role={role} handleInputChange={handleInputChange} saveUserUpdateRole={saveUserUpdateRole} />*/}

      <form onSubmit={saveUserUpdateRole} className='bg-white card rounded-lg p-4 w-1/3 m-7'>
        <h4 className='text-xl text-primary mr-4'>Update User </h4>

        <div className='input w-full mt-5'>
          <label className='mb-2 block'>User Name</label>
          <input value={user?.name} onChange={(e) => setName(e.target.value)} type='text' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' placeholder='Product Name' />
        </div>
        <div className='input w-full mt-5'>
          <label className='mb-2 block'>User Email</label>
          <input value={user?.email} onChange={(e) => setEmail(e.target.value)} type='text' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' placeholder='Product Name' />
        </div>
        <div className='input w-full mt-5'>
          <label className='mb-2 block'>Select Role</label>
          <select value={user?.role} onChange={(e) => setRole(e.target.value)} className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300'>
            <option value=''>Choose Role</option>
            <option value='admin'>admin</option>
            <option value='normal'>normal</option>
          </select>
        </div>
        <button type='submit' class='rounded-lg mt-4 py-2.5 px-4 text-smfont-medium text-center text-white bg-blue  border-2 border-solid border-blue focus:ring-4 focus:outline-none focus:ring-blue-300 '>
          Update User
        </button>
      </form>
      {/*  <form onSubmit={saveUserUpdateRole} className='bg-white card rounded-lg p-4 w-1/3 m-7'>
        <h4 className='text-xl text-primary mr-4'>Update User </h4>

        <div className='input w-full mt-5'>
          <label className='mb-2 block'>User Name</label>
          <input name='name' value={user?.name} onChange={handleInputChange} type='text' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' placeholder='Product Name' />
        </div>
        <div className='input w-full mt-5'>
          <label className='mb-2 block'>User Email</label>
          <input name='email' value={user?.email} onChange={handleInputChange} type='text' className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' placeholder='Product Name' />
        </div>
        <div className='input w-full mt-5'>
          <label className='mb-2 block'>Select Role</label>
          <select name='role' value={user?.role} onChange={handleInputChange} className='rounded-lg border-2 border-solid border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-3 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300'>
            <option value=''>Choose Role</option>
            <option value='admin'>admin</option>
            <option value='normal'>normal</option>
          </select>
        </div>
        <button type='submit' class='rounded-lg mt-4 py-2.5 px-4 text-smfont-medium text-center text-white bg-blue  border-2 border-solid border-blue focus:ring-4 focus:outline-none focus:ring-blue-300 '>
          Update User
        </button>
      </form>*/}
      {/*<div className='bg-white card rounded-lg p-4 w-1/3 m-7'>
        <h4 className='text-xl text-primary mr-4'>Update User </h4>

        <div className='flex mt-7'>
          <h4 className='text-lg text-primary mr-4'>Email : </h4>
          <label> </label>
        </div>
        <div className='flex mt-2'>
          <h4 className='text-lg text-primary mr-4'>Phone : </h4>
          <label> </label>
        </div>
        <div className='flex mt-2'>
          <h4 className='text-lg text-primary mr-4'>Role : </h4>
          <label> </label>
        </div>
      </div>*/}
    </>
  )
}
