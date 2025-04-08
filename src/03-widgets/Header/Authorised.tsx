import Button from '../../06-shared/Button';
import { HeaderContainer } from './Header';
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileMenu from '../SlideMenus/ProfileMenu';
import { useState } from 'react';
import { FaUser, FaBars } from 'react-icons/fa';
import styled from'styled-components';
import SideMenu from '../SlideMenus/SideMenu';

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
    const [isSlideMenuOpen, setIsSlideMenuOpen] = useState(false);
    const location = useLocation();

    const getPageTitle = (path: string) => {
        switch (path) {
            case '/dashboard':
                return 'Dashboard';
            case '/profile':
                return 'Profile';
            case '/boards':
                return 'Boards'
            default:
                return 'Task Manager';
        }
    }

    const handleProfileMenuOpen = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
        setIsSlideMenuOpen(false)
    }
    const handleSlideMenuOpen = () => {
        setIsSlideMenuOpen(!isSlideMenuOpen);
        setIsProfileMenuOpen(false)
    }

    const pageTitle = getPageTitle(location.pathname);
    const isAuthenticated = useSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated);

    return (
        <>
            <HeaderContainer>
                <div className='d-flex align-items-center gap-2'>
                <div className='d-flex gap-1'>
                    <Button onClick={handleSlideMenuOpen}>
                        <FaBars size={15} />
                    </Button>
                </div>
                <div className='d-flex align-items-center gap-1'>
                    <div>
                        <Link to={isAuthenticated ? '/dashboard' : '/'}>
                            <img src={logo} alt="logo" width='40' />
                        </Link>
                    </div>
                    <h1 style={{ fontSize: '23px'}}>{pageTitle}</h1>
                </div>
                </div>

                <div className='d-flex gap-1'>
                    <Button onClick={handleProfileMenuOpen}>
                        <StyledUserIcon size={15} />
                    </Button>
                </div>
            </HeaderContainer>
            <ProfileMenu isOpen={isProfileMenuOpen} onClose={() => setIsProfileMenuOpen(false)} />
            <SideMenu isOpen={isSlideMenuOpen} onClose={() => setIsSlideMenuOpen(false)} />
        </>
    );
}