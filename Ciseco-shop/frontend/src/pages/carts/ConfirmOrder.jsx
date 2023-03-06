import React from "react"
import { BiMapPin, BiUserCircle } from "react-icons/bi"
import { BsCheck2, BsTelephone } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { CheckOutStep } from "./CheckOutStep"

export const ConfirmOrder = () => {
  const history = useHistory()

  const { cartItems, shippingInfo } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)

  const total = cartItems.reduce((acc, product) => acc + product.quantity * product.price, 0)

  function newTotal(total) {
    const tax = 0.13
    return total * tax
  }
  const taxPrice = newTotal(total)
  const totalPrice = total + taxPrice + 5
  const shippingPrice = 5

  const proccessToPayment = (e) => {
    const data = {
      itemsPrice: total.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    }
    sessionStorage.setItem("orderInfo", JSON.stringify(data))
    history.push("/payment")
  }
  return (
    <>
      <CheckOutStep shipping confirmOrder />
      <section className='shipping confirmOrder'>
        <div className='container'>
          <div className='shipping_content flex-between'>
            <div className='shipping_content_info left'>
              <h2>Shipping Info</h2>
              <div className='shipping_content_info_box'>
                <div className='shipping_content_info_box_icon'>
                  <BiUserCircle size={25} />
                </div>
                <div className='shipping_content_info_box_text'>
                  <div className='flex'>
                    <h4>Name</h4>
                    <BsCheck2 size={20} />
                  </div>
                  <span>{user && user.name}</span>
                </div>
              </div>
              <div className='shipping_content_info_box'>
                <div className='shipping_content_info_box_icon'>
                  <BsTelephone size={25} />
                </div>
                <div className='shipping_content_info_box_text'>
                  <div className='flex'>
                    <h4>Phone Number</h4>
                    <BsCheck2 size={20} />
                  </div>
                  <span>{shippingInfo.phoneNo}</span>
                </div>
              </div>
              <div className='shipping_content_info_box'>
                <div className='shipping_content_info_box_icon'>
                  <BiMapPin size={25} />
                </div>
                <div className='shipping_content_info_box_text'>
                  <div className='flex'>
                    <h4>Address</h4>
                    <BsCheck2 size={20} />
                  </div>
                  <span>{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</span>
                </div>
              </div>

              <div className='cart'>
                <h2 className='ctext'>Your Cart Items</h2>
                {cartItems.map((item) => (
                  <div className='shipping_content_info_box' key={item.product}>
                    <div className='shipping_content_info_box_icon'>
                      <div className='size-100'>
                        <img src={item.image} alt={item.image} className='size-100' />
                      </div>
                    </div>
                    <Link to={`/product/${item.product}`}>
                      <h5>{item.name}</h5>
                    </Link>
                    <div className='flex'>
                      <label>
                        {item.quantity} x ${item.price} =
                      </label>
                      <span>${item.quantity * item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='shipping_content_item right'>
              <h2>Order Summary</h2>
              <div className='flex-between flex-center text'>
                <h3>Subtotal Items </h3>
                <h4>{cartItems.reduce((acc, product) => acc + Number(product.quantity), 0)}(Units)</h4>
              </div>
              <div className='flex-between flex-center text'>
                <h3>Subtotal </h3>
                <h4>${cartItems.reduce((acc, product) => acc + product.quantity * product.price, 0).toFixed(2)}</h4>
              </div>
              <div className='flex-between flex-center text'>
                <h3>Shpping estimate </h3>
                <h4>$5.00</h4>
              </div>
              <div className='flex-between flex-center text'>
                <h3>Tax estimate </h3>
                <h4>${taxPrice.toFixed(2)}</h4>
              </div>
              <div className='flex-between flex-center text'>
                <h3 className='text1'>Gross Amount (including tax) </h3>
                <h4>${totalPrice}</h4>
              </div>
              <div className='shipping-btns'>
                <button className='button' onClick={proccessToPayment}>
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
