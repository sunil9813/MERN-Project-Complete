import axios from "axios"
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, CLEAR_ORDER_ERRORS, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, MY_ORDER_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ALL_ORDER_REQUEST, ALL_ORDER_SUCCESS, ALL_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAIL } from "../constrants/orderConstrants"

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post("/api/order/new", order, config)
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Get currently logged in user orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST })
    const { data } = await axios.get("/api/order/me")

    dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders })
  } catch (error) {
    dispatch({ type: MY_ORDER_FAIL, payload: error.response.data.message })
  }
}

// get order  details
export const getOrdersDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/order/${id}`)

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order })
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data.message })
  }
}

// get all order
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_REQUEST })
    const { data } = await axios.get(`/api/admin/orders`)

    dispatch({ type: ALL_ORDER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ALL_ORDER_FAIL, payload: error.response.data.message })
  }
}

//  update order
export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.put(`/api/admin/orders/${id}`, orderData, config)

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_FAIL, payload: error.response.data.message })
  }
}

//  delete order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST })

    const { data } = await axios.delete(`/api/admin/orders/${id}`)

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAIL, payload: error.response.data.message })
  }
}

//Clear Erros
export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ORDER_ERRORS,
  })
}
