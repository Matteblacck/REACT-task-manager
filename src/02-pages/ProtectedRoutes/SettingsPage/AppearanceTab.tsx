import styled from "styled-components";
import lightTheme from "../../../assets/themes/light-theme.png";
import darkTheme from "../../../assets/themes/dark-theme.png";
import { useTheme } from "../../../04-feature/SETTINGS/useTheme";

const Subsection = styled.div`
  background-color: var(--color-over);
  border-radius: 15px;
  padding: 20px;
`;

const ThemeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ThemeSelectItem = styled.div<{ $active: boolean }>`
  position: relative;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${({ $active }) => 
    $active ? 'var(--color-minor)' : 'transparent'};
  width: 45%;
  overflow: hidden;

  &:hover {
    background-color: var(--color-over-hover);
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Image = styled.div<{ image: string }>`
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ThemeLabel = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,1);
  padding: 10px 20px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
`;

export const AppearanceTab = () => {
  const {
    setLightTheme,
    setDarkTheme,
    isLightTheme,
    isDarkTheme,
  } = useTheme();

  return (
    <div className="d-flex flex-column">
      <Subsection>
        <h5>Theme</h5>
        <ThemeContainer>
          <ThemeSelectItem 
            onClick={setLightTheme}
            $active={isLightTheme}
          >
            <Image image={lightTheme}>
              <ThemeLabel>LIGHT</ThemeLabel>
            </Image>
          </ThemeSelectItem>

          <ThemeSelectItem 
            onClick={setDarkTheme}
            $active={isDarkTheme}
          >
            <Image image={darkTheme}>
              <ThemeLabel>DARK</ThemeLabel>
            </Image>
          </ThemeSelectItem>
        </ThemeContainer>
      </Subsection>
    </div>
  );
};