import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, CLEAR_ERROS, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_RESET, NEW_REVIEW_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_RESET, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_RESET, GET_REVIEW_REQUEST, GET_REVIEW_SUCCESS, GET_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_RESET } from "../constrants/productConstrants"

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      }
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        perPage: action.payload.perPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      }
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      }
    case ALL_PRODUCT_FAIL:
    case ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CLEAR_ERROS:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      }
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case CLEAR_ERROS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      }
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      }
    case CLEAR_ERROS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      }
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      }
    case CLEAR_ERROS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

// product update and delete
export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdate: action.payload,
      }
    case UPDATE_PRODUCT_FAIL:
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      }
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdate: false,
      }
    case CLEAR_ERROS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const productReviewReducer = (state = { review: [] }, action) => {
  switch (action.type) {
    case GET_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      }
    case GET_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      }
    case CLEAR_ERROS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const deleteProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      }
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      }
    case CLEAR_ERROS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}
