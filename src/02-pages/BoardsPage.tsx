import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../01-app/redux/store";
import { addBoard, Board, removeBoard } from "../01-app/redux/slices/boardsSlice";
import { joinBoard, leaveBoard } from "../01-app/redux/slices/userSlice";
import Button from "../06-shared/Button";
import StyledLink from "../06-shared/StyledLink";
import { FaTrash } from "react-icons/fa";
import ModalConfrm from '../03-widgets/modals/ModalConfirm'
import { useState } from'react';

// Анимации для фона
const floatAnimation = keyframes`
  0% { transform: translateY(0) translateX(0) rotate(0deg); }
  50% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
  100% { transform: translateY(0) translateX(0) rotate(0deg); }
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
`;

const moveLeftRight = keyframes`
  0% { transform: translateX(-50px); }
  50% { transform: translateX(50px); }
  100% { transform: translateX(-50px); }
`;

// Стили для контейнера
const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const MainContainer = styled.div`
  height: calc(100vh - 70px); // Высота минус 100px сверху
  overflow-y: auto; // Добавляем скролл, если контент превышает высоту
  position: relative;
  overflow: hidden;
`;

// Стили для фоновых элементов
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
  top: 5%;
  left: 10%;
  animation: ${floatAnimation} 8s infinite alternate ease-in-out;
`;

const LargeCircle = styled(Circle)`
  width: 250px;
  height: 250px;
  top: 70%;
  left: 70%;
  background: radial-gradient(circle, #ff9800 40%, transparent);
  animation-duration: 12s;
`;

const Line = styled(BackgroundElement)`
  width: 300px;
  height: 2px;
  background: linear-gradient(to right, #ff9800, transparent);
  top: 20%;
  left: 30%;
  animation: ${moveLeftRight} 10s infinite alternate ease-in-out;
`;

const Wave = styled(BackgroundElement)`
  width: 400px;
  height: 400px;
  top: 50%;
  left: 5%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M0,100 Q50,0 100,100 T200,100" stroke="%23FF9800" fill="none" stroke-width="4"/></svg>')
    no-repeat center;
  animation: ${floatAnimation} 15s infinite alternate ease-in-out;
`;

const Arc = styled(BackgroundElement)`
  width: 300px;
  height: 300px;
  top: 10%;
  right: 10%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M50,100 Q100,0 150,100" stroke="%23F57C00" fill="none" stroke-width="5"/></svg>')
    no-repeat center;
  animation: ${spinAnimation} 25s linear infinite;
`;

const Sunburst = styled(BackgroundElement)`
  width: 200px;
  height: 200px;
  top: 80%;
  right: 20%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="8" fill="%23FFEB3B" /><line x1="50" y1="50" x2="90" y2="50" stroke="%23FF9800" stroke-width="6" /><line x1="50" y1="50" x2="70" y2="80" stroke="%23FF9800" stroke-width="6" /><line x1="50" y1="50" x2="30" y2="80" stroke="%23FF9800" stroke-width="6" /><line x1="50" y1="50" x2="10" y2="50" stroke="%23FF9800" stroke-width="6" /><line x1="50" y1="50" x2="30" y2="20" stroke="%23FF9800" stroke-width="6" /><line x1="50" y1="50" x2="70" y2="20" stroke="%23FF9800" stroke-width="6" /></svg>')
    no-repeat center;
  animation: ${pulseAnimation} 6s infinite ease-in-out;
`;

const Triangle = styled(BackgroundElement)`
  width: 150px;
  height: 150px;
  top: 40%;
  left: 80%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,10 90,90 10,90" fill="%23FF9800" /></svg>')
    no-repeat center;
  animation: ${floatAnimation} 9s infinite alternate ease-in-out;
`;

const Square = styled(BackgroundElement)`
  width: 120px;
  height: 120px;
  top: 60%;
  left: 20%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23FF9800" /></svg>')
    no-repeat center;
  animation: ${spinAnimation} 15s linear infinite;
`;

// Стили для контента
const Section = styled.div`
  border-radius: 20px;
  padding: 15px;
  background-color: transparent; // Полупрозрачный фон для контента
`;

const SectionHeader = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid;
  color: gray;
`;

const BoardsList = styled.div`
  padding-top: 10px;
`;

const BoardsListItem = styled(StyledLink)`
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background-color: #f1f1f1;
    border-color: #ccc;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:hover button {
    opacity: 1; /* Кнопка появляется при наведении */
  }

  & strong {
    font-size: 1.2rem;
    color: #333;
  }

  & span {
    display: block;
    font-size: 0.9rem;
    color: #777;
    margin-top: 5px;
  }
`;

const DeleteButton = styled(Button)`
  right: 10px;
  border: none;
  padding-bottom: 40px;
  position: absolute;;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0; /* Скрываем кнопку по умолчанию */
  transition: opacity 0.3s ease, background 0.3s ease;

  &:hover {
    background:#d2d1d1;
  }
`;

export default function BoardsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);

  // Получаем доски
  const boards = useSelector(
    (state: { boards: { boards: Board[] } }) => state.boards.boards
  );

  // Получаем текущего пользователя
  const user = useSelector(
    (state: {
      auth: { user: { profile: { id: string; name: string } } | null };
    }) => state.auth.user
  );

  const handleBoardAdd = () => {
    if (!user) return; // Если пользователь не авторизован, ничего не делаем
  
    const boardId = crypto.randomUUID(); // Уникальный ID для доски
  
    // Добавляем доску и текущего пользователя как члена
    dispatch(addBoard({ id: boardId, name: "New board", createdBy: user.profile.name }));
  
    // Добавляем ID доски в boardIds пользователя
    dispatch(joinBoard(boardId)); 
  };
  const confirmDeleteBoard = () => {
    if (boardToDelete) {
      dispatch(removeBoard(boardToDelete)); //
      dispatch(leaveBoard(boardToDelete));
      setIsModalConfirmOpen(false);
    }
  }
  const cancelDeleteBoard = () => {
    setIsModalConfirmOpen(false);
  }

  

  return (
    <MainContainer>
      {/* Фоновые элементы */}
      <Circle />
      <LargeCircle />
      <Line />
      <Wave />
      <Arc />
      <Sunburst />
      <Triangle />
      <Square />

      {/* Контент */}
      <Container className="container">
        <div className="row">
          <Section className="col-12">
            <SectionHeader>
              <h1 className="pb-2">Your boards</h1>
              <Button onClick={handleBoardAdd}>New board</Button>
            </SectionHeader>
            <BoardsList>
              {boards && boards.length > 0 ? (
                boards.map((board) => (
                  <BoardsListItem className="gap-2" key={board.id} to={`/boards/board/${board.id}`}>
                        <div>
                          <h3 style={{fontSize:'20px'}}>{board.name}</h3>
                        </div>
                        <div>
                          <p style={{color:'gray'}}>Created:{" "} {new Date(board.createdAt).toLocaleString()}</p>
                        </div>
                      <DeleteButton onClick={(e) => {e.preventDefault(); e.stopPropagation(); setIsModalConfirmOpen(true); setBoardToDelete(board.id); }}><FaTrash style={{color:'black'}} size={18}/></DeleteButton>
                  </BoardsListItem>
                ))
              ) : (
                <p>No boards yet</p>
              )}
            </BoardsList>
          </Section>
        </div>
      </Container>
      {isModalConfirmOpen && (
        <ModalConfrm onConfirm={confirmDeleteBoard} onCancel={cancelDeleteBoard} />
      )}
    </MainContainer>
  );
}
