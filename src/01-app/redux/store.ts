import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from 'redux-persist';
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from './slices/userSlice';
import boardsReducer from './slices/boardsSlice';
import appearanceSlice from './slices/settings/appearanceSlice';
import tagsCustomizationSlice from './slices/settings/tagsCustomizationSlice';
import cardCustomizationSlice from "./slices/settings/cardCustomizationSlice";

// Transform для auth и boards
const readableTransform = createTransform(
  (state) => state,
  (raw) => {
    try {
      return typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch (e) {
      console.error('Failed to parse stored data', e);
      return null;
    }
  },
  { whitelist: ['auth', 'boards'] }
);
// persist конфиги
const authPersistConfig = {
  key: 'auth',
  storage,
  transforms: [readableTransform],
};

const boardsPersistConfig = {
  key: 'boards',
  storage,
  transforms: [readableTransform],
};
const settingsReducer = combineReducers({
  appearance: appearanceSlice,
  tagsCustomization: tagsCustomizationSlice,
  cardCustomization: cardCustomizationSlice,
});

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  boards: persistReducer(boardsPersistConfig, boardsReducer),
  settings: settingsReducer, // <- теперь всё под settings
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Типы
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;