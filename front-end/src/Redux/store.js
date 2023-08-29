import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import clientReducer from './features/clientSlice'
import idReducer from './features/idSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    clientData: clientReducer,
    id: idReducer,
  },
})