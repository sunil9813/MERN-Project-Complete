import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  filterProducts: [],
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCT(state, action) {
      const { products, search } = action.payload
      const tempProducts = products.filter((product) => product.name.toString().toLowerCase().includes(search.toString().toLowerCase()) || product.category.toString().toLowerCase().includes(search.toString().toLowerCase()))
      state.filterProducts = tempProducts
    },
  },
})

export const { FILTER_PRODUCT } = filterSlice.actions
export const selectFilteredProduct = (state) => state.filter.filterProducts
export default filterSlice.reducer
