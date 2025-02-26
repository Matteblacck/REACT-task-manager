import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Импорт корневого состояния стора

// Интерфейс данных о пользователе
interface User {
  id: string;
  name: string;
  email: string;
  telephone?: string;
  about?: string;
  socials?: {
    instagram?: string;
    github?: string;
    vk?: string;
    telegram?: string;
  };
  boards: string[]; // ID досок, в которых состоит пользователь
}

// Интерфейс состояния пользователя
interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  updateUser,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;

// Селекторы
export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;