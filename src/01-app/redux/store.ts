import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/userSlice.ts';
import boardsReducer from './slices/boardsSlice.ts';

export const store = configureStore({
    reducer: {
        auth: authReducer, // добавляем слайс для аутентификации
        boards: boardsReducer, // добавляем слайс для досок
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;