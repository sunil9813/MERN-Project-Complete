import axios from "axios"
import { BACKEND_URL } from "./authServices"

const API_URL = `${BACKEND_URL}/api/products/`
const API_ADMIN_URL = `${BACKEND_URL}/api/products/admin/products/`

//create new product
const createProduct = async (formData) => {
  const res = await axios.post(`${API_URL}`, formData)
  return res.data
}

//get all product
const getUserProducts = async () => {
  const res = await axios.get(`${API_URL}`)
  return res.data
}

//delete product
const deleteProduct = async (id) => {
  const res = await axios.delete(API_URL + id)
  return res.data
}

//get single product
const getProduct = async (id) => {
  const res = await axios.get(API_URL + id)
  return res.data
}

//update product
const updateProduct = async (id, formData) => {
  const res = await axios.patch(`${API_URL}${id}`, formData)
  return res.data
}

/*--------------only access for admin---------- */
//get all product
const getAdminProducts = async () => {
  const res = await axios.get(`${API_ADMIN_URL}`)
  return res.data
}

const productService = {
  createProduct,
  getUserProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  getAdminProducts,
}
export default productService
