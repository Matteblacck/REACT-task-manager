import Button from '../../06-shared/Button';
import { HeaderContainer } from './Header';
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileMenu from '../SlideMenus/ProfileMenu';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import styled from'styled-components';
// Стилизованный компонент для иконки
const StyledUserIcon = styled(FaUser)`
  color: black; /* Цвет по умолчанию */
  transition: color 0.1s ease;

  &:hover {
    color: #ff9800; /* Цвет при наведении */
  }
`;
export default function Authorised() {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const location = useLocation();

    const getPageTitle = (path: string) => {
        switch (path) {
            case '/dashboard':
                return 'Dashboard';
            case '/profile':
                return 'Profile';
            default:
                return 'Task Manager';
        }
    }

    const handleProfileMenuOpen = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen); // Переключаем состояние меню
    }

    const pageTitle = getPageTitle(location.pathname);
    const isAuthenticated = useSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated);

    return (
        <>
            <HeaderContainer>
                <div className='d-flex align-items-center gap-1'>
                    <div>
                        <Link to={isAuthenticated ? '/dashboard' : '/'}>
                            <img src={logo} alt="logo" width='40' />
                        </Link>
                    </div>
                    <h1 style={{ fontSize: '23px'}}>{pageTitle}</h1>
                </div>
                <div className='d-flex gap-1'>
                    <Button onClick={handleProfileMenuOpen}>
                        <StyledUserIcon size={20} />
                    </Button>
                </div>
            </HeaderContainer>
            <ProfileMenu isOpen={isProfileMenuOpen} onClose={() => setIsProfileMenuOpen(false)} />
        </>
    );
}