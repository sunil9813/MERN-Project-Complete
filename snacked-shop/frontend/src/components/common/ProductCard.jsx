import React, { useState } from "react"
import { AiOutlineClose, AiOutlineHeart, AiTwotoneStar } from "react-icons/ai"
import { FaMinus, FaPlus } from "react-icons/fa"
import { HiShoppingBag } from "react-icons/hi"
import { MdOutlineZoomOutMap } from "react-icons/md"
import { CiDiscount1 } from "react-icons/ci"
import { newProduct } from "../assets/data/data"
import { Link } from "react-router-dom"

export const Colors = ({ col }) => {
  return (
    <div className='colors' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <button style={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: 10, width: "25px", height: "25px", borderRadius: "50%", border: `1px solid ${col}` }}>
        <button style={{ background: `${col}`, width: "20px", height: "20px", borderRadius: "50%" }}></button>
      </button>
    </div>
  )
}

export const ProductCard = () => {
  const [model, setModel] = useState(false)
  const [popContent, setPopContent] = useState([])

  const changeContent = (product) => {
    setPopContent([product])
    setModel(true)
  }
  const close = () => {
    setModel(null)
  }
  if (model) {
    document.body.classList.add("active-modal")
  } else {
    document.body.classList.remove("active-modal")
  }
  return (
    <>
      <div className='product grid4'>
        {newProduct.map((product) => {
          return (
            <div className='product_card' key={product.id}>
              <div className='product_card_img'>
                <Link to={`/details/${product.id}`} className='link'>
                  <img src={product.images[0]} alt='' />
                </Link>
                <button className='size-40 heart'>
                  <AiOutlineHeart className='icons' size={25} />
                </button>
                {product.discount && (
                  <div className='discount'>
                    <CiDiscount1 size={18} />
                    <span>{product.discount} % Discount</span>
                  </div>
                )}
                <div className='product_card_img_overlay flex-between'>
                  <button className='button-icon'>
                    <HiShoppingBag className='bicon' />
                    add to bag
                  </button>
                  <button className='button-icon' onClick={() => changeContent(product)}>
                    <MdOutlineZoomOutMap className='bicon' />
                    quick view
                  </button>
                </div>
              </div>
              <div className='product_card_details'>
                <div className='product_card_details_colors flex'>
                  {product.colors.map((c) => (
                    <Colors col={c.color} />
                  ))}
                </div>
                <h3>{product.title}</h3>
                <span>{product.subtitle}</span>
                <div className='product_card_details_price flex-between'>
                  <div className='priceBox'>${product.price}.00</div>
                  <div className='product_card_details_price_rate flex-center'>
                    <AiTwotoneStar size={22} className='picon' /> <label>4.9 (43 reviews)</label>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {model && (
        <>
          <div className={model ? "back-overlay" : null}></div>
          <div className='model'>
            <button className='close' onClick={close}>
              <AiOutlineClose size={25} />
            </button>
            {popContent.map((product) => (
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
            ))}
          </div>
        </>
      )}
    </>
  )
}
