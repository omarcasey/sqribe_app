// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other slices as needed
  },
});

export default store;
