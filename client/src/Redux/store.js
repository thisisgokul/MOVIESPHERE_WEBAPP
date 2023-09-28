
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const storedUserData = JSON.parse(localStorage.getItem('userData'));

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      user: storedUserData || null,
      loading: false,
    },
  },
});

export default store;
