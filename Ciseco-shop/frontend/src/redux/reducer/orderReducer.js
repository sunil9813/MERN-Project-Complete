import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, CLEAR_ORDER_ERRORS, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, MY_ORDER_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ALL_ORDER_REQUEST, ALL_ORDER_SUCCESS, ALL_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_RESET, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_RESET } from "../constrants/orderConstrants"

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }

    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CLEAR_ORDER_ERRORS:
      return {
        ...state,
        order: null,
      }
    default:
      return state
  }
}

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        loading: true,
      }
    case MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case MY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CLEAR_ORDER_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const ordersDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CLEAR_ORDER_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const allOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_REQUEST:
      return {
        loading: true,
      }
    case ALL_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      }
    case ALL_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CLEAR_ORDER_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      }
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }
    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case UPDATE_ORDER_RESET:
    case DELETE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      }
    case CLEAR_ORDER_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}
