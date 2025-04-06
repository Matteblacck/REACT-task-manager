import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage по умолчанию

import authReducer from './slices/userSlice';
import boardsReducer from './slices/boardsSlice';

import { combineReducers } from "redux";

// 1. Комбинируем редюсеры
const rootReducer = combineReducers({
    auth: authReducer,
    boards: boardsReducer,
});

// 2. Конфиг persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // сохраняем только auth (или добавь boards если надо)
};

// 3. Оборачиваем в persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Создаём store с middleware
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// 5. Экспорт для persist
export const persistor = persistStore(store);

// Типы
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;