import styled from "styled-components";
import { AppDispatch } from "../../../01-app/redux/store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaBell, FaLock, FaPalette, FaLanguage, FaSignOutAlt } from "react-icons/fa";
import { NotificationsTab } from "./NotificationsTab";
import { AppearanceTab } from "./AppearanceTab";



// Стили для контейнера

const MainContainer = styled.div`
  height: calc(100vh - 70px); // Высота минус высота header'а
  position: relative;
  background-color: transparent;
  overflow: hidden; // Скрываем элементы, выходящие за пределы контейнера
`;



const SettingsNav = styled.div`
  background: rgba(255, 255, 255, 0.8);
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
  color: ${props => props.$active ? '#ff9800' : '#333'};
  
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
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  height: 100%;
`;

export default function SettingsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState('notifications');

  const renderContent = () => {
    switch (activeTab) {
      case 'notifications':
        return <NotificationsTab/>;
      case 'security':
        return <div>Безопасность</div>;
      case 'appearance':
        return <AppearanceTab/>;
      case 'language':
        return <div>Язык и регион</div>;
      default:
        return <div>Выберите раздел настроек</div>;
    }
  };

  return (
    <MainContainer>      
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-md-3" style={{borderRight:'1px solid #d2d1d1'}}>
            <SettingsNav>
            
              <NavItem 
                $active={activeTab === 'notifications'} 
                onClick={() => setActiveTab('notifications')}
              >
                <NavIcon><FaBell /></NavIcon>
                <span>Notifications</span>
              </NavItem>
              
              <NavItem 
                $active={activeTab === 'security'} 
                onClick={() => setActiveTab('security')}
              >
                <NavIcon><FaLock /></NavIcon>
                <span>Security</span>
              </NavItem>
              
              <NavItem 
                $active={activeTab === 'appearance'} 
                onClick={() => setActiveTab('appearance')}
              >
                <NavIcon><FaPalette /></NavIcon>
                <span>Appearance</span>
              </NavItem>
              
              <NavItem 
                $active={activeTab === 'language'} 
                onClick={() => setActiveTab('language')}
              >
                <NavIcon><FaLanguage /></NavIcon>
                <span>Language</span>
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