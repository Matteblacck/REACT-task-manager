import { Outlet } from 'react-router-dom';
import './App.css';
import Header from '../03-widgets/Header/Header';
import { PersistGate } from 'redux-persist/integration/react';
import { AppDispatch, persistor } from './redux/store';
import { useDispatch } from 'react-redux';
import { setTheme } from './redux/slices/settings/appearanceSlice';
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
    const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}');
    
    // Устанавливаем тему
    const savedTheme = savedSettings.theme || 'light';
    dispatch(setTheme(savedTheme));
    document.documentElement.setAttribute('data-theme', savedTheme);
  
  }, [dispatch]);
  return (
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <GlobalStyle />
      <Header />
      <Outlet />
    </PersistGate>
  );
};

export default App;