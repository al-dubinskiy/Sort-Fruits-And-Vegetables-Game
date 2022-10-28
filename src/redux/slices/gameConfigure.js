import { createSlice } from '@reduxjs/toolkit'
import { gameDifficultyLevels } from '../../types'

const initialState = {
  gameDifficultyLevel: gameDifficultyLevels[0],
  gameEndState: {
    value: false,
    reason: null
  }
}

export const gameConfigureSlice = createSlice({
  name: 'gameConfigure',
  initialState,
  reducers: {
    setGameDifficultyLevel: (state, action) => {
      state.gameDifficultyLevel = action.payload
    },
    setGameEndState: (state, action) => {
      state.gameEndState = {
        value: action.payload.value,
        reason: action.payload.reason
      } 
    },
    resetGameConfigureState: (state, action) => {
      state.gameEndState = { value: false, reason: null }
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setGameDifficultyLevel, 
  setGameEndState, 
  resetGameConfigureState 
} = gameConfigureSlice.actions

export default gameConfigureSlice.reducer