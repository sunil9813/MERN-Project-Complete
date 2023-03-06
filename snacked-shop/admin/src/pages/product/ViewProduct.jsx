import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Loader from "../../components/loader/Loader"
import useRedirectLoggedOutUser from "../../customeHook/useRedirectLoggedOutUser"
import { selectIsLoggedIn } from "../../redux/auth/authSlice"
import { getProduct } from "../../redux/product/productSlice"
import * as DOMPurify from "dompurify"

export const Colors = ({ col }) => {
  return (
    <div className='colors' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <button style={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: 10, width: "25px", height: "25px", borderRadius: "50%", border: `1px solid ${col}` }}>
        <button style={{ background: `${col}`, width: "20px", height: "20px", borderRadius: "50%" }}></button>
      </button>
    </div>
  )
}

export const ViewProduct = () => {
  useRedirectLoggedOutUser("/login")

  const dispatch = useDispatch()

  const { id } = useParams()
  const isLoggedIN = useSelector(selectIsLoggedIn)
  const { product, isLoading, isError, message } = useSelector((state) => state.product)

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className='text-green-400'>In Stock</span>
    }
    return <span className='text-red-400'>Out of Stock</span>
  }

  useEffect(() => {
    if (isLoggedIN === true) {
      dispatch(getProduct(id))
    }
    if (isError) {
      console.log(message)
    }
  }, [isLoggedIN, isError, message, dispatch, id])
  return (
    <>
      <section className='w-full m-5'>
        {isLoading && <Loader />}
        {product && (
          <div className='bg-white card rounded-lg h-auto p-7 flex'>
            <div className='inputs border-2 border-gray-200 rounded-lg w-3/5 mr-8'>
              <h3 className='text-md p-3 text-primary'>PRODUCT INFORMATION</h3>
              <hr />
              <div className='p-3'>
                <h4>Product Availability : {stockStatus(product.quantity)}</h4>
                <h4 className='mt-2 capitalize'>
                  Name : <span className='text-gray-500 font-normal'>{product.name}</span>
                </h4>
                <h4 className='mt-2 capitalize'>
                  SKU : <span className='text-gray-500 font-normal'>{product.sku}</span>
                </h4>
                <h4 className='mt-2 capitalize'>
                  Category : <span className='text-gray-500 font-normal'>{product.category}</span>
                </h4>
                <h4 className='mt-2 capitalize'>
                  Price : <span className='text-gray-500 font-normal'>${product.price}</span>
                </h4>
                <h4 className='mt-2 capitalize'>
                  Quantity in stock : <span className='text-gray-500 font-normal'>{product.quantity}</span>
                </h4>
                <h4 className='mt-2 capitalize'>
                  Total Value in Stock : <span className='text-gray-500 font-normal'>${product.price * product.quantity}</span>
                </h4>
                <h4 className='mt-2 capitalize'>
                  Color : <span className='text-gray-500 font-normal'>{product.color}</span>
                </h4>
                {/* {product?.color.map((c) => (
                  <Colors col={c} />
                ))}*/}
                <h4 className='mt-2 capitalize'>
                  Size : <span className='text-gray-500 font-normal tracking-wider uppercase'>{product.size}</span>
                </h4>
                <h4 className='mt-2 capitalize'>
                  Created on : <span className='text-gray-500 font-normal'>{product.createdAt.toLocaleString("en-US")} </span>
                </h4>
                <h4 className='mt-2 capitalize'>{/*Last Updated : <span className='text-gray-500 font-normal'>{product?.updateAt.toLocaleString("en-US")} </span>*/}</h4>

                {/* html tag remove garxa ani content lai show garxa */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.description),
                  }}
                  className='mt-5'
                ></div>
              </div>
            </div>
            <div className='inputs border-2 border-gray-200 rounded-lg w-2/5 h-[60vh]'>
              <h3 className='text-md p-3 text-primary'>PRODUCT IMAGE</h3>
              <hr />

              {product?.image ? <img src={product.image.filePath} alt={product.image.fileName} /> : <p>No image Found!</p>}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
