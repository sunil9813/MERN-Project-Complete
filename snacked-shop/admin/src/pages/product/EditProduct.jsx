import React, { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/loader/Loader"
import ProductForm from "../../components/product/ProductForm"
import { getProduct, getUserProduct, selectIsLoading, selectProduct, updateProduct } from "../../redux/product/productSlice"

export const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoading = useSelector(selectIsLoading)

  // specific eidt product details hold
  const productEdit = useSelector(selectProduct)
  const [product, setProduct] = useState(productEdit)
  const [productImage, setProductImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState("")

  useEffect(() => {
    dispatch(getProduct(id))
  }, [dispatch, id])

  useEffect(() => {
    setProduct(productEdit)
    setImagePreview(productEdit && productEdit.image ? `${productEdit.image.filePath}` : null)
    setDescription(productEdit && productEdit.description ? productEdit.description : "")
  }, [productEdit])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  //save product to DB
  const saveProduct = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", product?.name)
    formData.append("category", product?.category)
    formData.append("quantity", product?.quantity)
    formData.append("price", product?.price)
    formData.append("color", product?.color)
    formData.append("size", product?.size)
    formData.append("description", description)

    if (productImage) {
      formData.append("image", productImage)
    }
    await dispatch(updateProduct({ id, formData }))
    await dispatch(getUserProduct())
    navigate("/product")
  }

  return (
    <>
      <section className='p-7 w-full'>
        {isLoading && <Loader />}
        <div className='bg-white card rounded-lg'>
          <h2 className='text-lg p-3 text-primary'>Update Product</h2>
          <hr className='my-4 mt-2' />

          <div className='p-5 pt-0'>
            <ProductForm product={product} productImage={productImage} imagePreview={imagePreview} description={description} setDescription={setDescription} handleInputChange={handleInputChange} handleImageChange={handleImageChange} saveProduct={saveProduct} button='Update Product' />
          </div>
        </div>
      </section>
    </>
  )
}
