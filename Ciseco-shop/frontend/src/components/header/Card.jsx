import React, { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { HiOutlineShoppingBag } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { carts } from "../assets/data/data"
import noProduct from "../../components/assets/images/cart1.gif"
import { removeItemFormCart } from "../../redux/actions/cartAction"

export const Card = () => {
  const [open, setOpen] = useState(false)
  let menuRef = useRef()

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false)
        // console.log(menuRef.current)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })
  const close = () => {
    setOpen(false)
  }

  //cart Item
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)

  // remove cart
  const removeCartItems = (id) => {
    dispatch(removeItemFormCart(id))
  }

  // do at shipping time
  const history = useHistory()
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping")
  }
  // yadi user login xaina bhane check out button ma click garna kojako xa bane
  // login page ma send garxa first ma login page ma send garxa and after login redirect garxa to check out page ma
  return (
    <>
      <div className='header_container_right_cart' ref={menuRef}>
        <div onClick={() => setOpen(!open)}>
          <div className='icon size-45'>
            <HiOutlineShoppingBag size={25} />
          </div>
          <button className='baget size-17'>
            <span>{cartItems.length}</span>
          </button>
        </div>

        {setOpen && (
          <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
            {cartItems.length === 0 ? (
              <div className='noproduct'>
                <img src={noProduct} alt='' />
              </div>
            ) : (
              <div>
                <h3>Shopping Cart</h3>
                <div className='header_container_right_cart_items'>
                  {cartItems.map((product, i) => (
                    <div className='header_container_right_cart_items_item' key={i}>
                      <div className='header_container_right_cart_items_item_img size-100'>
                        <img src={product.image} alt='img' className='size-100' />
                      </div>
                      <div className='header_container_right_cart_items_item_details' style={{ padding: "10px 20px" }}>
                        <Link to={`/details/${product.product}`}>
                          <h4>{product.name.slice(0, 25)}...</h4>
                        </Link>
                        <h5>Quantity : {product.quantity}</h5>
                      </div>
                      <div className='header_container_right_cart_items_item_price'>
                        <div className='priceBox'>
                          <span>${product.price.toFixed(2)}</span>
                        </div>
                        <button onClick={() => removeCartItems(product.product)}>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='header_container_right_cart_total'>
                  <div className='flex-between'>
                    <h4>Subtotal</h4>
                    <h4>${cartItems.reduce((acc, product) => acc + product.quantity * product.price, 0).toFixed(2)}</h4>
                  </div>
                  <p>Shipping and taxes calculated at checkout</p>
                  <div className='flex-between'>
                    <Link to='/cart'>
                      <button className='button-outline' onClick={close}>
                        View Cart
                      </button>
                    </Link>
                    <button className='button' onClick={checkoutHandler}>
                      Check Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
