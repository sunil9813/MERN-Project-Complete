import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { clearError, getOrdersDetails, updateOrder } from "../../redux/actions/orderAction"
import { UPDATE_ORDER_RESET } from "../../redux/constrants/orderConstrants"
import { Sidebar } from "./Sidebar"
import { Loader } from "../common/Loader"

export const UpdateOrders = () => {
  const [status, setStatus] = useState("")

  const history = useHistory()
  const params = useParams()
  const dispatch = useDispatch()

  const { loading, order = {} } = useSelector((state) => state?.ordersDetails)
  const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
  const { error, isUpdated } = useSelector((state) => state.order)

  const orderId = params.id

  useEffect(() => {
    dispatch(getOrdersDetails(orderId))

    if (error) {
      toast.error(error)
      dispatch(clearError())
    }

    if (isUpdated) {
      toast.success("Order Updated successfully")
      dispatch({ type: UPDATE_ORDER_RESET })
      history.push("/admin/order")
    }
  }, [dispatch, error, orderId, isUpdated])

  const updateOrderHandler = (id) => {
    const formData = new FormData()
    formData.set("status", status)

    dispatch(updateOrder(id, formData))
  }
  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city},
     ${shippingInfo.postalCode} , ${shippingInfo.country}`

  const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false

  return (
    <>
      <main className='main'>
        <Sidebar />
        <section className='orderList admin'>
          {loading ? (
            <Loader />
          ) : (
            <div className='order_details update_order flex-between'>
              <div className='content'>
                <h2>Update Orders #${order?._id}</h2>
                <div className='box'>
                  <h3>Shipping Information</h3>
                  <div className='item'>
                    <h4>
                      Name : <label>{user && user?.name}</label>
                    </h4>
                    <h4>
                      Phone Number : <label>{shippingInfo && shippingInfo?.phoneNo}</label>
                    </h4>
                    <h4>
                      Address : <label>{shippingDetails}</label>
                    </h4>
                    <h4>
                      Amount : <label>${totalPrice}</label>
                    </h4>
                  </div>
                </div>
                <div className='box'>
                  <h3>Payment</h3>
                  <div className='item'>
                    <span className={isPaid ? "green" : "red"}>{isPaid ? "PAID" : "NOT PAID"} </span>
                  </div>
                </div>
                <div className='box'>
                  <h3>Stripe ID</h3>
                  <div className='item'>
                    <h4>{paymentInfo && paymentInfo.id}</h4>
                  </div>
                </div>
                <div className='box'>
                  <h3>Order Status</h3>
                  <div className='item'>
                    <span className={order?.orderStatus && String(order?.orderStatus).includes("delivered") ? "green" : "red"}>{orderStatus} </span>
                  </div>
                </div>
                <div className='box'>
                  <h3>Order items</h3>
                  <div className='item'>
                    <div className='history_items'>
                      {orderItems &&
                        orderItems?.map((i, ids) => (
                          <div className='item' key={ids}>
                            <div className='img size-150' style={{ width: "15%" }}>
                              <img src={i?.image} alt='' />
                            </div>
                            <div className='name' style={{ width: "65%" }}>
                              <p>{i?.name}</p>
                              <h4>Quantity : {i?.quantity}</h4>
                            </div>
                            <div className='review' style={{ width: "20%" }}>
                              <button className='priceBox'>${i?.price.toFixed(2)}</button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className='status'>
                <h2>Status</h2>
                <select name='status' value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value='Processing'>Processing</option>
                  <option value='Shipped'>Shipped</option>
                  <option value='Delivered'>Delivered</option>
                </select>
                <button className='button' onClick={() => updateOrderHandler(order._id)}>
                  Updated Status
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
