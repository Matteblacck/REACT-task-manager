import styled, { keyframes } from "styled-components";
import { useState } from 'react'
import Input from "../../06-shared/Input";
import Button from '../../06-shared/Button';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaVk,
  FaInstagram,
  FaGithub,
  FaInfoCircle,
  FaEdit,
  FaTelegram
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '../../01-app/redux/store';
import { updateProfile } from "../../01-app/redux/slices/userSlice";
// Плавное колебание элементов
const floatAnimation = keyframes`
  0% { transform: translateY(0) translateX(0) rotate(0deg); }
  50% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
  100% { transform: translateY(0) translateX(0) rotate(0deg); }
`;

const slowFloat = keyframes`
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-15px) translateX(-10px); }
  100% { transform: translateY(0px) translateX(0px); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
// Стилизованные компоненты
const ProfileContainer = styled.div`
  height: calc(100vh - 100px);
  position: relative;
  padding: 40px;
  border-radius: 20px;

`;

const BackgroundElement = styled.div`
  position: absolute;
  z-index: -1;
  opacity: 0.3;
`;

const Circle = styled(BackgroundElement)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, #ff9800 30%, transparent);
  top: 10%;
  left: 5%;
  animation: ${slowFloat} 10s infinite alternate ease-in-out;
`;

const LargeCircle = styled(Circle)`
  width: 300px;
  height: 300px;
  top: 60%;
  left: 80%;
  background: radial-gradient(circle, #ff9800 40%, transparent);
  animation-duration: 15s;
`;

const Line = styled(BackgroundElement)`
  width: 200px;
  height: 2px;
  background: linear-gradient(to right, #ff9800, transparent);
  top: 30%;
  left: 50%;
  animation: ${floatAnimation} 7s infinite alternate ease-in-out;
`;

const Wave = styled(BackgroundElement)`
  width: 300px;
  height: 300px;
  top: 70%;
  left: 10%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M0,100 Q50,0 100,100 T200,100" stroke="%23FF9800" fill="none" stroke-width="4"/></svg>')
    no-repeat center;
  animation: ${floatAnimation} 12s infinite alternate ease-in-out;
`;

const Arc = styled(BackgroundElement)`
  width: 400px;
  height: 400px;
  top: 50%;
  right: 5%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M50,100 Q100,0 150,100" stroke="%23F57C00" fill="none" stroke-width="5"/></svg>')
    no-repeat center;
  animation: ${spin} 20s linear infinite;
`;

const ProfileSection = styled.section`
  margin-bottom: 30px;
`;

const EditIcon = styled(FaEdit)`
  font-size: 1.2rem;
  cursor: pointer;
  color: #ff9800;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    color: #f57c00;
  }
`;

const SectionTitleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &:hover ${EditIcon} {
    opacity: 1;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(90deg, #ff9800, #f57c00);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionContent = styled.div`
  background-color: #ffffff;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  font-size: 1.1rem;
  color: #343a40;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
`;

const SocialLink = styled.a`
  color: #ff9800;
  font-size: 2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #f57c00;
  }
`;
const SocialIcon = styled.a`
  color: #ff9800;
  font-size: 2.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #f57c00;
  }
`;
const StyledInput = styled(Input)`
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  padding: 2px 2px 2px 2px;
  border: 1px solid #d2d1d1;
  outline: none;
  height: auto;
  vertical-align: middle;
  margin: 0;
`
const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #d2d1d1;
  border-radius: 8px;
  outline: none;
  resize: vertical;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #ff9800;
    box-shadow: 0 0 5px rgba(255, 152, 0, 0.5);
  }

  &::placeholder {
    color: #999;
  }
`;



export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: { 
    auth: { 
      user: { 
        profile: { 
          telephone: string; 
          name: string; 
          email: string; 
          about: string;
          socials: { 
            vk: string; 
            telegram: string; 
            instagram: string; 
            github: string; 
          }
        } 
      } | null; 
    } 
  }) => state.auth.user?.profile || { 
    name: '', 
    email: '', 
    telephone: '', 
    about: '',
    socials: { 
      vk: '', 
      telegram: '', 
      instagram: '', 
      github: '' 
    } 
  });

  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingSocialLinks, setIsEditingSocialLinks] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  const handleEditPersonalInfo = () => {
    setIsEditingPersonalInfo(true);
  }
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    telephone: user?.telephone || '',
    about: user?.about || '',
    socials: {
      vk: user?.socials?.vk || '',
      telegram: user?.socials?.telegram || '',
      instagram: user?.socials?.instagram || '',
      github: user?.socials?.github || '',
    },

  });

  const handleEditSocialLinks = () => {
    setIsEditingSocialLinks(true);
  }

  const handleEditAbout = () => {
    setIsEditingAbout(true);
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('socials.')) {
      const subField = name.split('.')[1];
      setPersonalInfo((prev) => ({
        ...prev,
        socials: {
          ...prev.socials,
          [subField]: value,
        },
      }));
    } else {
      setPersonalInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleTextreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPersonalInfo((prev) => ({
     ...prev,
      about: e.target.value,
    }));
  }
  const saveInfo = () => {
    dispatch(updateProfile(personalInfo));
    setIsEditingPersonalInfo(false);
    setIsEditingSocialLinks(false);
    setIsEditingAbout(false);
  }
  return (
      
    
    <ProfileContainer className="container">
      
    <Circle />
      <LargeCircle />
      <Line />
      <Wave />
      <Arc />
      {/* Личная информация */}
      <ProfileSection id='personalInfo'>
      <SectionTitleWrapper>
        <SectionTitle>
          <FaUser /> Personal Information
        </SectionTitle>
        <EditIcon onClick={handleEditPersonalInfo}/>
      </SectionTitleWrapper>
        <SectionContent>
          {isEditingPersonalInfo ? (
            <>
            <InfoItem id='name'>
              <FaUser /> <strong>Name: <StyledInput name='name' value={personalInfo.name} onChange={handleInputChange}/></strong>
            </InfoItem>
            <InfoItem id='email'>
              <FaEnvelope /> <strong>Email: <StyledInput name='email' value={personalInfo.email} onChange={handleInputChange}/></strong>
            </InfoItem>
            <InfoItem id='phone'>
              <FaPhone /> <strong>Phone: <StyledInput name='telephone' value={personalInfo.telephone} onChange={handleInputChange} /></strong>
            </InfoItem>
            <Button onClick={saveInfo}>Save</Button>
          </>

          ) : (
            <>
            <InfoItem>
              <FaUser /> <strong>Name: {user.name}</strong>
            </InfoItem>
            <InfoItem>
              <FaEnvelope /> <strong>Email: {user.email}</strong>
            </InfoItem>
            <InfoItem>
              <FaPhone /> <strong>Phone: {user.telephone ? user.telephone : 'Your phone number'}</strong>
            </InfoItem>
            </>
          )}

        </SectionContent>
      </ProfileSection>


      {/* Социальные сети */}
      <ProfileSection id='socials'>
        <SectionTitleWrapper>
          <SectionTitle>
            <FaFacebook /> Socials
          </SectionTitle>
          <EditIcon onClick={handleEditSocialLinks} />
        </SectionTitleWrapper>
        <SectionContent>
  {isEditingSocialLinks ? (
    <>
    <SocialLinks>
      <div className="social-item">
        <SocialIcon><FaVk /></SocialIcon>
        <StyledInput name='socials.vk' value={personalInfo.socials.vk} placeholder="Add link" onChange={handleInputChange}/>
      </div>
      <div className="social-item">
        <SocialIcon><FaTelegram /></SocialIcon>
        <StyledInput name='socials.telegram' value={personalInfo.socials.telegram} placeholder="Add link" onChange={handleInputChange}/>
      </div>
      <div className="social-item">
        <SocialIcon><FaInstagram /></SocialIcon>
        <StyledInput name='socials.instagram' value={personalInfo.socials.instagram} placeholder="Add link" onChange={handleInputChange}/>
      </div>
      <div className="social-item">
      <SocialIcon><FaGithub /></SocialIcon>
        <StyledInput name='socials.github' value={personalInfo.socials.github} placeholder="Add link" onChange={handleInputChange}/>
      </div>

    </SocialLinks>
    <Button className='mt-2' onClick={saveInfo}>Save</Button>
    </>

  ) : (
    <SocialLinks>
      <SocialLink href={personalInfo.socials.vk ? personalInfo.socials.vk : ''} target="_blank" rel="noopener noreferrer">
        <FaVk />
      </SocialLink>
      <SocialLink href={personalInfo.socials.telegram ? personalInfo.socials.telegram : ''} target="_blank" rel="noopener noreferrer">
        <FaTelegram />
      </SocialLink>
      <SocialLink href={personalInfo.socials.instagram ? personalInfo.socials.instagram : ''} target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </SocialLink>
      <SocialLink href={personalInfo.socials.github ? personalInfo.socials.github : ''} target="_blank" rel="noopener noreferrer">
        <FaGithub />
      </SocialLink>
    </SocialLinks>

  )}
</SectionContent>
      </ProfileSection>

      {/* О себе */}
      <ProfileSection id='about'>
      <SectionTitleWrapper>
        <SectionTitle>
          <FaInfoCircle/> Personal Information
        </SectionTitle>
        <EditIcon onClick={handleEditAbout}/>
      </SectionTitleWrapper>
        <SectionContent>
          {isEditingAbout ?(
            <>
            <div className="d-flex flex-column ">
              <div>
                <StyledTextarea onChange={handleTextreaChange}></StyledTextarea>
              </div>
              <div>
                <Button onClick={saveInfo}>Save</Button>
              </div>
            
            </div>
            
            </>
          ) : (
            <p>
            {user.about? user.about : 'Your about text goes here' }
            </p>
          )}
          
        </SectionContent>
      </ProfileSection>
    </ProfileContainer>
  );
}
