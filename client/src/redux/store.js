import { configureStore } from '@reduxjs/toolkit'
import serviceReducer from './serviceSlice.js'
import { serviceApi } from './serviceAPI.js'

export default configureStore({
  reducer: {
    service: serviceReducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware:(getDefaultMiddleware) => 
    getDefaultMiddleware({serializableCheck: false}).concat(serviceApi.middleware)
})