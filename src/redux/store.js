import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import movingElementsReducer from './slices/movingElements'
import gameConfigureReducer from './slices/gameConfigure'
import appVarsReducer from './slices/appVars'

export const rootReducer = combineReducers({
    movingElements: movingElementsReducer,
    gameConfigure: gameConfigureReducer,
    appVars: appVarsReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
