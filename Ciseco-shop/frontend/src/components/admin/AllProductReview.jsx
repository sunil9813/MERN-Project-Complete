import React, { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { getAllUsers } from "../../redux/actions/authAction"
import { clearError, deleteProductReview, getProductsReviews } from "../../redux/actions/productAction"
import { Pagination } from "../common/Pagination"
import { Sidebar } from "./Sidebar"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { FiSearch } from "react-icons/fi"

export const AllProductReview = () => {
  const [productId, setProductId] = useState("")
  const dispatch = useDispatch()
  const history = useHistory()

  const { error, reviews } = useSelector((state) => state.productReview)
  const { isDeleted, error: deleteError } = useSelector((state) => state.deleteProductReview)

  useEffect(() => {
    dispatch(getAllUsers())

    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
    if (deleteError) {
      toast.error(deleteError)
      dispatch(clearError())
    }

    if (productId !== "") {
      dispatch(getProductsReviews(productId))
    }
    if (isDeleted) {
      toast.success("Review delete successfully")
      history.push("/admin/review")
    }
  }, [dispatch, error, history, productId, isDeleted, deleteError])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(getProductsReviews(productId))
  }

  // delete popup
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Review",
      message: "Are you sure you want to delete this review.",
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

  const deleteProductHandler = async (id) => {
    dispatch(deleteProductReview(id, productId))
  }
  return (
    <>
      <main className='main'>
        <Sidebar />
        <section className='admin orderList adminReview'>
          <h1>Find Reviews </h1>
          <div className='content'>
            <div className='tableContent'>
              <form className='searchBox'>
                <div className='search_item flex' onSubmit={submitHandler}>
                  <FiSearch className='search-icon' size={20} />
                  <input type='text' placeholder='Search here...' value={productId} onChange={(e) => setProductId(e.target.value)} />
                </div>
              </form>
              <br />
              {reviews && reviews.length > 0 ? (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th>Review ID</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>User</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews &&
                        reviews?.map((review, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td style={{ width: "20%" }} className='size-50'>
                              {review._id}
                            </td>
                            <td>{review.rating}</td>
                            <td>{review.comment}</td>
                            <td>{review.name}</td>
                            <td>
                              <button onClick={() => confirmDelete(review._id)}>
                                <MdDelete className='icon delete' size={20} />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <Pagination />
                </>
              ) : (
                <h3>Not Found</h3>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
