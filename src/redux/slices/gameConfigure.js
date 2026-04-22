import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  gameDifficultyLevel: 1,
}

export const gameConfigureSlice = createSlice({
  name: 'gameConfigure',
  initialState,
  reducers: {
    setGameDifficultyLevel: (state, action) => {
      state.gameDifficultyLevel = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setGameDifficultyLevel } = gameConfigureSlice.actions

export default gameConfigureSlice.reducer