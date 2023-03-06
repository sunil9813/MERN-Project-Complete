import React from "react"
import { FaMinus, FaPlus } from "react-icons/fa"
import { VscVerified } from "react-icons/vsc"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { addItemToCart, removeItemFormCart } from "../../redux/actions/cartAction"
import noProduct from "../../components/assets/images/cart.gif"

export const CartPage = (props) => {
  // yo sbai class chai shipping  component grada use hunxa kina bhane teyoo component ma ni CartPage use bhanko hunxa
  const { class1, class2, grid3 } = props
  /*-------end-------- */

  const dispatch = useDispatch()
  const history = useHistory()

  const { cartItems } = useSelector((state) => state.cart)

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1
    if (newQty > stock) return

    dispatch(addItemToCart(id, newQty))
  }

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1
    if (newQty <= 0) return

    dispatch(addItemToCart(id, newQty))
  }

  const removeCartItems = (id) => {
    dispatch(removeItemFormCart(id))
  }

  const total = cartItems.reduce((acc, product) => acc + product.quantity * product.price, 0)

  function newTotal(total) {
    const tax = 0.13
    return total * tax
  }
  const afterTax = newTotal(total)
  const totalAmount = total + afterTax + 5

  return (
    <>
      <section className='carts'>
        <div className='container'>
          {cartItems.length === 0 ? (
            <div className='noproduct'>
              <h2>No products in the cart.</h2>
              <img src={noProduct} alt='' />
            </div>
          ) : (
            <>
              <div className='content'>
                {props.show ? <h3 className='st3'>Order summary</h3> : <h1>Shopping Cart</h1>}
                <div className={`dropdown-menus ${class1}`}>
                  <div className={`header_container_right_cart_items ${class2}`}>
                    {cartItems.map((product, i) => (
                      <div className={`header_container_right_cart_items_items grid4 ${grid3}`} key={i}>
                        <div className='header_container_right_cart_items_item_img size-150'>
                          <img src={product.image} alt='img' className='size-150' />
                        </div>
                        <div className='header_container_right_cart_items_item_details'>
                          <Link to={`/details/${product.product}`}>
                            <h4>{product.name.slice(0, 30)}...</h4>
                          </Link>
                          <button className='stockIn'>
                            {product.stock > 0 ? <VscVerified size={16} className={product.stock > 0 ? "greenColor" : "redColor"} /> : <AiOutlineCloseCircle size={16} className={product.stock > 0 ? "greenColor" : "redColor"} />}
                            <label className={product.stock > 0 ? "greenColor" : "redColor"}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</label>
                          </button>
                        </div>
                        {!props.show && (
                          <div className='flex-between product_card_details_add'>
                            <div className='product_card_details_add_text flex-center '>
                              <button className='size-40' onClick={() => decreaseQty(product.product, product.quantity)}>
                                <FaMinus className='cbtn' />
                              </button>
                              <input type='number' className='size-30 count' value={product.quantity} readOnly />
                              <button className='size-40' onClick={() => increaseQty(product.product, product.quantity, product.stock)}>
                                <FaPlus className='cbtn' />
                              </button>
                            </div>
                          </div>
                        )}
                        <div className='header_container_right_cart_items_item_price'>
                          <div className='priceBox'>
                            <span>${product.price}.00</span>
                          </div>
                          <button onClick={() => removeCartItems(product.product)}>
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`header_container_right_cart_total ${class2}`}>
                    {!props.show && (
                      <>
                        <h2>Order Summary</h2>
                        <div className='flex-between flex-center text'>
                          <h3>Subtotal Items </h3>
                          <h4>{cartItems.reduce((acc, product) => acc + Number(product.quantity), 0)}(Units)</h4>
                        </div>
                      </>
                    )}
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
                      <h4>${afterTax.toFixed(2)}</h4>
                    </div>
                    <div className='flex-between flex-center text'>
                      <h3 className='text1'>Gross Amount (including tax) </h3>
                      <h4>${totalAmount}</h4>
                    </div>
                    {!props.show && (
                      <Link to='/shipping'>
                        <button className='button'>Confirm Order</button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
