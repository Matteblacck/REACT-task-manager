import { Outlet } from 'react-router-dom';
import './App.css';
import Header from '../03-widgets/Header/Header';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store'; // Экспортируешь persistor из store

const App = () => {
  return (
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <Header />
      <Outlet />
    </PersistGate>
  );
};

export default App;