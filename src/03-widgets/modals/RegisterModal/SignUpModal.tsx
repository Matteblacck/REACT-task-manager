import styled from 'styled-components';
import Input from '../../../06-shared/Input';
import Button from '../../../06-shared/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../../07-api/AuthApi';
import { AppDispatch } from '../../../01-app/redux/store';
import { useNavigate } from'react-router-dom';

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
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
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
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpModal: React.FC<ModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { loading, error } = useSelector((state: any) => state.auth);

  const onSubmit = async (data: SignUpFormData) => {
    console.log('from data:', data);
    try {
      await signupUser(data, dispatch);
      onClose();
      navigate('/dashboard')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Registration Error:', error.message);
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
        <div>
          <h1 style={{ fontSize: '26px', color:'#FF9800' }}>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex flex-column text-start pb-3">
            <div className="pb-2">
              <label style={{ color: 'black' }}>Name:</label>
              <h3 style={{ color: 'gray', fontSize: '12px' }}>This name will be visible to other users</h3>
            </div>
            <div>
              <Input {...register("name")} type="text" placeholder="Enter the name..." />
              {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name.message}</p>}
            </div>
          </div>

          <div className="d-flex flex-column text-start pb-3">
            <div className="pb-2">
              <label style={{ color: 'black' }}>Email:</label>
              <h3 style={{ color: 'gray', fontSize: '12px' }}>You will use it to log in</h3>
            </div>
            <div>
              <Input type="email" {...register('email')} placeholder="Enter the email..." />
              {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</p>}
            </div>
          </div>

          <div className="d-flex flex-column text-start">
            <div className="pb-2">
              <label style={{ color: 'black' }}>Password</label>
              <h3 style={{ color: 'gray', fontSize: '12px' }}>Make up a strong password</h3>
            </div>
            <div>
              <div className='pb-2'>
                <Input type="password" {...register('password')} placeholder="Enter the password..." />
                {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</p>}
              </div>
              <div className='pb-2'>
                <label style={{ color: 'gray', fontSize: '12px' }}>Confirm the password</label>
              </div>
              <div>
                <Input type="password" {...register("confirmPassword")} placeholder="Confirm the password..." />
                {errors.confirmPassword && <p style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword.message}</p>}
              </div>
            </div>
          </div>
          <div className='pt-4'>
            <Button type="submit" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </div>
          {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default SignUpModal;