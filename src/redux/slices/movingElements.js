import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fruits: [],
  vegetables: []
}

export const movingElementsSlice = createSlice({
  name: 'movingElements',
  initialState,
  reducers: {
    updateFruits: (state, action) => {
      console.log('d ',  action.payload)
      state.fruits.push(action.payload)
    },
    updateVegetables: (state, action) => {
      state.vegetables.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateFruits, updateVegetables } = movingElementsSlice.actions

export default movingElementsSlice.reducer