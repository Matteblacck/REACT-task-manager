import styled from "styled-components";
import { useSelector } from "react-redux";
import { FaTimes } from 'react-icons/fa';
import Button from '../../06-shared/Button';
import StyledLink from '../../06-shared/StyledLink';
import { FaUser } from 'react-icons/fa';
interface ProfileMenuProps {
  isOpen: boolean;
  onClose?: () => void;
}

// Стили для оверлея

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  opacity: ${props => (props.$isOpen ? '1' : '0')};
  pointer-events: ${props => (props.$isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease-in-out;
  z-index: 999;
`;
// Стили для меню
const MenuWrapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 350px;
  border-radius: 20px;
  background: #fff;
  transform: translateX(${props => (props.$isOpen ? '0' : '100%')});
  opacity: ${props => (props.$isOpen ? '1' : '0')};
  transition: transform 0.4s ease-out, opacity 0.3s ease-in-out;
  padding: 20px;
  border-left: 2px solid #d2d1d1;
  z-index: 1000;
  box-shadow: ${props => (props.$isOpen ? '-5px 0 15px rgba(0, 0, 0, 0.1)' : 'none')};
  pointer-events: ${props => (props.$isOpen ? 'auto' : 'none')};
`;
// Стили для заголовка меню
const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: black;
  border-bottom: 2px solid #d2d1d1;
`;

// Стили для кнопки закрытия
const CloseButton = styled(Button)`
  border: none;
  background: none;
  padding: 0;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #d2d1d1;
  }
`;

// Стили для содержимого меню
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
export default function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const user = useSelector((state: { auth: { user: {profile: { name: string; email: string }} } }) => state.auth.user.profile);

  return (
    <>
      {/* Оверлей для закрытия меню */}
      <Overlay $isOpen={isOpen} onClick={onClose} />

      {/* Меню */}
      <MenuWrapper $isOpen={isOpen}>
        <MenuHeader>
          <span>{user.name}</span>
          <CloseButton onClick={onClose}>
            <FaTimes size={18} />
          </CloseButton>
        </MenuHeader>

        {/* Содержимое меню */}
        <MenuContent>
            <StyledLink to='/profile' onClick={onClose}> 
            <MenuElement>
                <FaUser size={15} /> {/* Иконка с отступом */}  
                <p>Your profile</p>
            </MenuElement>
            
            </StyledLink>
        </MenuContent>
      </MenuWrapper>
    </>
  );
}