import { Outlet } from 'react-router-dom';
import './App.css';
import Header from '../03-widgets/Header/Header';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import { createGlobalStyle } from 'styled-components';
import { useInitializeSettings } from './useInitializeSettings';

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
  useInitializeSettings()
  return (
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <GlobalStyle />
      <Header />
      <Outlet />
    </PersistGate>
  );
};

export default App;