import { useEffect } from "react";
import styled from "styled-components";
import { FaTimes,FaHome, FaCog } from "react-icons/fa";
import Button from "../../06-shared/Button";
import StyledLink from "../../06-shared/StyledLink";
import logo from '../../assets/logo.svg'
import boards from '../../assets/boards.svg';


interface SlideMenuProps {
  isOpen: boolean;
  onClose?: () => void;
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
  transition: opacity 0.3s ease-in-out;
  z-index: 999;
`;

const MenuWrapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0; /* Меню теперь слева */
  height: 100vh;
  width: 350px;
  border-radius: 0 20px 20px 0; /* Скругляем только правый угол */
  background: #fff;
  transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")}); /* Двигаем влево */
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  transition: transform 0.4s ease-out, opacity 0.3s ease-in-out;
  padding: 20px;
  border-right: 2px solid #d2d1d1; /* Граница справа */
  z-index: 1000;
  box-shadow: ${(props) =>
    props.$isOpen ? "5px 0 15px rgba(0, 0, 0, 0.1)" : "none"};
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: black;
`;

const CloseButton = styled(Button)`
  border: none;
  background: none;
  padding: 0;
  transition: background-color 0.2s ease;
  border-radius: 15px;

  &:hover {
    background-color: #d2d1d1;
  }
`;

const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  
`;

const MenuElement = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
`;
const StyledLinkk = styled(StyledLink)`
padding: 5px 5px 5px 10px;
border-radius: 10px;
  &:hover{
    background-color: #d2d1d1;
  }
`

export default function SideMenu({ isOpen, onClose }: SlideMenuProps) {

  // Закрытие меню по клавише "Escape"
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />

      <MenuWrapper $isOpen={isOpen} role="dialog" aria-hidden={!isOpen}>
        <MenuHeader>
          <span><img src={logo} width='40'></img></span>
          <CloseButton as="button" onClick={onClose} aria-label="Close profile menu">
            <FaTimes size={18} />
          </CloseButton>
        </MenuHeader>

        <MenuContent>
            <StyledLinkk to="/dashboard" onClick={onClose} >
                <MenuElement >
                    <FaHome size='24'/>
                    <div >
                        <p>Home</p>
                    </div>
                </MenuElement>
          </StyledLinkk>
          <StyledLinkk to="/boards" onClick={onClose}>
            <MenuElement>
                <img src={boards} alt="" />
                <p>Boards</p>
            </MenuElement>
          </StyledLinkk>
          <StyledLinkk to="/settings" onClick={onClose}>
            <MenuElement>
                <FaCog size='24'/>
                <p>Settings</p>
            </MenuElement>
          </StyledLinkk>
        </MenuContent>
      </MenuWrapper>
    </>
  );
}