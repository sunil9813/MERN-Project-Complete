import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { CheckOutStep } from "./CheckOutStep"
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect } from "react"
import { MdPayment } from "react-icons/md"
import { TiSortNumericallyOutline } from "react-icons/ti"
import { AiOutlineCheck } from "react-icons/ai"
import { BsCalendarDate } from "react-icons/bs"
import { toast } from "react-toastify"
import axios from "axios"
import { CLEAR_ORDER_ERRORS } from "../../redux/constrants/orderConstrants"
import { createOrder } from "../../redux/actions/orderAction"

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
}
export const Payment = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const stripe = useStripe()
  const elements = useElements()

  const { user } = useSelector((state) => state.auth)
  const { cartItems, shippingInfo } = useSelector((state) => state.cart)
  /* ---for order---- */
  const { error } = useSelector((state) => state.newOrder)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(CLEAR_ORDER_ERRORS())
    }
  }, [dispatch, error])

  const order = {
    orderItems: cartItems,
    shippingInfo,
  }

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice
    order.shippingPrice = orderInfo.shippingPrice
    order.taxPrice = orderInfo.taxPrice
    order.totalPrice = orderInfo.totalPrice
  }
  /* ---end here order---- */
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    document.getElementById("#pay_btn").disabled = true

    let res

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      res = await axios.post("/api/payment/process", paymentData, config)
      const clientSecret = res.data.client_secret
      console.log(clientSecret)

      if (!stripe || !elements) {
        return
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      })
      if (result.error) {
        toast.error(result.error.message)
        document.getElementById("#pay_btn").disabled = false
      } else {
        //The payment is processed or not
        if (result.paymentIntent.status === "succeeded") {
          //Todo => order
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }
          dispatch(createOrder(order))
          // end here

          history.push("/success")
        } else {
          toast.error("There is some issue while payment processing")
        }
      }
    } catch (error) {
      document.getElementById("#pay_btn").disabled = false
      toast.error(error.response.data.message)
      //console.log(error)
    }
  }

  return (
    <>
      <CheckOutStep shipping confirmOrder payment />
      <section className='shipping payment'>
        <form className='container' onSubmit={submitHandler}>
          <h1>Payments & payouts</h1>
          <div className='shipping_content_info_box'>
            <div className='shipping_content_info_box_icon'>
              <MdPayment size={25} />
            </div>
            <div className='shipping_content_info_box_text'>
              <div className='flex'>
                <h4>Card Number</h4>
                <AiOutlineCheck size={20} />
              </div>
              <CardNumberElement type='text' id='stripeInput' options={options} />
            </div>
          </div>
          <div className='shipping_content_info_box'>
            <div className='shipping_content_info_box_icon'>
              <BsCalendarDate size={25} />
            </div>
            <div className='shipping_content_info_box_text'>
              <div className='flex'>
                <h4>Card Expiry</h4>
                <AiOutlineCheck size={20} />
              </div>
              <CardExpiryElement type='text' id='stripeInput' options={options} />
            </div>
          </div>
          <div className='shipping_content_info_box'>
            <div className='shipping_content_info_box_icon'>
              <TiSortNumericallyOutline size={25} />
            </div>
            <div className='shipping_content_info_box_text'>
              <div className='flex'>
                <h4>Card CVC</h4>
                <AiOutlineCheck size={20} />
              </div>
              <CardCvcElement type='text' id='stripeInput' options={options} />
            </div>
          </div>
          <div className='shipping-btn'>
            <button className='button' id='#pay_btn'>
              Pay {` - ${orderInfo && orderInfo.totalPrice}`}
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
