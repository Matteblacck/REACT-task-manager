import Button from "../../06-shared/Button";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Board,
  updateBoard,
  updateBoardCards,
} from "../../01-app/redux/slices/boardsSlice";
import Card from "./Card";
import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { AppDispatch } from "../../01-app/redux/store";
import Input from "../../06-shared/Input";

// Анимации для фона
const floatAnimation = keyframes`
  0% { transform: translateY(0) translateX(0) rotate(0deg); }
  50% { transform: translateY(-20px) translateX(20px) rotate(5deg); }
  100% { transform: translateY(0) translateX(0) rotate(0deg); }
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

// Стили для фоновых элементов
const BackgroundElement = styled.div`
  position: absolute;
  z-index: 0;
  opacity: 0.6; // Увеличим прозрачность для яркости
  pointer-events: none;
`;

const Circle = styled(BackgroundElement)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 152, 0, 0.6) 30%, transparent);
  top: 10%;
  left: 5%;
  animation: ${floatAnimation} 10s infinite alternate ease-in-out;
`;

const LargeCircle = styled(Circle)`
  width: 400px;
  height: 400px;
  top: 60%;
  left: 80%;
  background: radial-gradient(circle, rgba(255, 152, 0, 0.5) 40%, transparent);
  animation-duration: 15s;
`;

const Wave = styled(BackgroundElement)`
  width: 500px;
  height: 500px;
  top: 70%;
  left: 10%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M0,100 Q50,0 100,100 T200,100" stroke="rgba(255, 152, 0, 0.6)" fill="none" stroke-width="4"/></svg>')
    no-repeat center;
  animation: ${floatAnimation} 12s infinite alternate ease-in-out;
`;

const Arc = styled(BackgroundElement)`
  width: 600px;
  height: 600px;
  top: 50%;
  right: 5%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M50,100 Q100,0 150,100" stroke="rgba(245, 124, 0, 0.6)" fill="none" stroke-width="5"/></svg>')
    no-repeat center;
  animation: ${spinAnimation} 20s linear infinite;
`;

const Sunburst = styled(BackgroundElement)`
  width: 300px;
  height: 300px;
  top: 20%;
  right: 10%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="8" fill="%23FFEB3B" /><line x1="50" y1="50" x2="90" y2="50" stroke="%23FF9800" stroke-width="6" /><line x1="50" y1="50" x2="70" y2="80" stroke="%23FF9800" stroke-width="6" /><line x1="50" y1="50" x2="30" y2="80" stroke="%23FF9800" stroke-width="6" /><line x1="50" y1="50" x2="10" y2="50" stroke="%23FF9800" stroke-width="6" /><line x1="50" y1="50" x2="30" y2="20" stroke="%23FF9800" stroke-width="6" /><line x1="50" y1="50" x2="70" y2="20" stroke="%23FF9800" stroke-width="6" /></svg>')
    no-repeat center;
  animation: ${pulseAnimation} 5s infinite ease-in-out;
`;

const Triangle = styled(BackgroundElement)`
  width: 200px;
  height: 200px;
  top: 80%;
  left: 20%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,10 90,90 10,90" fill="rgba(255, 152, 0, 0.6)" /></svg>')
    no-repeat center;
  animation: ${floatAnimation} 8s infinite alternate ease-in-out;
`;

// Стили для контейнера
const Container = styled.div`
  padding: 5px 40px 20px 40px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #f5f5f5; // Светлый фон для контраста
`;

// Контейнер с горизонтальным скроллом
const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-top: 10px;
  max-width: 100%;
  flex-grow: 1;
  height: 0;
  position: relative;
  z-index: 1;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #d2d1d1;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9); // Полупрозрачный фон для тулбара
  backdrop-filter: blur(5px); // Размытие для эффекта стекла
`;

const StyledButton = styled(Button)`
  &:hover {
    background-color: #d2d1d1;
  }
`;

const TitleInput = styled(Input)`
  border: none;
  background-color: transparent;
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  padding: 0;
`;

export default function BoardPage() {
  //redux, params
  const { id } = useParams();
  const board = useSelector((state: { boards: { boards: Board[] } }) =>
    state.boards.boards.find((b) => b.id === id)
  );
  const [newTitle, setNewTitle] = useState(board?.name || "");
  const [isTitleEditing, setTitleEditing] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const [addingColumns, setAddingColumns] = useState<{
    [key: string]: boolean;
  }>({});

  if (!board) {
    return <div>Board not found</div>;
  }

  const allCards = [...board.cards];

  board.cards.forEach((card) => {
    const existingCardIndex = allCards.findIndex((c) => c.name === card.name);
    if (existingCardIndex !== -1) {
      allCards[existingCardIndex] = {
        ...allCards[existingCardIndex],
        elements: [...card.elements],
      };
    } else {
      allCards.push({ ...card, elements: [...card.elements] });
    }
  });

  const toggleAdding = (column: string) => {
    setAddingColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;
  
    if (type === "COLUMN") {
      const updatedCards = [...board.cards];
      const [movedColumn] = updatedCards.splice(source.index, 1);
      updatedCards.splice(destination.index, 0, movedColumn);
      dispatch(updateBoardCards({ boardId: board.id, cards: updatedCards }));
      return;
    }
  
    const sourceColumnIndex = board.cards.findIndex(
      (c) => c.name === source.droppableId
    );
    const destinationColumnIndex = board.cards.findIndex(
      (c) => c.name === destination.droppableId
    );
  
    if (sourceColumnIndex === -1 || destinationColumnIndex === -1) return;
  
    const updatedCards = board.cards.map((card) => ({
      ...card,
      elements: [...card.elements],
    }));
  
    if (sourceColumnIndex === destinationColumnIndex) {
      const updatedElements = [...updatedCards[sourceColumnIndex].elements];
      const [movedItem] = updatedElements.splice(source.index, 1);
      updatedElements.splice(destination.index, 0, movedItem);
      updatedCards[sourceColumnIndex] = {
        ...updatedCards[sourceColumnIndex],
        elements: updatedElements,
      };
    } else {
      const sourceElements = [...updatedCards[sourceColumnIndex].elements];
      const destinationElements = [
        ...updatedCards[destinationColumnIndex].elements,
      ];
  
      const [movedItem] = sourceElements.splice(source.index, 1);
      destinationElements.splice(destination.index, 0, movedItem);
  
      updatedCards[sourceColumnIndex] = {
        ...updatedCards[sourceColumnIndex],
        elements: sourceElements,
      };
      updatedCards[destinationColumnIndex] = {
        ...updatedCards[destinationColumnIndex],
        elements: destinationElements,
      };
    }
  
    dispatch(updateBoardCards({ boardId: board.id, cards: updatedCards }));
  };
  const handleDoubleClick = () => {
    setNewTitle(board.name);
    setTitleEditing(true);
  };

  const handleBlur = () => {
    const updatedTitle = newTitle.trim() || "New board"; // Если пустое — заменяем
    setNewTitle(updatedTitle);
  
    if (updatedTitle !== board.name) {
      dispatch(updateBoard({ ...board, name: updatedTitle }));
    }
  
    setTitleEditing(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const handleAddCard = () => {
      const newId = Date.now().toString(); // Convert to string for compatibility
      const newColumn = {
        id: newId,
        name: `New card`,
        elements: [],
      };

      const updatedCards = [...board.cards, newColumn];
      dispatch(updateBoardCards({ boardId: board.id, cards: updatedCards }));
    };

  return (
    <Container>
      {/* Анимированные фоновые элементы */}
      <Circle />
      <LargeCircle />
      <Wave />
      <Arc />
      <Sunburst />
      <Triangle />

      <Toolbar>
        {isTitleEditing ? (
          <TitleInput
            value={newTitle}
            autoFocus
            onBlur={handleBlur}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <h1 style={{fontSize:'1.3rem'}} onDoubleClick={handleDoubleClick}>{board.name}</h1>
        )}

        <StyledButton
          style={{ border: "1px solid #ff9800" }}
          onClick={handleAddCard}
        >
          Add new card
        </StyledButton>
      </Toolbar>

      {/* Контейнер с горизонтальным скроллом */}
      <ScrollContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="COLUMN">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ display: "flex", flexWrap: "nowrap", gap: "10px" }}
              >
                {allCards.map((card, index) => (
                  <Draggable
                    key={card.id}
                    draggableId={card.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          minWidth: "350px",
                          borderRadius: "8px",
                          padding: "10px",
                          height: "fit-content",
                        }}
                      >
                        <Card
                          title={card.name}
                          isAdding={!!addingColumns[card.name]}
                          toggleAdding={toggleAdding}
                        />
                        
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ScrollContainer>
    </Container>
  );
}
