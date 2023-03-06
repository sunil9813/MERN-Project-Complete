import React from "react"
import { AiFillIdcard, AiTwotoneHome } from "react-icons/ai"
import { BsFillCheckCircleFill } from "react-icons/bs"
import { FaUserCircle } from "react-icons/fa"
import { useSelector } from "react-redux"
import Pdf from "react-to-pdf"

const ref = React.createRef()

export const Success = () => {
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

  return (
    <>
      <section className='success'>
        <div className='container' ref={ref} id='printdoc'>
          <div className='success_top'>
            <BsFillCheckCircleFill size={40} className='icon' />
            <h2>Thank you for your order! </h2>
            <p>The order confirmation email with details of your order and a link to track its progress has been sent to your email address.</p>
            <label>YORU ORDER # IS : 012455224 - Pending</label> <br />
            <span>Order Date : 2023/02/1</span>
          </div>
          <div className='content flex-between'>
            <div className='success_left'>
              <div className='success_left_box'>
                <h3 className='flex-center'>
                  <FaUserCircle size={22} className='icons' />
                  your information
                </h3>
                <div className='success_left_box_details'>
                  <div className='items'>
                    <h4>Name : </h4>
                    <label>{user.name}</label>
                  </div>
                  <div className='items'>
                    <h4>Email : </h4>
                    <label>{user.email}</label>
                  </div>
                  <div className='items'>
                    <h4>Phone : </h4>
                    <label>+977 9813253082</label>
                  </div>
                </div>
              </div>

              <div className='success_left_box'>
                <h3 className='flex-center'>
                  <AiFillIdcard size={22} className='icons' />
                  payment information
                </h3>
                <div className='success_left_box_details'>
                  <div className='items'>
                    <h4>Card No : </h4>
                    <label>4242 4242 4242 4242</label>
                  </div>
                  <div className='items'>
                    <h4>Expired Data : </h4>
                    <label>02 / 31</label>
                  </div>
                </div>
              </div>

              <div className='success_left_box'>
                <h3 className='flex-center'>
                  <AiTwotoneHome size={22} className='icons' />
                  shipping address
                </h3>
                <div className='success_left_box_details'>
                  <div className='items'>
                    <h4>Address : </h4>
                    <label style={{ textTransform: "capitalize" }}>
                      {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.country}, {shippingInfo.postalCode}
                    </label>
                  </div>
                  <div className='items'>
                    <h4>Phone : </h4>
                    <label>{shippingInfo.phoneNo}</label>
                  </div>
                </div>
              </div>

              <div className='success_left_box'>
                <h3 className='flex-center'>
                  <AiTwotoneHome size={22} className='icons' />
                  billing address
                </h3>
                <div className='success_left_box_details'>
                  <div className='items'>
                    <h4>Address : </h4>
                    <label style={{ textTransform: "capitalize" }}>
                      {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.country}, {shippingInfo.postalCode}
                    </label>
                  </div>
                  <div className='items'>
                    <h4>Phone : </h4>
                    <label>{shippingInfo.phoneNo}</label>
                  </div>
                </div>
              </div>
            </div>

            <div className='success_right'>
              <div className='success_right_box'>
                <h3>Order Summary</h3>
              </div>
              <div className='success_right_items'>
                {cartItems.map((product, i) => (
                  <div className='success_right_items_item flex-center' key={i}>
                    <div className='success_right_items_item_img'>
                      <img src={product.image} alt={product.image} />
                    </div>
                    <div style={{ width: "50%" }}>
                      <h4>{product.name.slice(0, 100)}</h4>
                    </div>
                    <div style={{ width: "25%" }}>
                      <h4>
                        {product.quantity} x {product.price} = <label>${product.quantity * product.price}</label>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
              <div className='success_right_total'>
                <div className='success_right_total_item flex-center'>
                  <h4>Sub Total : </h4>
                  <h2>${total}</h2>
                </div>
                <div className='success_right_total_item flex-center'>
                  <h4>Tax Price : </h4>
                  <h2>${taxPrice.toFixed(2)}</h2>
                </div>
                <div className='success_right_total_item flex-center'>
                  <h4>Shipping : </h4>
                  <h2>${shippingPrice}</h2>
                </div>
                <div className='success_right_total_item flex-center'>
                  <h4>Total Amount : </h4>
                  <h2>${totalPrice}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container btn'>
          <Pdf targetRef={ref} filename='ciseco-shop.pdf' orientation='portrait'>
            {({ toPdf }) => (
              <button className='button' onClick={toPdf}>
                Download
              </button>
            )}
          </Pdf>
        </div>
      </section>
    </>
  )
}
