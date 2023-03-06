import React, { useEffect, useState } from "react"
import { AiFillStar, AiOutlineClose, AiOutlineHeart } from "react-icons/ai"
import { FaMinus, FaPlus } from "react-icons/fa"
import { HiShoppingBag } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { clearError, getSingleProducts, newReview } from "../../redux/actions/productAction"
import { Loader } from "../../components/common/Loader"
import { addItemToCart } from "../../redux/actions/cartAction"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import { NEW_REVIEW_RESET } from "../../redux/constrants/productConstrants"

export const ProductPage = () => {
  // for product
  const [quantity, setQuantity] = useState(1)

  const [modelOpen, setModelOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const dispatch = useDispatch()
  const params = useParams()

  const { loading, error, product } = useSelector((state) => state.productDetails)

  // for review
  const { user } = useSelector((state) => state.auth)

  const { error: reviewError, success } = useSelector((state) => state.newReview)

  useEffect(() => {
    dispatch(getSingleProducts(params.id))

    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
    if (reviewError) {
      toast.error(reviewError)
      dispatch(clearError())
      console.log(reviewError)
    }

    if (success) {
      toast.success("Reivew posted successfully")
      dispatch({ type: NEW_REVIEW_RESET })
    }
  }, [dispatch, error, params.id, reviewError, success])

  const increaseQty = () => {
    const count = document.querySelector(".count")
    if (count.valueAsNumber >= product.stock) return

    const qty = count.valueAsNumber + 1
    setQuantity(qty)
  }
  const decreaseQty = () => {
    const count = document.querySelector(".count")
    if (count.valueAsNumber <= 1) return

    const qty = count.valueAsNumber - 1
    setQuantity(qty)
  }

  const addToCart = () => {
    dispatch(addItemToCart(params.id, quantity))
    toast.success("Item Added to Cart")
  }

  // popup model
  function clickHandle() {
    return setModelOpen(!modelOpen)
  }
  if (modelOpen) {
    document.body.classList.add("active-modal")
  } else {
    document.body.classList.remove("active-modal")
  }

  // for review
  function setUserRating() {
    const stars = document.querySelectorAll(".star")

    stars.forEach((star, index) => {
      star.starValue = index + 1
      ;["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings)
      })
    })
    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange")

            setRating(this.starValue)
          } else {
            star.classList.remove("orange")
          }
        }
        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow")
          } else {
            star.classList.remove("yellow")
          }
        }
        if (e.type === "mouseout") {
          star.classList.remove("yellow")
        }
      })
    }
  }

  const reviewHandle = () => {
    const formData = new FormData()

    formData.set("rating", rating)
    formData.set("comment", comment)
    formData.set("productId", params.id)

    dispatch(newReview(formData))
  }

  const close = () => {
    setModelOpen(null)
    reviewHandle()
  }
  const handleClick = () => {
    setUserRating()
    clickHandle()
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className='productPage'>
            <div className='container'>
              <div className='model'>
                <div className='product_card flex-between' key={product.id}>
                  <div className='product_card_img'>
                    {product.images &&
                      product.images.map((i) => (
                        <div className='product_card_img_box' key={i.public_id}>
                          <img src={i.url} alt={product.title} />
                        </div>
                      ))}
                    <button className='size-40 heart'>
                      <AiOutlineHeart className='icons' size={25} />
                    </button>
                  </div>

                  <div className='product_card_details'>
                    <h3>{product?.name}</h3>
                    <div className='product_card_details_price flex'>
                      <div className='priceBox'>${product.price}</div>
                      <div className='product_card_details_price_rate flex-center'>
                        <div className='rating-outer'>
                          <div className='rating-inner' style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <div className='text'>({product.numOfReviews} Reviews)</div>
                      </div>
                    </div>
                    <p className='pstatus'>
                      Status : <label className={product.stock > 0 ? "greenColor" : "redColor"}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</label>
                    </p>

                    <div className='product_card_details_add flex-between'>
                      <div className='product_card_details_add_text flex-center'>
                        <button className='size-40' onClick={decreaseQty}>
                          <FaMinus className='cbtn' />
                        </button>
                        <input type='number' className='size-30 count' value={quantity} readOnly />
                        <button className='size-40' onClick={increaseQty}>
                          <FaPlus className='cbtn' />
                        </button>
                      </div>
                      <div className='product_card_details_add_cart_btn'>
                        <button className='button-icon' onClick={addToCart} disabled={product.stock === 0}>
                          <HiShoppingBag className='bicon' />
                          add to bag
                        </button>
                      </div>
                    </div>

                    <h3 className='btn-desc'>Description</h3>
                    <p className='des-p'>{product.description}</p>
                    <div className='des-h5'>
                      <h5>
                        Seller By : <label>{product.seller}</label>
                      </h5>
                      <h5>
                        Product ID : <label>{product._id}</label>
                      </h5>
                      <h5>
                        Product SKU : <label>{product.sku}</label>
                      </h5>
                    </div>

                    <div className='review'>
                      {user ? (
                        <button className='button' onClick={handleClick}>
                          Submit Your Review
                        </button>
                      ) : (
                        <div className='alert-danger' type='alert'>
                          Login to post your review.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='product_card_reviews'>
                  <div className='title flex'>
                    <AiFillStar size={30} />
                    <h1> {product?.reviews?.length} Reviews</h1>
                  </div>
                  <div className='boxs grid2'>
                    {product?.reviews &&
                      product?.reviews.length > 0 &&
                      product?.reviews.map((rev, i) => (
                        <div className='box' key={rev._id}>
                          <div className='product_card_reviews_name'>
                            <div className='product_card_reviews_name'>
                              <div className='text size-50'>
                                <h3>{rev.name.slice(0, 1)}</h3>
                              </div>
                              <div className='product_card_reviews_name_text'>
                                <h4>{rev.name}</h4>
                                <div className='ratings flex-center'>
                                  <div className='rating-outer'>
                                    <div className='rating-inner' style={{ width: `${(rev.rating / 5) * 100}%` }}></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p>{rev.comment}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={modelOpen ? "back_overlay" : "none"}>
            <div className={modelOpen ? "modelReview" : "none"}>
              <div className='head flex-between'>
                <h3>Submit Review</h3>
                <button onClick={() => setModelOpen(null)}>
                  <AiOutlineClose className='icon' size={25} />
                </button>
              </div>

              <ul className='starss'>
                <li className='star'>
                  <AiFillStar size={50} />
                </li>
                <li className='star'>
                  <AiFillStar size={50} />
                </li>
                <li className='star'>
                  <AiFillStar size={50} />
                </li>
                <li className='star'>
                  <AiFillStar size={50} />
                </li>
                <li className='star'>
                  <AiFillStar size={50} />
                </li>
              </ul>

              <div className='textarea'>
                <textarea name='review' id='review' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
              </div>
              <button type='submit' className='priceBox' onClick={close}>
                Submit
              </button>
            </div>
          </section>
        </>
      )}
    </>
  )
}
