import styled from "styled-components";
import { useState } from "react";
import { FaTable,FaPalette, FaSignOutAlt } from "react-icons/fa";
import { BoardsTab } from "./boards-tab/BoardsTab";
import { AppearanceTab } from "./AppearanceTab";




const MainContainer = styled.div`
  height: calc(100vh - 70px); // Высота минус высота header'а
  position: relative;
  color: var(--color-text);
  background: var(--color-bg);
  overflow: hidden; // Скрываем элементы, выходящие за пределы контейнера
`;



const SettingsNav = styled.div`
  background: var(--color-bg);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  height: 100%;
`;

const NavItem = styled.div<{ $active: boolean }>`
  padding: 10px 15px;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease;
  background: ${props => props.$active ? 'rgba(255, 152, 0, 0.2)' : 'transparent'};
  color: ${props => props.$active ? '#ff9800' : 'var(--color-text)'};
  
  &:hover {
    background: rgba(255, 152, 0, 0.1);
  }
`;

const NavIcon = styled.div`
  width: 24px;
  display: flex;
  justify-content: center;
`;
const ContentArea = styled.div`
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  height: 100%;
  max-height: 95vh; // Ограничиваем максимальную высоту
  overflow-y: auto; // Добавляем вертикальный скролл при необходимости
  
  // Убираем скроллбар в Firefox
  scrollbar-width: none;
  
  // Убираем скроллбар в Chrome/Safari
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('boards');

  const renderContent = () => {
    switch (activeTab) {
      case 'boards':
        return <BoardsTab/>;
      case 'appearance':
        return <AppearanceTab/>;
      default:
        return <BoardsTab/>;
    }
  };

  return (
    <MainContainer>      
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-md-3" style={{borderRight:'1px solid #d2d1d1'}}>
            <SettingsNav>
            
              <NavItem 
                $active={activeTab === 'boards'} 
                onClick={() => setActiveTab('boards')}
              >
                <NavIcon><FaTable /></NavIcon>
                <span>Boards</span>
              </NavItem>
              
              
              <NavItem 
                $active={activeTab === 'appearance'} 
                onClick={() => setActiveTab('appearance')}
              >
                <NavIcon><FaPalette /></NavIcon>
                <span>Appearance</span>
              </NavItem>
              
              
              <div className="mt-4 pt-3 border-top">
                <NavItem 
                  $active={false} 
                  onClick={() => {/* обработка выхода */}}
                >
                  <NavIcon><FaSignOutAlt /></NavIcon>
                  <span>Log out</span>
                </NavItem>
              </div>
            </SettingsNav>
          </div>
          
          {/* Правая колонка - контент (3/4 экрана) */}
          <div className="col-md-9">
            <ContentArea>
              {renderContent()}
            </ContentArea>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}