import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

interface AppearanceState {
  theme: ThemeMode;
}

const initialState: AppearanceState = {
  theme: 'light',
};

const appearanceSlice = createSlice({
  name: 'appearance',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      document.documentElement.setAttribute('data-theme', action.payload);
    },
  },
});

export const { setTheme } = appearanceSlice.actions;
export default appearanceSlice.reducer;