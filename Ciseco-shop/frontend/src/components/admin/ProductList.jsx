import React, { useEffect } from "react"
import { AiFillEdit, AiFillEye } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { SearchBox } from "../../pages/common/SearchBox"
import { getAdminProducts, deleteProduct, clearError } from "../../redux/actions/productAction"
import { DELETE_PRODUCT_RESET } from "../../redux/constrants/productConstrants"
import { Loader } from "../common/Loader"
import { Pagination } from "../common/Pagination"
import { Sidebar } from "./Sidebar"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"

export const ProductList = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { loading, error, products } = useSelector((state) => state.products)
  const { error: deleteError, isDeleted } = useSelector((state) => state.deleteProduct)

  useEffect(() => {
    dispatch(getAdminProducts())

    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
    if (deleteError) {
      toast.error(deleteError)
      dispatch(clearError())
    }

    if (isDeleted) {
      toast.success("Product delete successfully")
      history.push("/admin/product")
      dispatch({ type: DELETE_PRODUCT_RESET })
    }
  }, [dispatch, error, deleteError, history, isDeleted])

  const deleteProductHandler = async (id) => {
    dispatch(deleteProduct(id))
  }

  // delete popup
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteProductHandler(id),
        },
        {
          label: "Cancel",
        },
      ],
    })
  }
  return (
    <>
      <main className='main'>
        <Sidebar />
        <section className='orderList admin'>
          <h1>All Products</h1>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className='content'>
                <SearchBox />
                <div className='tableContent'>
                  <table>
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products?.map((product, i) => (
                          <tr>
                            <td width='10%'>{i + 1}</td>
                            <td width='20%' className='size-50'>
                              <img src={product?.images[0].url} alt='images' className='size-50' />
                            </td>
                            <td width='35%' style={{ textAlign: "left" }}>
                              {product.name.slice(0, 45)}...
                            </td>
                            <td width='10%'>{product.price}</td>
                            <td width='10%'>{product.stock}</td>
                            <td width='15%'>
                              <Link to={`/products/${product?._id}`} className='view'>
                                <AiFillEye size={20} />
                              </Link>
                              <button onClick={() => confirmDelete(product._id)}>
                                <MdDelete className='icon delete' size={20} />
                              </button>
                              <Link to={`/admin/products/${product?._id}`} className='view'>
                                <AiFillEdit className='icon' size={20} />
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <Pagination />
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  )
}
