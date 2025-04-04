import { AppDispatch } from '../01-app/redux/store';
import { 
    registerStart, 
    registerSuccess, 
    registerFailure, 
    loginStart, 
    loginSuccess, 
    loginFailure 
} from '../01-app/redux/slices/userSlice';

// Фейковые данные для тестирования
const fakeUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
};

// Регистрация
export const signupUser = async (
    userData: { name: string; email: string; password: string }, 
    dispatch: AppDispatch
) => {
    try {
        dispatch(registerStart());

        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Проверяем, совпадают ли данные с фейковыми
        if (userData.email === fakeUser.email && userData.password === fakeUser.password) {
            const response = {
                token: {
                    email: userData.email,
                    password: userData.password
                },
                profile: {
                    name: userData.name,
                    email: userData.email,
                    telephone: '',
                    about: ''
                }
            };

            dispatch(registerSuccess(response));
            return response;
        } else {
            throw new Error('Invalid registration data');
        }
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

        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Проверяем, совпадают ли данные с фейковыми
        if (credentials.email === fakeUser.email && credentials.password === fakeUser.password) {
            const response = {
                token: {
                    email: credentials.email,
                    password: credentials.password
                },
                profile: {
                    name: fakeUser.name,
                    email: credentials.email,
                    telephone: '',
                    about: ''
                }
            };

            dispatch(loginSuccess(response));
            return response;
        } else {
            throw new Error('Invalid login credentials');
        }
    } catch (error: any) {
        dispatch(loginFailure());
        throw new Error(error.message || 'Login failed');
    }
};