import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardParams, defaultCardParams } from '../../../../05-entities/cardProps';

// Функция для обновления localStorage с сохранением cardParams
const updateLocalStorage = (cardParams: CardParams) => {
  const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}');
  localStorage.setItem('settings', JSON.stringify({
    ...savedSettings,
    cardParams
  }));
};

const initialState: CardParams = (() => {
  // Инициализация из localStorage при создании слайса
  const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}');
  return {
    ...defaultCardParams,
    ...(savedSettings.cardParams || {})
  };
})();

export const cardCustomizationSlice = createSlice({
  name: 'cardCustomization',
  initialState,
  reducers: {
    setCardParams: (state, action: PayloadAction<Partial<CardParams>>) => {
      const updated = { ...state, ...action.payload };
      updateLocalStorage(updated); // сохраняем обновлённые параметры
      return updated;
    },
  },
});

export const { setCardParams } = cardCustomizationSlice.actions;
export const selectCardParams = (state: { cardCustomization: CardParams }) => state.cardCustomization;
export default cardCustomizationSlice.reducer;