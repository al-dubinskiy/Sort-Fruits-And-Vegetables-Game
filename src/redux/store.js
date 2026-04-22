import { combineReducers, configureStore } from '@reduxjs/toolkit'
import movingElementsReducer from './slices/movingElements'
import gameConfigureReducer from './slices/gameConfigure'

export const rootReducer = combineReducers({
    movingElements: movingElementsReducer,
    gameConfigure: gameConfigureReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})
