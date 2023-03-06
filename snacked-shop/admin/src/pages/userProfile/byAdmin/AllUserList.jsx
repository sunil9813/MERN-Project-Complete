import React, { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { AiFillEye } from "react-icons/ai"
import { BiPencil, BiSearch } from "react-icons/bi"
import { FaUserAlt } from "react-icons/fa"
import useRedirectLoggedOutUser from "../../../customeHook/useRedirectLoggedOutUser"
import { useDispatch, useSelector } from "react-redux"
import { deleteByAdminUser, getAllUser } from "../../../redux/auth/adminSlice"
import { selectIsLoggedIn } from "../../../redux/auth/authSlice"
import { SpinnerImg } from "../../../components/loader/Loader"
import { MdDelete } from "react-icons/md"
import { confirmAlert } from "react-confirm-alert"

export const AllUserList = () => {
  useRedirectLoggedOutUser("/login")

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { users, isLoading, isError, message } = useSelector((state) => state.admin)

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllUser())
    }
    // console.log(users)

    if (isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

  //delete user
  const delUser = async (id) => {
    await dispatch(deleteByAdminUser(id))
    await dispatch(getAllUser())
  }
  // delete popup
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete User",
      message: "Are you sure you want to delete this user.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delUser(id),
        },
        {
          label: "Cancel",
        },
      ],
    })
  }

  return (
    <>
      <section className='p-7 w-full'>
        <div className='bg-white p-3 card rounded-sm'>
          <div className='grid grid-cols-10 gap-3'>
            <div className='flex items-center col-span-6 mr-5'>
              <div className='relative w-full'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <BiSearch size={18} />
                </div>
                <input type='text' className='bg-gray-50 border  text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 border-1 border-solid  border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' placeholder='Search' />
              </div>
            </div>
            <div className='col-span-4 flex'>
              <input type='date' className='mr-5 rounded-lg p-1 border-1 border-solid border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
              <select id='large' className='block py-2 px-4 w-full text-base rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300'>
                <option selected>User Role</option>
                <option value='Admin'>Admin</option>
                <option value='Normal'>Normal</option>
              </select>
            </div>
          </div>
          <hr className='my-5' />
          {isLoading && <SpinnerImg />}
          {!isLoading && users?.length === 0 ? (
            <p>No User Found, Please register.</p>
          ) : (
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs uppercase bg-gray-200 text-primary '>
                <tr>
                  <th scope='col' className='py-3 px-6'>
                    SN
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    user Image
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    user name
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    email
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    role
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Date
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((profile, i) => {
                  const { _id, name, email, photo, role, createdAt } = profile

                  return (
                    <>
                      <tr className='bg-white border-b capitalize' key={_id}>
                        <td className='py-4 px-6'>{i + 1}</td>
                        <td className='py-4 px-6'>{photo ? <img src={photo} alt='images' className='size-40 object-cover rounded-full' /> : <FaUserAlt size={30} />}</td>
                        <td className='py-4 px-6'>{name}</td>
                        <td className='py-4 px-6 normal-case'>{email}</td>
                        <td className='py-4 px-6 normal-case'>{role}</td>
                        <td className='py-4 px-6'>{new Date(createdAt).toLocaleDateString()}</td>
                        <td className='py-4 px-6 flex justify-between align-center'>
                          <Link to={`/admin/user-details/${_id}`}>
                            <AiFillEye className='text-blue text-lg' size={22} />
                          </Link>
                          <Link to={`/admin/edit-user/${_id}`}>
                            <BiPencil className='text-green-500 text-lg mx-3' size={22} />
                          </Link>
                          <MdDelete className='text-red-500 text-lg' size={22} onClick={() => confirmDelete(_id)} />
                        </td>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
      {/*<td className='py-4 px-6'>{product.image ? <img src={image?.filePath} alt='images' className='size-40 object-cover' /> : <p>No Image Found!</p>}</td>*/}
      {/*<MdDelete className='text-red-500 text-lg' size={22} onClick={() => confirmDelete(_id)} />*/}
    </>
  )
}
