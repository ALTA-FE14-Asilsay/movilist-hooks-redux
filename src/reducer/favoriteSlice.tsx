import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Item {
  id?: number;
  poster_path?: string;
  title?: string;
}

export interface FavoriteState {
  items: Item[];
}

const initialState: FavoriteState = {
  items: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
      // localStorage.setItem('datasfavorite', JSON.stringify(action.payload));
    },
    removeItem(state, action: PayloadAction<number>) {
      const findIndex = state.items.findIndex((a) => a.id === action.payload);
      findIndex !== -1 && state.items.splice(findIndex, 1);
    },
  },
});

export const { addItem, removeItem } = favoriteSlice.actions;
