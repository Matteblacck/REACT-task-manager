import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./redux/slices/settings/appearanceSlice";
import { setCardParams } from "./redux/slices/settings/cardCustomizationSlice";
import { AppDispatch, RootState } from "./redux/store";



export const useInitializeSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cardWidth, cardFontSize, cardBorderRadius, cardBorderColor } = useSelector(
    (state: RootState) => state.settings.cardCustomization
  );

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}');

    // Тема
    const savedTheme = savedSettings.theme || 'light';
    dispatch(setTheme(savedTheme));
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Кастомизация карточек
    if (savedSettings.cardParams) {
      dispatch(setCardParams(savedSettings.cardParams));
    }

  }, [dispatch]);

  // Применяем кастомизацию карточек
  useEffect(() => {
    const root = document.documentElement;
    const apply = (name: string, value: string) => {
      const cssValue = getComputedStyle(root).getPropertyValue(value);
      root.style.setProperty(name, cssValue.trim());
    };

    apply('--card-width', `--card-width-${cardWidth}`);
    apply('--card-fontSize', `--card-fontSize-${cardFontSize}`);
    apply('--card-borderRadius', `--card-borderRadius-${cardBorderRadius}`);
    apply('--card-borderColor', `--card-borderColor-${cardBorderColor}`);
  }, [cardWidth, cardFontSize, cardBorderRadius, cardBorderColor]);
};