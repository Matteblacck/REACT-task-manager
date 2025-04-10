import { Outlet } from 'react-router-dom';
import './App.css';
import Header from '../03-widgets/Header/Header';
import { PersistGate } from 'redux-persist/integration/react';
import { AppDispatch, persistor } from './redux/store'; // Экспортируешь persistor из store
import { useDispatch } from 'react-redux';
import { setTheme } from './redux/slices/appearanceSlice';
import { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  body {
    background-color: var(--color-bg);
    color: var(--color-text);
  }

  * {
    box-sizing: border-box;
  }
`;
const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const theme = savedTheme || 'light';
    dispatch(setTheme(theme));
    document.documentElement.setAttribute('data-theme', theme);
  }, [dispatch]);
  return (
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <GlobalStyle/>
      <Header />
      <Outlet />
    </PersistGate>
  );
};

export default App;