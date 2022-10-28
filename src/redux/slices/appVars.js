import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  navigation: null
}

export const appVarsSlice = createSlice({
  name: 'appVars',
  initialState,
  reducers: {
    setNavigation: (state, action) => {
      state.navigation = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setNavigation } = appVarsSlice.actions

export default appVarsSlice.reducer