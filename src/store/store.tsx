import { configureStore } from '@reduxjs/toolkit';
import { favoriteSlice } from '../reducer/favoriteSlice';

export default configureStore({
  reducer: {
    favorite: favoriteSlice.reducer,
  },
});
