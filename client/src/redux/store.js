import { configureStore } from '@reduxjs/toolkit'
import serviceReducer from './serviceSlice.js'

export default configureStore({
  reducer: {
    service: serviceReducer,
  }
})