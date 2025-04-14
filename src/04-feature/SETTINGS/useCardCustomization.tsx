import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { AppDispatch, RootState } from "../../01-app/redux/store";
import { setCardParams } from "../../01-app/redux/slices/settings/cardCustomizationSlice";

const applyStyle = (root: HTMLElement, property: string, preset: string) => {
  const value = getComputedStyle(root).getPropertyValue(preset);
  root.style.setProperty(property, value.trim());
};

export const useCardCustomization = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    cardWidth,
    cardFontSize,
    cardBorderRadius,
    cardBorderColor,
  } = useSelector((state: RootState) => state.settings.cardCustomization);

  const applyStyles = useCallback(() => {
    const root = document.documentElement;
    applyStyle(root, "--card-width", `--card-width-${cardWidth}`);
    applyStyle(root, "--card-fontSize", `--card-fontSize-${cardFontSize}`);
    applyStyle(root, "--card-borderRadius", `--card-borderRadius-${cardBorderRadius}`);
    applyStyle(root, "--card-borderColor", `--card-borderColor-${cardBorderColor}`);
  }, [cardWidth, cardFontSize, cardBorderRadius, cardBorderColor]);

  useEffect(() => {
    applyStyles();
  }, [applyStyles]);

  const setCardWidth = useCallback(
    (preset: "compact" | "medium" | "wide") => {
      dispatch(setCardParams({ cardWidth: preset }));
    },
    [dispatch]
  );

  const setCardFontSize = useCallback(
    (preset: "small" | "medium" | "large") => {
      dispatch(setCardParams({ cardFontSize: preset }));
    },
    [dispatch]
  );

  const setCardBorderRadius = useCallback(
    (preset: "square" | "soft" | "medium" | "round") => {
      dispatch(setCardParams({ cardBorderRadius: preset }));
    },
    [dispatch]
  );

  const setCardBorderColor = useCallback(
    (preset: "minor" | "highlighted") => {
      dispatch(setCardParams({ cardBorderColor: preset }));
    },
    [dispatch]
  );

  return {
    setCardWidth,
    setCardFontSize,
    setCardBorderRadius,
    setCardBorderColor,
    currentWidth: cardWidth,
    currentFontSize: cardFontSize,
    currentBorderRadius: cardBorderRadius,
    currentBorderColor: cardBorderColor,
  };
};