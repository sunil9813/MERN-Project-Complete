import React from "react"
import { Link } from "react-router-dom"
import { AiFillEye } from "react-icons/ai"
import { BiPencil, BiSearch } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import useRedirectLoggedOutUser from "../../customeHook/useRedirectLoggedOutUser"
import { useDispatch, useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../redux/auth/authSlice"
import { useEffect } from "react"
import { deleteProduct, getUserProduct } from "../../redux/product/productSlice"
import { useState } from "react"
import { FILTER_PRODUCT, selectFilteredProduct } from "../../redux/filterSlice"
import Loader from "../../components/loader/Loader"
import { confirmAlert } from "react-confirm-alert" // Import
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import ReactPaginate from "react-paginate"

export const Product = () => {
  useRedirectLoggedOutUser("/login")

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { products, isLoading, isError, message } = useSelector((state) => state.product)

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getUserProduct())
    }
    if (isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortendText = text.substring(0, n).concat("...")
      return shortendText
    }
    return text
  }

  //Search Function
  // Search Function
  const [search, setSearch] = useState("")
  const filteredProducts = useSelector(selectFilteredProduct)

  useEffect(() => {
    dispatch(FILTER_PRODUCT({ products, search }))
  }, [products, search, dispatch])

  //Begin pagination
  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 10

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, filteredProducts])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length
    setItemOffset(newOffset)
  }
  //End pagination

  //delete product
  const delProduct = async (id) => {
    await dispatch(deleteProduct(id))
    await dispatch(getUserProduct)
  }
  // delete popup
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
        },
      ],
    })
  }
  return (
    <>
      <section className='p-7'>
        <div className='bg-white p-3 card rounded-sm'>
          <div className='grid grid-cols-10 gap-3'>
            <div className='col-span-2'>
              <select id='large' className='block py-2 px-4 text-base rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300'>
                <option selected>Choose a Category</option>
                <option value='Fashion'>Fashion</option>
                <option value='Electronics'>Electronics</option>
                <option value='Furniture'>Furniture</option>
                <option value='Sport'>Sport</option>
              </select>
            </div>
            <div className='flex items-center col-span-5 mr-5'>
              <div className='relative w-full'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <BiSearch size={18} />
                </div>
                <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} className='bg-gray-50 border  text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 border-1 border-solid  border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' placeholder='Search' />
              </div>
            </div>
            <div className='col-span-3 flex'>
              <input type='date' className='mr-5 rounded-lg p-1 border-1 border-solid border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300' />
              <select id='large' className='block py-2 px-4 w-full text-base rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-200 focus:border-blue-300'>
                <option selected>Status</option>
                <option value='Active'>Active</option>
                <option value='Disabled'>Disabled</option>
                <option value='Show all'>Show All</option>
              </select>
            </div>
          </div>
          <hr className='my-5' />

          {/* product list */}
          {isLoading && <Loader />}
          {!isLoading && products?.length === 0 ? (
            <p>No Product Found!, Please add a Product</p>
          ) : (
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs uppercase bg-gray-200 text-primary '>
                <tr>
                  <th scope='col' className='py-3 px-6'>
                    SN
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Product Image
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Product name
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Quantity
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Value
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Price
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Status
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Date
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    SKU
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, price, quantity, image, createdAt, sku } = product
                  //console.log(product)
                  const date = new Date(createdAt)
                  return (
                    <>
                      <tr className='bg-white border-b' key={_id}>
                        <td className='py-4 px-6'>{index + 1}</td>
                        <td className='py-4 px-6'>{product.image ? <img src={image?.filePath} alt='images' className='size-40 object-cover' /> : <p>No Image Found!</p>}</td>
                        <td className='py-4 px-6'>{shortenText(name, 18)} </td>
                        <td className='py-4 px-6'>{quantity}</td>
                        <td className='py-4 px-6'>${price * quantity}</td>
                        <td className='py-4 px-6'>${price}</td>
                        <td className='py-4 px-6'>
                          {/*<span className={`${price} px-3 py-1 rounded-full text-white tracking-wide `}>{price}</span>*/}
                          working
                        </td>
                        <td className='py-4 px-6'>{date.toLocaleDateString()}</td>
                        <td className='py-4 px-6'>{sku}</td>
                        <td className='py-4 px-6 flex justify-between align-center'>
                          <Link to={`/product-details/${_id}`}>
                            <AiFillEye className='text-blue text-lg' size={22} />
                          </Link>
                          <Link to={`/edit-product/${_id}`}>
                            <BiPencil className='text-green-500 text-lg mx-3' size={22} />
                          </Link>

                          <MdDelete className='text-red-500 text-lg' size={22} onClick={() => confirmDelete(_id)} />
                        </td>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </table>
          )}
          <ReactPaginate breakLabel='...' nextLabel='Next' onPageChange={handlePageClick} pageRangeDisplayed={3} pageCount={pageCount} previousLabel='Prev' renderOnZeroPageCount={null} containerClassName='pagination' pageLinkClassName='page-num' previousLinkClassName='page-num' nextLinkClassName='page-num' activeLinkClassName='activePage' />
        </div>
      </section>
    </>
  )
}
