import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardParams, defaultCardParams } from '../../../../05-entities/cardProps';

const SETTINGS_KEY = 'settings';

const getSettingsFromLocalStorage = (): Partial<{ cardParams: CardParams }> => {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
  } catch {
    return {};
  }
};

const updateLocalStorage = (cardParams: CardParams) => {
  const savedSettings = getSettingsFromLocalStorage();
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({
    ...savedSettings,
    cardParams,
  }));
};

const initialState: CardParams = {
  ...defaultCardParams,
  ...(getSettingsFromLocalStorage().cardParams || {}),
};

export const cardCustomizationSlice = createSlice({
  name: 'cardCustomization',
  initialState,
  reducers: {
    setCardParams: (state, action: PayloadAction<Partial<CardParams>>) => {
      const updated = { ...state, ...action.payload };
      updateLocalStorage(updated);
      return updated;
    },
  },
});

export const { setCardParams } = cardCustomizationSlice.actions;

export const selectCardParams = (state: { cardCustomization: CardParams }) =>
  state.cardCustomization;

export default cardCustomizationSlice.reducer;