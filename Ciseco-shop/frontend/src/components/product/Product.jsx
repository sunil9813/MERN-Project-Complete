import React from "react"
import { ProductCard } from "../common/ProductCard"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getProducts } from "../../redux/actions/productAction"
import Pagination from "react-js-pagination"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { toast } from "react-toastify"

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

export const Product = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([1, 1000])
  const [category, setCategory] = useState("")
  const [rating, setRating] = useState(0)

  const categories = ["Electronics", "Laptop", "Smartphones", "Sports", "Television", "video devices", "Food", "Gaming", "Books", "Shoes", "Beautys/Health", "Accessories", "Outdoor", "Home", "Grocery", "Toys", "Furniture", "Kitchen", "Plant", "Cloth"]

  //fetch product
  const { products, error, productsCount, perPage, filteredProductsCount } = useSelector((state) => state.products)

  //for search
  const keyword = params.keyword

  useEffect(() => {
    if (error) {
      return toast.error(error)
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating))
  }, [dispatch, error, keyword, currentPage, price, category, rating])

  // pagination
  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber)
  }

  // if product is less than perpage dont show pagination
  let count = productsCount
  if (keyword) {
    count = filteredProductsCount
  }

  return (
    <>
      <div className='new_arrivals'>
        <div className='container'>
          <div className='title_head'>
            <h1>
              New Arrivals. <span>REY backpacks & bags</span>
            </h1>
          </div>

          {keyword ? (
            <>
              <div className='searchProWhile'>
                <div className='product product-flex'>
                  <div className='left'>
                    <Range
                      marks={{
                        1: `$1`,
                        1000: `$1000`,
                      }}
                      min={1}
                      max={1000}
                      defaultValue={[1, 1000]}
                      tipFormatter={(value) => `$${value}`}
                      tipProps={{
                        placement: "top",
                        visible: true,
                      }}
                      value={price}
                      onChange={(price) => setPrice(price)}
                    />
                    <div className='categories'>
                      <h2>Categories</h2>
                      <ul className='categories_list'>
                        {categories.map((category, i) => (
                          <li key={i} onClick={() => setCategory(category)}>
                            {category}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className='rating'>
                      <h2>Ratings</h2>
                      <ul>
                        {[5, 4, 3, 2, 1]?.map((star, i) => (
                          <li style={{ cursor: "pointer", listStyleType: "none" }} key={i} onClick={() => setRating(star)}>
                            <div className='rating-outer'>
                              <div
                                className='rating-inner'
                                style={{
                                  width: `${star * 20}%`,
                                }}
                              ></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className='right grid3'>
                    {products?.map((product) => {
                      return <ProductCard key={product._id} product={product} />
                    })}
                  </div>
                </div>

                {perPage <= count && (
                  <div className='pagination' id='react-paginate'>
                    <Pagination activePage={currentPage} itemsCountPerPage={perPage} totalItemsCount={productsCount} onChange={setCurrentPageNo} nextPageText={"Next"} prevPageText={"Prev"} firstPageText={"First"} lastPageText={"Last"} />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className='product grid4'>
              {products?.map((product) => {
                return <ProductCard key={product._id} product={product} />
              })}
            </div>
          )}
        </div>
      </div>

      {perPage <= count && (
        <div className='pagination' id='react-paginate'>
          <Pagination activePage={currentPage} itemsCountPerPage={perPage} totalItemsCount={productsCount} onChange={setCurrentPageNo} nextPageText={"Next"} prevPageText={"Prev"} firstPageText={"First"} lastPageText={"Last"} />
        </div>
      )}
    </>
  )
}
