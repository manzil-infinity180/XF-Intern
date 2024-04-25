import { configureStore } from '@reduxjs/toolkit'
import AdminReducer from './admin/adminSlice'
import AdminPostReducer from './admin/postSlice'
export const store = configureStore({
  reducer: {
    admin: AdminReducer,
    adminPost: AdminPostReducer
  },
});