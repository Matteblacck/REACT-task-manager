import styled from 'styled-components';
import Input from '../../../06-shared/Input';
import Button from '../../../06-shared/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../01-app/redux/store';
import { loginUser } from '../../../07-api/AuthApi';
import { useNavigate } from 'react-router-dom';
// styled
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 3.5rem 2rem;
  border-radius: 8px;
  width: 40%;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  /* Добавляем фон с графикой */
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Cpath d="M0 500 Q150 450 300 500 T600 500 T800 500 L800 600 L0 600 Z" fill="%23FF9800" opacity="0.1" /%3E%3Cpath d="M0 50 Q150 100 300 50 T600 50 T800 50 L800 150 L0 150 Z" fill="%233E8E41" opacity="0.05" /%3E%3Cpath d="M0 200 Q150 250 300 200 T600 200 T800 200 L800 300 L0 300 Z" fill="%239b59e2" opacity="0.07" /%3E%3Cpath d="M0 400 Q150 450 300 400 T600 400 T800 400 L800 500 L0 500 Z" fill="%23FF9800" opacity="0.05" /%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

interface ModalProps {
  onClose: () => void;
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

const AuthModal: React.FC<ModalProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { loading, isAuthenticated, user } = useSelector((state: any) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AuthFormData) => {
    console.log('Logged:', data);
    try {
      await loginUser({ ...data}, dispatch); // Добавляем пустое имя

      setTimeout(() => {
        onClose();
        navigate('/dashboard');
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Authentification failed:', error.message);
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <h1 style={{ fontSize: '26px', color:'#FF9800'}}>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex flex-column text-start pb-3">
            <label htmlFor="email" className="pb-2" style={{ color: 'black', fontSize: '16px' }}>
              Email:
            </label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Enter your email..."
              autoComplete="email"
              style={{ borderColor: errors.email ? 'red' : '' }}
            />
            <div style={{ height: '16px' }}>
              {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</p>}
            </div>
          </div>

          <div className="d-flex flex-column text-start pb-3">
            <label htmlFor="password" className="pb-2" style={{ color: 'black', fontSize: '16px' }}>
              Password:
            </label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              placeholder="Enter your password..."
              autoComplete="current-password"
              style={{ borderColor: errors.password ? 'red' : '' }}
            />
            <div style={{ height: '16px' }}>
              {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</p>}
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>

        {isAuthenticated && (
          <p className='pt-2' style={{fontSize:'25px'}}>Welcome back{user?.name}!</p>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AuthModal;