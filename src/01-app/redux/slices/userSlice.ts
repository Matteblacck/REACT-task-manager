import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    boardIds: string[]; // Массив ID досок, в которых состоит пользователь
  } | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Загружаем пользователя и гарантируем, что boardIds всегда массив
const storedUser = JSON.parse(localStorage.getItem("user") || "null");
const initialUser = storedUser
  ? { ...storedUser, boardIds: storedUser.boardIds || [] }
  : null;

const initialState: AuthState = {
  user: initialUser,
  isAuthenticated: !!initialUser,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ token: Token; profile: Profile; boardIds?: string[] }>
    ) => {
      state.user = {
        ...action.payload,
        boardIds: action.payload.boardIds || [], // Гарантируем массив
      };
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    loginFailure: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },

    registerStart: (state) => {
      state.loading = true;
    },
    registerSuccess: (
      state,
      action: PayloadAction<{ token: Token; profile: Profile }>
    ) => {
      state.user = {
        ...action.payload,
        boardIds: [], // У нового пользователя всегда пустой список досок
      };
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    registerFailure: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },

    updateProfile: (state, action: PayloadAction<Profile>) => {
      if (state.user) {
        state.user.profile = action.payload;
        state.user.token.email = action.payload.email;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },

    joinBoard: (state, action: PayloadAction<string>) => {
      if (state.user && !state.user.boardIds.includes(action.payload)) {
        state.user.boardIds.push(action.payload);
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },

    leaveBoard: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.boardIds = state.user.boardIds.filter((id) => id !== action.payload);
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  updateProfile,
  joinBoard,
  leaveBoard,
} = authSlice.actions;

export default authSlice.reducer;