import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { createProduct, selectIsLoading } from "../../redux/product/productSlice"
import Loader from "../../components/loader/Loader"
import ProductForm from "../../components/product/ProductForm"

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
  size: "",
  color: "",
}
export const AddProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(initialState)
  const [productImage, setProductImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState("")

  const isLoading = useSelector(selectIsLoading)

  const { name, category, price, quantity, size, color } = product

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0])) // it just give access to preview image temporary which select form your computer
  }
  //SKU => unique number ho product lai dine i.e caetgory ko 3 ota letter first ma ELC(Electornice) & number(123....)
  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase()
    const number = Date.now()
    const sku = letter + "-" + number
    return sku
  }

  //save product to DB
  const saveProduct = async (e) => {
    e.preventDefault()

    // in regulary  FormData() it doesnt catch image in backend so we used new FormData()
    const formData = new FormData()
    // now we can append various properties
    formData.append("name", name)
    formData.append("sku", generateSKU(category))
    formData.append("category", category)
    formData.append("quantity", quantity)
    formData.append("price", price)
    formData.append("description", description)
    formData.append("size", size)
    formData.append("color", color)
    formData.append("image", productImage)

    console.log(...formData)

    //after create form disaptch func to that we create fun
    await dispatch(createProduct(formData))
    navigate("/product")
  }

  return (
    <>
      <section className='p-7 w-full'>
        {isLoading && <Loader />}
        <div className='bg-white card rounded-lg'>
          <h2 className='text-lg p-3 text-primary'>Add New Product</h2>
          <hr className='my-4 mt-2' />

          <div className='p-5 pt-0'>
            <ProductForm product={product} productImage={productImage} imagePreview={imagePreview} description={description} setDescription={setDescription} handleInputChange={handleInputChange} handleImageChange={handleImageChange} saveProduct={saveProduct} button='Add Product' />
          </div>
        </div>
      </section>
    </>
  )
}
