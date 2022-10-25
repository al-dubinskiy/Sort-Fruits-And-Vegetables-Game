import { combineReducers, configureStore } from '@reduxjs/toolkit'
import movingElementsReducer from './slices/movingElements'

export const rootReducer = combineReducers({
    movingElements: movingElementsReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})
