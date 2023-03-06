import React, { useEffect, useState } from "react"
import { newProduct } from "../../components/assets/data/data"
import { useParams } from "react-router-dom"
import { AiFillStar, AiOutlineHeart, AiTwotoneStar } from "react-icons/ai"
import { FaMinus, FaPlus } from "react-icons/fa"
import { HiShoppingBag } from "react-icons/hi"
import { Colors } from "../../components/common/ProductCard"
import { Link } from "react-router-dom"
import { MdOutlineStarRate } from "react-icons/md"

export const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    let blogs = newProduct.find((blogs) => blogs.id === parseInt(id))
    if (blogs) {
      setProduct(blogs)
    }
  }, [id])

  return (
    <>
      {product ? (
        <section className='productPage'>
          <div className='container'>
            <div className='model'>
              <div className='product_card flex-between' key={product.id}>
                <div className='product_card_img'>
                  {product.images.map((i) => (
                    <div className='product_card_img_box'>
                      <Link to={`/details/${product.id}`} className='link'>
                        <img src={i} alt='' />
                      </Link>
                    </div>
                  ))}
                  <button className='size-40 heart'>
                    <AiOutlineHeart className='icons' size={25} />
                  </button>
                </div>
                <div className='product_card_details'>
                  <h3>{product.title}</h3>

                  <span>{product.subtitle}</span>
                  <div className='product_card_details_price flex'>
                    <div className='priceBox'>$30.00</div>
                    <div className='product_card_details_price_rate flex-center'>
                      <AiTwotoneStar size={22} className='picon' />
                      <label>
                        4.9 <a href='/'>43 reviews</a>
                      </label>
                    </div>
                  </div>
                  <h4>
                    Color : <label>Black</label>
                  </h4>
                  <div className='product_card_details_colors flex'>
                    {product.colors.map((c) => (
                      <Colors col={c.color} />
                    ))}
                  </div>
                  <h4>
                    Color : <label>XS</label>
                  </h4>
                  <div className='product_card_details_size flex'>
                    {product.sizes.map((s) => (
                      <button>{s.size}</button>
                    ))}
                  </div>
                  <div className='product_card_details_add flex-between'>
                    <div className='product_card_details_add_text flex-center'>
                      <button className='size-40'>
                        <FaMinus className='cbtn' />
                      </button>
                      <span className='size-40'>1</span>
                      <button className='size-40'>
                        <FaPlus className='cbtn' />
                      </button>
                    </div>
                    <div className='product_card_details_add_cart_btn'>
                      <button className='button-icon'>
                        <HiShoppingBag className='bicon' />
                        add to bag
                      </button>
                    </div>
                  </div>
                  <button className='btn-desc'>Description</button>
                  <p>{product.desc}</p>
                  <button className='btn-desc'>Features</button>
                  <ul>
                    {product.fetaures.map((f) => (
                      <li>{f.text}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className='product_card_desc'>
                <h3>Product Details</h3>
                {product.details.map((d) => (
                  <>
                    <p>{d.para}</p>
                  </>
                ))}
                <ul>
                  {product.detail.map((p) => (
                    <li>{p.text}</li>
                  ))}
                </ul>
              </div>
              <div className='product_card_reviews'>
                <h2>
                  <MdOutlineStarRate size={25} /> 478 Reviews
                </h2>
                <div className='boxs grid2'>
                  {product.reviews.map((rev) => (
                    <>
                      <div className='box'>
                        <div className='product_card_reviews_imgs'>
                          {rev.users.map((n) => (
                            <>
                              <div className='product_card_reviews_imgs_name flex w-50'>
                                <div className='product_card_reviews_imgs_name_img size-50'>
                                  <img src={n.image} alt='' />
                                </div>
                                <div className='product_card_reviews_imgs_name_img_text'>
                                  <h4>{n.name}</h4>
                                  <span>{n.data}</span>
                                </div>
                              </div>
                              <div className='product_card_reviews_imgs_rate w-50'>
                                <AiFillStar size={22} />
                                <AiFillStar size={22} />
                                <AiFillStar size={22} />
                                <AiFillStar size={22} />
                                <AiFillStar size={22} />
                              </div>
                            </>
                          ))}
                        </div>
                        <p>{rev.desc}</p>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
