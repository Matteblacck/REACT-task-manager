import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../01-app/redux/store";
import { setTheme } from "../../01-app/redux/slices/settings/appearanceSlice"; // Импортируем actions из слайса
import { RootState } from "../../01-app/redux/store";

export const useTheme = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.settings.appearance.theme); // Получаем текущую тему из редукса

  // Сохранение темы в localStorage и настройка атрибута data-theme
  const saveTheme = (theme: 'light' | 'dark') => {
    // Сохраняем раздел settings в localStorage, если его нет
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    settings.theme = theme;
    localStorage.setItem('settings', JSON.stringify(settings)); // Сохраняем раздел settings
    document.documentElement.setAttribute('data-theme', theme); // Устанавливаем атрибут на root
  };

  // Установка светлой темы
  const setLightTheme = () => {
    dispatch(setTheme('light'));
    saveTheme('light');
  };

  // Установка тёмной темы
  const setDarkTheme = () => {
    dispatch(setTheme('dark'));
    saveTheme('dark');
  };

  // Переключение темы
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
    saveTheme(newTheme);
  };

  return {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDarkTheme: theme === 'dark',
    isLightTheme: theme === 'light',
  };
};