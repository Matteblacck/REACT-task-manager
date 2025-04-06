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
  createTransform
} from 'redux-persist';
import { combineReducers } from "redux";
import storage  from "redux-persist/lib/storage";
import authReducer from './slices/userSlice';
import boardsReducer from './slices/boardsSlice';

// 1. Кастомный storage с правильной сериализацией

// 2. Transform для обработки данных
const readableTransform = createTransform(
  // inbound - сохраняем как есть (Redux Persist сам сериализует)
  (state) => state,
  // outbound - парсим данные
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

// 3. Конфигурация persist (ВКЛЮЧАЕМ сериализацию)
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

// 4. Создаем root reducer
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  boards: persistReducer(boardsPersistConfig, boardsReducer),
});

// 5. Создаем store
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