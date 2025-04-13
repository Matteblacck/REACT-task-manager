import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

interface AppearanceState {
  theme: ThemeMode;
}

const initialState: AppearanceState = {
  theme: 'light',
};

// Функция для обновления localStorage
const updateLocalStorage = (state: AppearanceState) => {
  const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}');
  localStorage.setItem('settings', JSON.stringify({ ...savedSettings, theme: state.theme }));
  document.documentElement.setAttribute('data-theme', state.theme);
};

const appearanceSlice = createSlice({
  name: 'appearance',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
      updateLocalStorage(state); // Обновляем localStorage
    },
  },
});

export const { setTheme } = appearanceSlice.actions;
export default appearanceSlice.reducer;