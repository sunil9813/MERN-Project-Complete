import axios from "axios"
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, CLEAR_ERROS, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, GET_REVIEW_REQUEST, GET_REVIEW_SUCCESS, GET_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL } from "../constrants/productConstrants"

//get all product
export const getProducts =
  (keyword = "", currentPage = 1, price, category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST })

      let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

      if (category) {
        link = `/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
      }

      // const { data } = await axios.get("/api/products")
      const { data } = await axios.get(link)

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      })
    }
  }

// GET SINGLE PRODUCT
export const getSingleProducts = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

//New Review Products
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.put(`/api/review`, reviewData, config)

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    })
  }
}

//get all product -------for admin
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST })

    const { data } = await axios.get("/api/admin/products")

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    })
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

//New Review Products
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(`/api/products/new`, productData, config)

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

//Delete Products
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST })

    const { data } = await axios.delete(`/api/seller/products/${id}`)

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

//Update Products
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.put(`/api/seller/products/${id}`, productData, config)

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const getProductsReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEW_REQUEST })

    const { data } = await axios.get(`/api/reviews?id=${id}`)

    dispatch({
      type: GET_REVIEW_SUCCESS,
      payload: data.reviews,
    })
  } catch (error) {
    dispatch({
      type: GET_REVIEW_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const deleteProductReview = (id, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST })

    const { data } = await axios.delete(`/api/reviews?id=${id}&productId=${productId}`)

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    })
  }
}
//Clear Erros
export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROS,
  })
}
