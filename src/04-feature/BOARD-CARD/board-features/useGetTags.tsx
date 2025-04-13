// useGetTags.ts
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../01-app/redux/store';
import { setTags } from '../../../01-app/redux/slices/settings/tagsCustomizationSlice';

export const useGetTags = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tags = useSelector((state: RootState) => state.settings.tagsCustomization.tags);

  useEffect(() => {
    // Загрузка тегов из localStorage только при первом рендере
    const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}');
    if (savedSettings.tags) {
      dispatch(setTags(savedSettings.tags));
    }
  }, [dispatch]);

  return tags;
};