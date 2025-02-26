import styled from 'styled-components';
import { useState } from 'react';
import SignUpModal from '../../03-widgets/modals/RegisterModal/SignUpModal';
// Styled components for design
const Container = styled.div`
  background: #f4f7fc;
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Cpath d="M0 500 Q150 450 300 500 T600 500 T800 500 L800 600 L0 600 Z" fill="%23FF9800" opacity="0.1" /%3E%3Cpath d="M0 50 Q150 100 300 50 T600 50 T800 50 L800 150 L0 150 Z" fill="%233E8E41" opacity="0.05" /%3E%3Cpath d="M0 200 Q150 250 300 200 T600 200 T800 200 L800 300 L0 300 Z" fill="%239b59e2" opacity="0.07" /%3E%3Cpath d="M0 400 Q150 450 300 400 T600 400 T800 400 L800 500 L0 500 Z" fill="%23FF9800" opacity="0.05" /%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  padding-top: 100px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #FF9800; /* Новый цвет для заголовка */
  font-size: 36px;
  margin-bottom: 20px;
  text-align: center;
`;

const SubTitle = styled.h2`
  color: #34495e;
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
`;

const Description = styled.p`
  color: #7f8c8d;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 800px;
  text-align: center;
`;

const Features = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: 16px;
  color: #2c3e50;
  max-width: 800px;
  margin-bottom: 30px;
`;

const FeatureItem = styled.li`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #2c3e50;
`;

const Button = styled.button`
  background-color: #FF9800; /* Новый цвет для кнопки */
  color: white;
  padding: 12px 24px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 50px;
  
  &:hover {
    background-color: #e68900; /* Темный оттенок при наведении */
  }
`;

const Arrow = styled.span`
  font-size: 20px;
  margin-left: 10px;
  color: #FF9800;
  cursor: pointer;
`;

const RoleSection = styled.section`
  background: #ffffff;
  /* background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Ccircle cx="600" cy="50" r="50" fill="%233E8E41" opacity="0.1" /%3E%3Ccircle cx="100" cy="400" r="100" fill="%23FF9800" opacity="0.05" /%3E%3Cpath d="M0 0 Q100 50 200 0 T400 0 T600 0 L800 0 L800 100 L0 100 Z" fill="%239b59e2" opacity="0.05" /%3E%3Cpath d="M0 300 Q150 350 300 300 T600 300 T800 300 L800 600 L0 600 Z" fill="%23FF9800" opacity="0.1" /%3E%3C/svg%3E'); */
  background-repeat: no-repeat;
  background-position: 80% 30%;
  border-radius: 10px;
  padding: 30px;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 90%;
  max-width: 1200px;
`;

const RoleTitle = styled.h3`
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
`;

const RoleDescription = styled.p`
  color: #7f8c8d;
  font-size: 18px;
  line-height: 1.6;
  text-align: center;
`;

const Diagram = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const ArrowIcon = styled.span`
  font-size: 40px;
  color: #FF9800;
  margin: 0 30px;
`;

const AdditionalSection = styled.section`
  background: #ffffff;
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Cpath d="M0 0 Q150 50 300 0 T600 0 T800 0 L800 600 L0 600 Z" fill="%233E8E41" opacity="0.05" /%3E%3Cpath d="M0 300 Q150 350 300 300 T600 300 T800 300 L800 600 L0 600 Z" fill="%23FF9800" opacity="0.1" /%3E%3Cpath d="M0 150 Q150 100 300 150 T600 150 T800 150 L800 250 L0 250 Z" fill="%239b59e2" opacity="0.07" /%3E%3Cpath d="M0 450 Q150 500 300 450 T600 450 T800 450 L800 600 L0 600 Z" fill="%23FF9800" opacity="0.05" /%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 50px;
  width: 90%;
  max-width: 1200px;
`;

const AdditionalTitle = styled.h3`
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
`;

const AdditionalDescription = styled.p`
  color: #7f8c8d;
  font-size: 18px;
  line-height: 1.6;
  text-align: center;
`;

export default function HomePage() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  return (
    <Container className='container'>
      <Title>Welcome to Your Task Manager!</Title>
      <Button onClick={() => setIsSignUpModalOpen(true)}>Get Started</Button>
      <SubTitle>Your all-in-one solution for organizing tasks and projects</SubTitle>

      <Description>
        Manage your work, collaborate with your team, and keep track of deadlines with our powerful task manager. Whether you're organizing personal tasks or collaborating with a team, this application will help you stay on top of everything. 
        You can access your tasks from anywhere and stay productive no matter what.
      </Description>

      <Description>
        Features include task tracking, customizable boards, and intuitive interfaces to boost your productivity. Organize your work by creating boards, adding tasks, setting deadlines, and more. 
        You can collaborate with your team in real-time, ensuring smooth workflows and improved efficiency.
      </Description>
      
      <AdditionalSection>
        <AdditionalTitle>Boost Your Productivity</AdditionalTitle>
        <AdditionalDescription>
          Stay organized and meet your deadlines with ease. The Task Manager helps you focus on the important things by letting you prioritize your tasks, 
          set reminders, and track progress. With customizable boards and tasks, you can organize your work the way that suits you best.
        </AdditionalDescription>

        <AdditionalTitle>Seamless Collaboration</AdditionalTitle>
        <AdditionalDescription>
          Share boards with your team and collaborate in real-time. Everyone can view and update tasks, leave comments, and track progress. 
          Say goodbye to miscommunication and hello to better teamwork and project management!
        </AdditionalDescription>

        <AdditionalTitle>Customizable & Accessible</AdditionalTitle>
        <AdditionalDescription>
          Personalize your workspace with themes and layouts that match your style. Whether you're working from home or on-the-go, 
          access your tasks and boards from any device, anytime. Stay on top of your work no matter where you are.
        </AdditionalDescription>
      </AdditionalSection>

      <Features>
        <FeatureItem>Manage personal and team tasks</FeatureItem>
        <FeatureItem>Customizable task boards</FeatureItem>
        <FeatureItem>Set and track deadlines</FeatureItem>
        <FeatureItem>Real-time collaboration with your team</FeatureItem>
        <FeatureItem>Access from any device, anytime</FeatureItem>
        <FeatureItem>Personalized workspace with custom themes</FeatureItem>
        <FeatureItem>Stay organized with reminders and priority settings</FeatureItem>
      </Features>

      <Arrow>↓</Arrow>

      <RoleSection>
        <RoleTitle>Roles in Task Manager</RoleTitle>
        <RoleDescription>
          This application offers different roles to customize your experience. Whether you are a team member, manager, or admin, 
          you can manage tasks according to your permissions and responsibility levels. 
          We provide flexible user roles that make task management seamless.
        </RoleDescription>

        <Diagram>
          <div>
            <RoleTitle>Team Member</RoleTitle>
            <p>View and update tasks, participate in collaborations, set deadlines.</p>
          </div>
          <ArrowIcon>→</ArrowIcon>
          <div>
            <RoleTitle>Manager</RoleTitle>
            <p>Assign tasks, track progress, and manage project timelines.</p>
          </div>
          <ArrowIcon>→</ArrowIcon>
          <div>
            <RoleTitle>Admin</RoleTitle>
            <p>Full control over task management, user permissions, and team settings.</p>
          </div>
        </Diagram>
      </RoleSection>
      {isSignUpModalOpen && <SignUpModal onClose={() => setIsSignUpModalOpen(false)} />}
    </Container>
  );
}