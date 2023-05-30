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
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => {
        item.id !== action.payload;
      });
    },
  },
});

export const { addItem, removeItem } = favoriteSlice.actions;
