import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  DarkMode: string;
}

const initialState: ThemeState = {
  DarkMode: 'bumblebee',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toChangeTheme(state, action) {
      state.DarkMode = action.payload;
    },
  },
});

export const { toChangeTheme } = themeSlice.actions;
