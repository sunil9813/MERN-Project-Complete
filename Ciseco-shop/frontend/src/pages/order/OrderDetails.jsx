import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Loader } from "../../components/common/Loader"
import { clearError, getOrdersDetails } from "../../redux/actions/orderAction"

export const OrderDetails = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const { loading, error, order = {} } = useSelector((state) => state?.ordersDetails)
  const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order

  console.log(order)

  useEffect(() => {
    dispatch(getOrdersDetails(params.id))

    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [dispatch, error, params.id])

  const shippingDetails = shippingInfo && `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.postalCode}, ${shippingInfo?.country}`
  const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false
  return (
    <>
      <section className='order_details'>
        <div className='container'>
          {loading ? (
            <Loader />
          ) : (
            <div className='content'>
              <h1>Order #{order?._id}</h1>
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
                  <h4 className={isPaid ? "green" : "red"}>{isPaid ? "PAID" : "NOT PAID"} </h4>
                </div>
              </div>
              <div className='box'>
                <h3>Order Status</h3>
                <div className='item'>
                  <h4 className={order?.orderStatus && String(order?.orderStatus).includes("delivered") ? "green" : "red"}>{orderStatus} </h4>
                </div>
              </div>
              <div className='box'>
                <h3>Order items</h3>
                <div className='item'>
                  <div className='history_items'>
                    {orderItems &&
                      orderItems?.map((i) => (
                        <div className='item'>
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
          )}
        </div>
      </section>
    </>
  )
}
