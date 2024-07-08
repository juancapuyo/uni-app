import { configureStore } from '@reduxjs/toolkit';
import uniReducer from '../features/uniSlice';

const store = configureStore({
  reducer: {
    universities: uniReducer
  }
});

export default store;
