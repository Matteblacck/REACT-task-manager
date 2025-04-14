import styled from "styled-components";
import CardPreview from "../../../../../03-widgets/CardPreview";
import { useCardCustomization } from "../../../../../04-feature/SETTINGS/useCardCustomization";


const SectionTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--color-accent);
    border-radius: 3px;
  }
`;

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ControlsRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: all 0.2s ease;
  padding: 8px;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ControlLabel = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin: 0;
`;

const ParSelect = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: var(--color-bg);
  border: 1px solid var(--color-minor);
  border-radius: 6px;
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 0.875rem;
  color: var(--color-text);
  margin-left: 0.75rem;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background-image: url("data:image/svg+xml;utf8,<svg fill='%23666' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 16px 16px;

  &:hover {
    border-color: var(--color-accent);
  }

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(255, 152, 0, 0.2);
  }
`;

const PreviewContainer = styled.div`
  padding-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function BoardsSection() {
  const {
    setCardWidth,
    setCardFontSize,
    setCardBorderRadius,
    setCardBorderColor,
    currentWidth,
    currentFontSize,
    currentBorderRadius,
    currentBorderColor,
  } = useCardCustomization();

  // Опции для селектов
  const widthOptions = ["Compact", "Medium", "Wide"];
  const fontSizeOptions = ["Small", "Medium", "Large"];
  const borderRadiusOptions = ["Square", "Soft", "Medium", "Round"];
  const borderColor = ["Minor", "Highlighted"];

  return (
    <>
      <SectionTitle className="pb-3">Card customization</SectionTitle>
      <ControlsWrapper className="d-flex flex-column">
        <ControlsRow className="d-flex gap-4 flex-wrap content-align-center">
          {/* Ширина карточки */}
          <ControlGroup className="d-flex align-items-center">
            <ControlLabel>Width:</ControlLabel>
            <ParSelect
              value={currentWidth}
              onChange={(e) =>
                setCardWidth(
                  e.target.value.toLowerCase() as "compact" | "medium" | "wide"
                )
              }
            >
              {widthOptions.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </ParSelect>
          </ControlGroup>

          {/* Размер шрифта */}
          <ControlGroup className="d-flex align-items-center">
            <ControlLabel>Font size:</ControlLabel>
            <ParSelect
              value={currentFontSize}
              onChange={(e) =>
                setCardFontSize(
                  e.target.value.toLowerCase() as "small" | "medium" | "large"
                )
              }
            >
              {fontSizeOptions.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </ParSelect>
          </ControlGroup>

          {/* Скругление углов */}
          <ControlGroup className="d-flex align-items-center">
            <ControlLabel>Border:</ControlLabel>
            <ParSelect
              value={currentBorderRadius}
              onChange={(e) =>
                setCardBorderRadius(
                  e.target.value.toLowerCase() as
                    | "square"
                    | "soft"
                    | "medium"
                    | "round"
                )
              }
            >
              {borderRadiusOptions.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </ParSelect>
          </ControlGroup>

          {/* Цвет границы */}
          <ControlGroup className="d-flex align-items-center">
            <ControlLabel>Border color:</ControlLabel>
            <ParSelect
              value={currentBorderColor}
              onChange={(e) =>
                setCardBorderColor(
                  e.target.value.toLowerCase() as "minor" | "highlighted"
                )
              }
            >
              {borderColor.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </ParSelect>
          </ControlGroup>
        </ControlsRow>

        {/* Превью карточки */}
        <PreviewContainer className="pt-4 d-flex justify-content-center align-items-center">
          <CardPreview />
        </PreviewContainer>
      </ControlsWrapper>
    </>
  );
}