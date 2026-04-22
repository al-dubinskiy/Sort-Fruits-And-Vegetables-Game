import React from 'react'
import { Provider } from 'react-redux'
import { NavStack } from './src/NavStack'
import { store } from './src/redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <NavStack />
    </Provider>
  )
}
