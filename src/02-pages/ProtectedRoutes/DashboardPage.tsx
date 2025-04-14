import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import StyledLink from "../../06-shared/StyledLink";
import { Board } from "../../05-entities/boardInterfaces";
import { RootState } from "../../01-app/redux/store";

// Анимации для фона
const floatAnimation = keyframes`
  0% { transform: translateY(0) translateX(0) rotate(0deg); }
  50% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
  100% { transform: translateY(0) translateX(0) rotate(0deg); }
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
`;

// Стили для контейнера
const MainContainer = styled.div`
  height: calc(100vh - 70px); // Высота минус 100px сверху
  overflow-y: auto; // Добавляем скролл, если контент превышает высоту
  position: relative;
  overflow: hidden;
  background-color: var(--color-bg);
`;
const DashboardContainer = styled.div`
  padding-top: 40px;
  padding-left: 40px;
  padding-right: 40px;
  position: relative;
`;

// Стили для фоновых элементов
const BackgroundElement = styled.div`
  position: absolute;
  z-index: 1;
  opacity: 0.3;
  
`;

const Circle = styled(BackgroundElement)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, #ff9800 30%, transparent);
  top: 10%;
  left: 5%;
  animation: ${floatAnimation} 10s infinite alternate ease-in-out;
`;

const LargeCircle = styled(Circle)`
  width: 300px;
  height: 300px;
  top: 60%;
  left: 80%;
  background: radial-gradient(circle, #ff9800 40%, transparent);
  animation-duration: 15s;
`;

const Line = styled(BackgroundElement)`
  width: 200px;
  height: 2px;
  background: linear-gradient(to right, #ff9800, transparent);
  top: 30%;
  left: 50%;
  animation: ${floatAnimation} 7s infinite alternate ease-in-out;
`;

const Wave = styled(BackgroundElement)`
  width: 300px;
  height: 300px;
  top: 70%;
  left: 10%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M0,100 Q50,0 100,100 T200,100" stroke="%23FF9800" fill="none" stroke-width="4"/></svg>')
    no-repeat center;
  animation: ${floatAnimation} 12s infinite alternate ease-in-out;
`;

const Arc = styled(BackgroundElement)`
  width: 400px;
  height: 400px;
  top: 50%;
  right: 5%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M50,100 Q100,0 150,100" stroke="%23F57C00" fill="none" stroke-width="5"/></svg>')
    no-repeat center;
  animation: ${spinAnimation} 20s linear infinite;
`;

const Sunburst = styled(BackgroundElement)`
  width: 200px;
  height: 200px;
  top: 20%;
  right: 10%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="8" fill="%23FF9800" /><line x1="50" y1="50" x2="90" y2="50" stroke="%23FF9800" stroke-width="6" /><line x1="50" y1="50" x2="70" y2="80" stroke="%23FF9800" stroke-width="6" /><line x1="50" y1="50" x2="30" y2="80" stroke="%23FF9800" stroke-width="6" /><line x1="50" y1="50" x2="10" y2="50" stroke="%23FF9800" stroke-width="6" /><line x1="50" y1="50" x2="30" y2="20" stroke="%23FF9800" stroke-width="6" /><line x1="50" y1="50" x2="70" y2="20" stroke="%23FF9800" stroke-width="6" /></svg>')
    no-repeat center;
  animation: ${pulseAnimation} 5s infinite ease-in-out;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;
// Стили для контента
const SectionTitle = styled.h1`
  font-size: 23px;
  color: #ff9800;
  margin-bottom: 10px;
`;

const WorkspacesItem = styled(StyledLink)`
  border: 1px solid var(--color-minor);
  padding: 15px;
  font-size: 21px;
  background-color: var(--color-bg);
  margin-bottom: 5px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 2;

  animation: ${fadeIn} 0.4s ease-out forwards;

  &:hover {
    background-color: var(--color-over);
    border-color: #ccc;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  & strong {
    font-size: 1.2rem;
    color: #333;
  }

  & span {
    display: block;
    font-size: 0.9rem;
    color: #777;
    margin-top: 5px;
  }
`;


const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(100, 108, 255, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(100, 108, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(100, 108, 255, 0); }
`;

const SettingsList = styled.div`
  background: var(--color-bg);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  animation: ${fadeIn} 0.4s ease-out forwards;
  max-width: 480px;
  margin: 0 auto;
  
  &:hover {
    border-color: var(--color-accent);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const SettingItem = styled.h3`
  color: var(--color-text);
  font-size: 21px;
  font-weight: 600;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 5px;
  border: 1px solid var(--color-minor);
  padding: 15px;
  background-color: var(--color-bg);
  display: flex;
  align-items: center;
  gap: 12px;
  
  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background: var(--color-accent);
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
  }
  
  &:hover {
    &::before {
      transform: scale(1.3);
      transition: transform 0.2s ease;
    }
  }
`;


// Пример использования:


const UsersWorkspaces = styled.div``;
const SomeInfoContainer1 = styled.div``;
const SomeInfoContainer2 = styled.div``;

export default function DashboardPage() {
  const boards = useSelector(
    (state: { boards: { boards: Board[] } }) => state.boards.boards
  );
  const cardParams = useSelector((state: RootState) => state.settings.cardCustomization);
  return (
    <>
      <MainContainer>
        <Circle />
        <LargeCircle />
        <Line />
        <Wave />
        <Arc />
        <Sunburst />
        <DashboardContainer>
          <div className="row">
            {/* Контент */}
            <UsersWorkspaces className="col-4 d-flex flex-column" >
              <SectionTitle>Your workspaces:</SectionTitle>
              <div className='d-flex flex-column' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              {boards && boards.length > 0 ? (
                boards.map((board) => (
                  <WorkspacesItem to={`/boards/board/${board.id}`} key={board.id} >{board.name}</WorkspacesItem>
                ))
              ) : (
                <p>It seems like you don't have any boards yet</p>
                
              )}
              </div>
              
            </UsersWorkspaces>
            <SomeInfoContainer1 className="col-4">
              <SectionTitle>Your actual card configuration:</SectionTitle>
              <SettingsList>
                <SettingItem>
                  Width: {cardParams.cardWidth}
                </SettingItem>
                <SettingItem>
                  Text size: {cardParams.cardFontSize}
                </SettingItem>
                <SettingItem>
                  Border style: {cardParams.cardBorderRadius}
                </SettingItem>
                <SettingItem>
                  Border color: {cardParams.cardBorderColor}
                </SettingItem>
              </SettingsList>
            </SomeInfoContainer1>
            <SomeInfoContainer2 className="col-4">
              <SectionTitle>Content</SectionTitle>
              <div>
                <div>Some info 1</div>
                <div>Some info 2</div>
                <div>Some info 3</div>
              </div>
            </SomeInfoContainer2>
          </div>
        </DashboardContainer>
      </MainContainer>
    </>
  );
}
