import { Outlet } from 'react-router-dom';
import './App.css';
import Header from '../03-widgets/Header/Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './redux/slices/userSlice';
import { AppDispatch } from './redux/store';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      dispatch(loginSuccess(JSON.parse(user)));
    }
  }, [dispatch]);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;