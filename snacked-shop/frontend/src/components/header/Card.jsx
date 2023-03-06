import React, { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { HiOutlineShoppingBag } from "react-icons/hi"
import { carts } from "../assets/data/data"

export const Card = () => {
  const [open, setOpen] = useState(false)
  let menuRef = useRef()

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false)
        console.log(menuRef.current)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })
  return (
    <>
      <div className='header_container_right_cart' ref={menuRef}>
        <div onClick={() => setOpen(!open)}>
          <div className='icon size-45'>
            <HiOutlineShoppingBag size={25} />
          </div>
          <button className='baget size-17'>
            <span>3</span>
          </button>
        </div>

        {setOpen && (
          <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
            <h3>Shopping Cart</h3>
            <div className='header_container_right_cart_items'>
              {carts.map((product) => (
                <div className='header_container_right_cart_items_item'>
                  <div className='header_container_right_cart_items_item_img size-100'>
                    <img src={product.img} alt='img' className='size-100' />
                  </div>
                  <div className='header_container_right_cart_items_item_details'>
                    <h4>{product.name}</h4>
                    <p>
                      <label>Natural</label> | <label>{product.size}</label>
                    </p>
                    <h5>Qty {product.Qty}</h5>
                  </div>
                  <div className='header_container_right_cart_items_item_price'>
                    <div className='priceBox'>
                      <span>${product.price}.00</span>
                    </div>
                    <button>
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className='header_container_right_cart_total'>
              <div className='flex-between'>
                <h4>Subtotal</h4>
                <h4>$299.00</h4>
              </div>
              <p>Shipping and taxes calculated at checkout</p>
              <div className='flex-between'>
                <button className='button-outline '>View Cart</button>
                <button className='button'>Check Out</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
