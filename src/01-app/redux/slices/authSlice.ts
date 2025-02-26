import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определение интерфейсов
interface Token {
    email: string;
    password: string;
  }
  
interface Profile {
    name: string;
    email: string;
    telephone: string;
    about: string;
    socials?: {
      instagram: string;
      github: string;
      vk: string;
      telegram: string;
    };
  }
  
  // Тип состояния аутентификации
interface AuthState {
    user: {
      token: Token;
      profile: Profile;
    } | null;
    isAuthenticated: boolean;
    loading: boolean;
  }

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isAuthenticated: !!localStorage.getItem('user'),
    loading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action: PayloadAction<{ token: Token; profile: Profile}>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Сохраняем нового пользователя
        },
        loginFailure: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        },

        registerStart: (state) => {
            state.loading = true;
        },
        registerSuccess: (state, action: PayloadAction<{ token: Token; profile: Profile }>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Сохраняем нового пользователя
        },
        registerFailure: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
        },
        updateProfile: (state, action: PayloadAction<Profile>) => {
            if (state.user) {
                state.user.profile = action.payload;
                state.user.token.email = action.payload.email;
                localStorage.setItem('user', JSON.stringify(state.user)); // Сохраняем изменения профиля
            }
        },
    }
});

export const { loginStart, loginSuccess, loginFailure, logout, registerStart, registerSuccess, registerFailure, updateProfile } = authSlice.actions;
export default authSlice.reducer;