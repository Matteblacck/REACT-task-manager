import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice.ts';
import userReducer from './slices/userSlice.ts';

export const store = configureStore({
    reducer: {
        auth: authReducer, // добавляем слайс для аутентификации
        user: userReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;