import React, { useEffect } from "react"
import { AiFillEdit, AiFillEye } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { SearchBox } from "../../pages/common/SearchBox"
import { deleteOrder, getAllOrders } from "../../redux/actions/orderAction"
import { clearError } from "../../redux/actions/productAction"
import { DELETE_ORDER_RESET } from "../../redux/constrants/orderConstrants"
import { Loader } from "../common/Loader"
import { Pagination } from "../common/Pagination"
import { Sidebar } from "./Sidebar"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"

export const AllOrderList = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { loading, error, orders } = useSelector((state) => state.allOrder)
  const { isDeleted } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(getAllOrders())

    if (error) {
      toast.error(error)
      dispatch(clearError())
    }

    if (isDeleted) {
      toast.success("Order delete successfully")
      history.push("/admin/order")
      dispatch({ type: DELETE_ORDER_RESET })
    }
  }, [dispatch, error, isDeleted, history])

  const deleteProductHandler = (id) => {
    dispatch(deleteOrder(id))
  }

  // delete popup
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Order",
      message: "Are you sure you want to delete this order.",
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
  return (
    <>
      <main className='main'>
        <Sidebar />
        <section className='orderList admin'>
          <h1>All Orders</h1>
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
                        <th>ID</th>
                        <th>No of Items</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{order._id}</td>
                          <td>{order.orderItems.length}</td>
                          <td>${order.totalPrice}</td>
                          <td>{order.orderStatus && String(order.orderStatus).includes("Delivered") ? <label className='green'>{order.orderStatus}</label> : <label className='red'>{order.orderStatus}</label>}</td>
                          <td>
                            <Link to={`/order/${order._id}`} className='view'>
                              <AiFillEye className='icon' size={20} />
                            </Link>
                            <button onClick={() => confirmDelete(order._id)}>
                              <MdDelete className='icon delete' size={20} />
                            </button>
                            <Link to={`/admin/order/${order?._id}`} className='view'>
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
