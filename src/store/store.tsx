import { configureStore } from '@reduxjs/toolkit';

import { favoriteSlice } from '../reducer/favoriteSlice';
import { themeSlice } from '../reducer/themeSlice';

const store = configureStore({
  reducer: {
    favorite: favoriteSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export default store;
