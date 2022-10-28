import { createSlice } from '@reduxjs/toolkit'
import { elementsData } from '../../elementsData'

const initialState = {
  elements: elementsData,
  fruits: [],
  vegetables: [],
  isHighlightBasket: {
    left: false,
    right: false
  },
  heartsLife: {
    visibleCount: 3,
    data: [
      { id: 1, isVisible: true },
      { id: 2, isVisible: true },
      { id: 3, isVisible: true },
    ],
    isRemoveHeart: false
  }, 
}

export const movingElementsSlice = createSlice({
  name: 'movingElements',
  initialState,
  reducers: {
    updateFruits: (state, action) => {
      state.fruits.push(action.payload.data)
      state.elements = state.elements.filter(el => el.title != action.payload.data.title) // maybe use splice()
    },
    updateVegetables: (state, action) => {
      state.vegetables.push(action.payload.data)
      state.elements = state.elements.filter(el => el.title != action.payload.data.title) // maybe use splice()
    },
    setIsHighlightBasket: (state, action) => {
      state.isHighlightBasket = {...state.isHighlightBasket, ...action.payload}
    },
    takeOffHeart: (state, action) => {
      let lastHeartIdx = state.heartsLife.visibleCount - 1
      let data = state.heartsLife.data // [{},{},{}]
      let removeHeart = { // {}
        ...state.heartsLife.data[lastHeartIdx],
        isVisible: false
      } 
      data.splice( // take of last heart 
        lastHeartIdx, 
        1, 
        removeHeart
      )

      state.heartsLife = {
        visibleCount: state.heartsLife.visibleCount - 1, 
        data, 
        isRemoveHeart: false
      }
    },
    setIsRemoveHeart: (state, action) => {
      state.heartsLife.isRemoveHeart = action.payload
    },
    resetHeartsLife: (state, action) => {
      state.heartsLife = {
        visibleCount: 3,
        data: [
          { id: 1, isVisible: true },
          { id: 2, isVisible: true },
          { id: 3, isVisible: true },
        ],
        isRemoveHeart: false
      }
    },
    resetCollectedElements: (state, action) => {
      state.fruits = []
      state.vegetables = []
    },
    resetElements: (state, action) => {
      state.elements = elementsData
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  updateFruits, 
  updateVegetables, 
  setIsHighlightBasket, 
  takeOffHeart, 
  setIsRemoveHeart, 
  resetHeartsLife,
  resetCollectedElements,
  resetElements
} = movingElementsSlice.actions

export default movingElementsSlice.reducer