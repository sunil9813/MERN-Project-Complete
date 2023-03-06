import React from "react"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { BsCheck2 } from "react-icons/bs"
import { Link } from "react-router-dom"

export const CheckOutStep = ({ shipping, confirmOrder, payment }) => {
  return (
    <>
      <section className='checkout-progress'>
        {shipping ? (
          <Link to='shipping' className='flex'>
            <div className='box'>
              <div className='step active-step'>
                <BsCheck2 size={30} />
              </div>
              <div className='step active-step-text'>Shipping</div>
            </div>
            <div className='line-active'></div>
          </Link>
        ) : (
          <Link to='#!' disabled className='noactive'>
            <div className='box'>
              <div className='step incomplete'>1</div>
              <div className='text'>Shipping</div>
            </div>
            <div className='line-incomplete'></div>
          </Link>
        )}

        {confirmOrder ? (
          <Link to='/order/confirm' className='flex'>
            <div className='box'>
              <div className='step active-step'>
                <BsCheck2 size={30} />
              </div>
              <div className='step active-step-text'>Confirm Order</div>
            </div>
            <div className='line-active'></div>
          </Link>
        ) : (
          <Link to='#!' disabled className='noactive'>
            <div className='box'>
              <div className='step incomplete'>2</div>
              <div className='text'>Confirm Order</div>
            </div>
            <div className='line-incomplete'></div>
          </Link>
        )}

        {payment ? (
          <Link to='/payment' className='flex'>
            <div className='box'>
              <div className='step active-step'>
                <BsCheck2 size={30} />
              </div>
              <div className='step active-step-text'>Payment</div>
            </div>
            <div className='line-active line3'></div>
          </Link>
        ) : (
          <Link to='#!' disabled className='noactive'>
            <div className='box'>
              <div className='step incomplete'>3</div>
              <div className='text'>Payment</div>
            </div>
            <div className='line-incomplete line3'></div>
          </Link>
        )}
      </section>
    </>
  )
}
