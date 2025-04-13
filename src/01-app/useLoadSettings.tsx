import { useDispatch } from 'react-redux';

import { tags as defaultTags } from '../05-entities/boardInterfaces';
import { defaultCardParams } from '../05-entities/cardProps';
import { AppDispatch } from './redux/store';
import { useEffect } from 'react';
import { setTheme } from './redux/slices/settings/appearanceSlice';
import { setCardParams } from './redux/slices/settings/cardCustomizationSlice';
import { setTags } from './redux/slices/settings/tagsCustomizationSlice';

const useLoadSettings = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}');
    
    // Устанавливаем тему
    const savedTheme = savedSettings.theme || 'light';
    dispatch(setTheme(savedTheme));
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Обработка тегов
    let savedTags = savedSettings.tags;
    
    // Если тегов нет в localStorage, сохраняем дефолтные
    if (!savedTags || savedTags.length === 0) {
      savedTags = defaultTags;
      localStorage.setItem('settings', JSON.stringify({
        ...savedSettings,
        tags: defaultTags
      }));
    }
    dispatch(setTags(savedTags));

    // Параметры карточки 
    const savedCardParams = {
      ...defaultCardParams,
      ...(savedSettings.cardParams || {})
    };
    dispatch(setCardParams(savedCardParams));
    
}, [dispatch]);
}

export default useLoadSettings;