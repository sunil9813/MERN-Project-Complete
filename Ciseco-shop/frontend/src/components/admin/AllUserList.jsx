import React, { useEffect } from "react"
import { AiFillEdit, AiFillEye } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { SearchBox } from "../../pages/common/SearchBox"
import { deleteUser, getAllUsers } from "../../redux/actions/authAction"
import { clearError } from "../../redux/actions/productAction"
import { USER_DELETE_RESET } from "../../redux/constrants/userConstrants"
import { Loader } from "../common/Loader"
import { Pagination } from "../common/Pagination"
import { Sidebar } from "./Sidebar"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"

export const AllUserList = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { loading, error, users } = useSelector((state) => state.allUser)
  const { isDeleted } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getAllUsers())

    if (error) {
      toast.error(error)
      dispatch(clearError())
    }

    if (isDeleted) {
      toast.success("User delete successfully")
      history.push("/admin/users")
      dispatch({ type: USER_DELETE_RESET })
    }
  }, [dispatch, error, history, isDeleted])

  const deleteProductHandler = async (id) => {
    dispatch(deleteUser(id))
  }

  // delete popup
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete User",
      message: "Are you sure you want to delete this user.",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteProductHandler(id),
        },
        {
          label: "Cancel",
        },
      ],
    })
  }

  const UserImg = "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  return (
    <>
      <main className='main'>
        <Sidebar />
        <section className='orderList admin'>
          <h1>All User </h1>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className='content'>
                <SearchBox />
                <div className='tableContent'>
                  <table>
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users?.map((profile, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td style={{ width: "20%" }} className='size-50'>
                              <img src={profile.avatar.url ? profile.avatar.url : UserImg} alt={profile.name} style={{ borderRadius: "50%" }} className='size-50' />
                            </td>

                            <td style={{ textTransform: "capitalize" }}>{profile.name}</td>
                            <td>{profile.email}</td>
                            <td style={{ textTransform: "capitalize" }}>{profile.role}</td>

                            <td width='15%'>
                              <Link to={`/admin/user/view/${profile?._id}`} className='view'>
                                <AiFillEye size={20} />
                              </Link>
                              <button onClick={() => confirmDelete(profile._id)}>
                                <MdDelete className='icon delete' size={20} />
                              </button>
                              {/*<button onClick={() => deleteProductHandler(profile._id)}>
                                <MdDelete className='icon delete' size={20} />
                              </button>*/}
                              <Link to={`/admin/user/${profile._id}`} className='view'>
                                <AiFillEdit className='icon' size={20} />
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <Pagination />
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  )
}
