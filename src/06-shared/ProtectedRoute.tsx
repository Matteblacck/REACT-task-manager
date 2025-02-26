import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated);

  // Если пользователь не авторизован, перенаправляем на гостевую страницу
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Если авторизован, показываем дочерние компоненты
  return (
  <>
  <div style={{marginTop:'100px'}}>
  <Outlet />
  </div>
    
  </>
  )
};