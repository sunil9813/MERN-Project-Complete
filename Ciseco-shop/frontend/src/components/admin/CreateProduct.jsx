import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { NEW_PRODUCT_RESET } from "../../redux/constrants/productConstrants"
import { createProduct, clearError } from "../../redux/actions/productAction"
import { Sidebar } from "./Sidebar"

export const CreateProduct = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState(0)
  const [seller, setSeller] = useState("")
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  const categories = ["Electronics", "Laptop", "Smartphones", "Sports", "Television", "video devices", "Food", "Gaming", "Books", "Shoes", "Beautys/Health", "Accessories", "Outdoor", "Home", "Grocery", "Toys", "Furniture", "Kitchen", "Plant", "Cloth"]

  const history = useHistory()
  const dispatch = useDispatch()

  const { loading, error, success } = useSelector((state) => state.newProduct)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }

    if (success) {
      history.push("/admin/product")
      toast.success("Product created successfully")
      dispatch({ type: NEW_PRODUCT_RESET })
    }
  }, [dispatch, error, success, history])

  //SKU =>
  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase()
    const number = Date.now()
    const sku = letter + "-" + number
    return sku
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.set("name", name)
    formData.set("price", price)
    formData.set("description", description)
    formData.set("category", category)
    formData.set("stock", stock)
    formData.set("seller", seller)
    //formData.set("sku", generateSKU(category))

    images.forEach((image) => {
      formData.append("images", image)
    })
    dispatch(createProduct(formData))
  }

  const onChange = (e) => {
    const files = Array.from(e.target.files)

    setImagesPreview([])
    setImages([])

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        // 3 state => 0 mean just created, 1 means processsing and 2 mean everything in ready
        if (reader.readyState === 2) {
          // 1st time empty of image and spread the image in array and push garxa result in array and second time image spread and push to result and ongoing ..
          setImagesPreview((oldArray) => [...oldArray, reader.result])
          setImages((oldArray) => [...oldArray, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <>
      <main className='main dashboard'>
        <Sidebar />
        <section className='create_product admin'>
          <h1>Create Product</h1>
          <form className='login_form flex-between' onSubmit={submitHandler}>
            <div className='inputs'>
              <div className='input'>
                <label>Product Title</label>
                <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='grid2'>
                <div className='input'>
                  <div className='flex-between'>
                    <label>Price</label>
                  </div>
                  <input type='text' name='price' value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className='input'>
                  <div className='flex-between'>
                    <label>Stock</label>
                  </div>
                  <input type='text' name='stock' value={stock} onChange={(e) => setStock(e.target.value)} />
                </div>
              </div>
              <div className='input'>
                <div className='flex-between'>
                  <label>Seller Name</label>
                </div>
                <input type='text' name='seller' value={seller} onChange={(e) => setSeller(e.target.value)} />
              </div>
              <div className='input'>
                <div className='flex-between'>
                  <label>Category</label>
                </div>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((category, i) => (
                    <option value={category} key={i}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className='input'>
                <div className='flex-between'>
                  <label>Description</label>
                </div>
                <textarea name='description' cols='30' rows='10' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
              <button type='submit' className='button' disabled={loading ? true : false}>
                Continue
              </button>
            </div>
            <div className='images'>
              <label htmlFor='avatar_upload'>Images</label>
              <div className='image'>
                <div className='input'>
                  <div className='custom-file-upload'>
                    <input type='file' name='product_images' multiple onChange={onChange} id='file' />
                  </div>
                </div>
                <div className='imgs'>
                  {imagesPreview.map((img, i) => (
                    <div className='boxs' key={i}>
                      <img src={img} alt='avatarPreview' />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  )
}
