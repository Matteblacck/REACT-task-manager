import { AppDispatch } from '../01-app/redux/store';
import { 
    registerStart, 
    registerSuccess, 
    registerFailure, 
    loginStart, 
    loginSuccess, 
    loginFailure 
} from '../01-app/redux/slices/authSlice';

// Фейковые данные для регистрации и логина
const fakeUser = { 
    name: 'matteblack', 
    email: 'test@example.com', 
    password: 'Test1234',
};

// Регистрация
export const signupUser = async (
    userData: { name: string; email: string; password: string, telephone?: string }, 
    dispatch: AppDispatch
) => {
    try {
        dispatch(registerStart());

        if (userData.email === fakeUser.email && userData.password === fakeUser.password) {
            const fakeResponse = { 
                data: { 
                    token: { email: userData.email, password: userData.password }, 
                    profile: { name: fakeUser.name, email: userData.email, telephone: userData.telephone || '' }
                } 
            };

            dispatch(registerSuccess(fakeResponse.data));
            return fakeResponse.data;
        } else {
            throw new Error('Invalid registration data');
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        dispatch(registerFailure());
        throw new Error(error.message || 'Registration failed');
    }
};

// Логин
export const loginUser = async (
    credentials: { email: string; password: string }, 
    dispatch: AppDispatch
) => {
    try {
        dispatch(loginStart());

        if (credentials.email === fakeUser.email && credentials.password === fakeUser.password) {
            const fakeResponse = { 
                data: { 
                    token: { email: credentials.email, password: credentials.password }, 
                    profile: { name: fakeUser.name, email: credentials.email, telephone: '' }
                } 
            };

            dispatch(loginSuccess(fakeResponse.data));
            return fakeResponse.data;
        } else {
            throw new Error('Invalid login credentials');
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        dispatch(loginFailure());
        throw new Error(error.message || 'Login failed');
    }
};