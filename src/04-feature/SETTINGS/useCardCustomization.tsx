import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../01-app/redux/store";
import { setCardParams } from "../../01-app/redux/slices/settings/cardCustomizationSlice";

export const useCardCustomization = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cardWidth, cardFontSize, cardBorderRadius } = useSelector(
    (state: RootState) => state.settings.cardCustomization
  );

  const root = document.documentElement;

  const applyCardWidth = (preset: string) => {
    const value = getComputedStyle(root).getPropertyValue(`--card-width-${preset}`);
    root.style.setProperty('--card-width', value.trim());
  };

  const applyCardFontSize = (preset: string) => {
    const value = getComputedStyle(root).getPropertyValue(`--card-fontSize-${preset}`);
    root.style.setProperty('--card-fontSize', value.trim());
  };

  const applyCardBorderRadius = (preset: string) => {
    const value = getComputedStyle(root).getPropertyValue(`--card-borderRadius-${preset}`);
    root.style.setProperty('--card-borderRadius', value.trim());
  };

  useEffect(() => {
    applyCardWidth(cardWidth);
    applyCardFontSize(cardFontSize);
    applyCardBorderRadius(cardBorderRadius);
  }, [cardWidth, cardFontSize, cardBorderRadius]);

  const setCardWidth = (preset: 'compact' | 'medium' | 'wide') => {
    applyCardWidth(preset);
    dispatch(setCardParams({ cardWidth: preset }));
  };

  const setCardFontSize = (preset: 'small' | 'medium' | 'large') => {
    applyCardFontSize(preset);
    dispatch(setCardParams({ cardFontSize: preset }));
  };

  const setCardBorderRadius = (preset: 'square' | 'soft' | 'medium' | 'round') => {
    applyCardBorderRadius(preset);
    dispatch(setCardParams({ cardBorderRadius: preset }));
  };

  return { 
    setCardWidth, 
    setCardFontSize,
    setCardBorderRadius,
    currentWidth: cardWidth,
    currentFontSize: cardFontSize,
    currentBorderRadius: cardBorderRadius
  };
};