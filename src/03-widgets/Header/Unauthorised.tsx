import Button from "../../06-shared/Button"
import { HeaderContainer } from "./Header"
import { useState } from "react"
import AuthModal from '../modals/AuthModal/AuthModal';
import SignUpModal from '../modals/RegisterModal/SignUpModal';
import logo from '../../assets/logo.svg'
export default function Unauthorised(){
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    return (
        <HeaderContainer>
            <div className='d-flex align-items-center gap-1'>
                <div>
                    <img src={logo} alt="logo" width='40'/>
                </div>
                <div>
                    <h1 style={{fontSize:'23px'}}>Task Manager</h1>
                </div>
            </div>
            <div className='d-flex gap-1'>
                <div>
                    <Button onClick={() => setIsLoginModalOpen(true)}>Log In</Button>
                </div>
                
                <div>
                    <Button onClick={() => setIsSignUpModalOpen(true)}>Sign Up</Button>
                </div>
                
            </div>
            {isLoginModalOpen && <AuthModal onClose={() => setIsLoginModalOpen(false)} />}
            {isSignUpModalOpen && <SignUpModal onClose={() => setIsSignUpModalOpen(false)} />}
        </HeaderContainer>
    )
}