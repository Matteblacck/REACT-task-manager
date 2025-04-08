import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';


// Страницы
import GuestPage from '../02-pages/Guest/GuestPage.tsx';
import DashboardPage from '../02-pages/ProtectedRoutes/DashboardPage.tsx';
import ProfilePage from '../02-pages/ProtectedRoutes/ProfilePage.tsx';
import App from './App';
import { ProtectedRoute } from '../06-shared/ProtectedRoute.tsx';
import BoardsPage from '../02-pages/ProtectedRoutes/BoardsPage.tsx';
import BoardPage from '../02-pages/ProtectedRoutes/BoardPage.tsx';

// Маршруты
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Родительский компонент (App)
    children: [
      {
        index: true,  // Главная страница для гостей
        element: <GuestPage />,
      },
      {
        element: <ProtectedRoute />,  // Защищенные маршруты
        children: [
          { path: '/dashboard', element: <DashboardPage /> }, // Страница для авторизованных пользователей
          { path: '/profile', element: <ProfilePage />},
          { path: '/boards', element: <BoardsPage />},
          { path: '/boards/board/:id', element: <BoardPage/>}
        ],
      },
    ],
  },
], {basename: import.meta.env.BASE_URL }
);

import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store.ts'; // persistor — обязательно экспортируй из store

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);