import { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FaTimes, FaUser } from "react-icons/fa";
import Button from "../../06-shared/Button";
import StyledLink from "../../06-shared/StyledLink";
import { RootState } from "../../01-app/redux/store"; // Подключаем тип стора

interface ProfileMenuProps {
  isOpen: boolean;
  onClose?: () => void;
}

interface UserProfile {
  name: string;
  email: string;
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
  right: 0;
  height: 100vh;
  width: 350px;
  border-radius: 20px;
  background: var(--color-bg);
  transform: translateX(${(props) => (props.$isOpen ? "0" : "100%")});
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  transition: transform 0.4s ease-out, opacity 0.3s ease-in-out;
  padding: 20px;
  border-left: 2px solid var(--color-over);
  z-index: 1000;
  box-shadow: ${(props) =>
    props.$isOpen ? "-5px 0 15px rgba(0, 0, 0, 0.1)" : "none"};
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: var(--color-text);
  border-bottom: 2px solid var(--color-minor);
`;

const CloseButton = styled(Button)`
  border: none;
  background: none;
  padding: 0;
  color: var(--color-text);
  border-radius: 15px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-bg);
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
    background-color: var(--color-over);
  }
`
export default function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const user = useSelector((state: RootState) => state.auth.user?.profile) as
    | UserProfile
    | undefined;

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
          <span>{user?.name || "Guest"}</span>
          <CloseButton as="button" onClick={onClose} aria-label="Close profile menu">
            <FaTimes size={18} />
          </CloseButton>
        </MenuHeader>

        <MenuContent>
          <StyledLinkk to="/profile" onClick={onClose}>
            <MenuElement>
              <FaUser size={15} />
              <p>Your profile</p>
            </MenuElement>
          </StyledLinkk>
        </MenuContent>
      </MenuWrapper>
    </>
  );
}