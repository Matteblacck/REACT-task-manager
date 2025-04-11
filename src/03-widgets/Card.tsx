import styled, { keyframes } from "styled-components";
import Button from "../06-shared/Button";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import ContextMenu from "./ContextMenus/CardContextMenu";
import Input from "../06-shared/Input";
import CardElementModal from "./modals/CardElementModal/CardElementModal";
import { useBoard } from "../04-feature/BOARD-CARD/useBoard";
import { CardProps } from "../05-entities/cardProps";
import { useCardNameEdit } from "../04-feature/BOARD-CARD/card-features/useCardNameEdit";
import { useCardElementModal } from "../04-feature/BOARD-CARD/card-features/useCardElementModal";
import { useCardElementDelete } from "../04-feature/BOARD-CARD/card-features/useCardElementDelete";
import { useCardElementAdd } from "../04-feature/BOARD-CARD/card-features/useCardElementAdd";

const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-x"
    viewBox="0 0 16 16"
  >
    <path d="M8 7.293l3.647-3.646a.5.5 0 1 1 .707.707L8.707 8l3.646 3.647a.5.5 0 0 1-.707.707L8 8.707l-3.647 3.646a.5.5 0 0 1-.707-.707L7.293 8 3.646 4.353a.5.5 0 1 1 .707-.707L8 7.293z" />
  </svg>
);

// Анимация для удаления задачи
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-30%);
  }
`;

const CardColumn = styled.div`
  border: 1px solid #ff9800;
  border-radius: 15px;
  height: fit-content;
  padding: 15px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  background-color: var(--color-bg);
  &:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h2`
  font-size: 18px;
`;

const TasksList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const TaskText = styled.span`
  flex-grow: 1;
  min-width: 0;
  word-break: break-word;
  white-space: normal;
  overflow-wrap: break-word;
  display: flex;
  align-items: center;
`;
interface TasksListItemProps {
    $priority?: string; // Приоритет задачи (например, "high", "medium", "low")
  }
const TasksListItem = styled.li<TasksListItemProps>`
  font-size: 15px;
  background-color: transparent;
  width: 330px;
  border: 1.5px solid ${(props) => {
    switch (props.$priority) {
      case "high":
        return "#E53935";
      case "medium":
        return "#FFB300";
      case "low":
        return "#43A047";
      default:
        return "#d2d1d1";
    }
  }};
  border-radius: 10px;
  margin-bottom: 5px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  word-break: break-word;
  white-space: normal;

  &:hover {
    background-color: var(--color-over);
    box-shadow: 0 0 4px ${(props) => {
      switch (props.$priority) {
        case "high":
          return "#E53935";
        case "medium":
          return "#FFB300";
        case "low":
          return "#43A047";
        default:
          return "#d2d1d1";
      }
    }};
  }

  &.deleting {
    animation: ${fadeOut} 0.5s ease forwards;
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${TasksListItem}:hover & {
    opacity: 1;
  }

  &:hover {
    color: #cc0000;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  font-size: 15px;
  margin-top: 10px;
  border-radius: 10px;

  &:hover {
    background-color: var(--color-over);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  font-size: 16px;
  font-family: inherit;
  color: var(--color-text);
  background-color: transparent;
  border: 1px solid var(--color-minor);
  border-radius: 8px;
  outline: none;
  resize: vertical;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #ff9800;
    box-shadow: 0 0 5px rgba(255, 152, 0, 0.5);
  }

  &:hover {
    border-color: #b3b3b3;
  }

  &::placeholder {
    color: #999;
  }
`;

const TitleInput = styled(Input)`
  border: none;
  background-color: transparent;
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  padding: 0;
`;



export default function Card({ title,id, isAdding, toggleAdding }: CardProps) {
  //getting current board from redux with useBoard
  const board = useBoard()
  const boardId = board.id
  const card = board?.cards?.find((c) => c.id === id);

  //--adding card elements
  const {
    newItem,
    setNewItem,
    handleAdd,
  } = useCardElementAdd({
    board,
    boardId: board.id,
    cardId: id,
    toggleAdding: toggleAdding // Передаем функцию переключения
  })

  //--delete cardElements
  const {
    taskToDelete,
    handleDelete
  } = useCardElementDelete({
    board,
    boardId: board.id,
    cardId: id
  })

  //--cardElementModal
  const { 
    isCardElementModalOpen, 
    selectedTask, 
    handleTaskDoubleClick, 
    handleModalClose, 
    handleModalSave 
  } = useCardElementModal({
    board,
    boardId: board.id,
    cardId: id
  });

  //--editing card name
  const { 
    isCardNameEditing, 
    newCardName, 
    inputRef, 
    handleCardNameEditing, 
    handleCardNameChange, 
    handleCardNameSave 
  } = useCardNameEdit({
    title,
    id,
    boardId: board.id,
    currentCards: board.cards
  });

  return (
    <CardColumn>
      <div className="d-flex align-items-center justify-content-between pb-2">
        <div onClick={handleCardNameEditing}>
          {isCardNameEditing ? (
            <TitleInput
              ref={inputRef}
              onChange={handleCardNameChange}
              onBlur={handleCardNameSave}
              onKeyDown={(e) => e.key === "Enter" && handleCardNameSave()}
              value={newCardName}
            />
          ) : (
            <CardTitle>{title}</CardTitle>
          )}
        </div>
        <div>
          <ContextMenu
            cardId={card?.id || ""}
            onEditName={handleCardNameEditing}
          />
        </div>
      </div>

      <Droppable droppableId={id}>
        {(provided) => (
          <TasksList ref={provided.innerRef} {...provided.droppableProps}>
            {card?.elements.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <TasksListItem
                    $priority={item.priority}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={taskToDelete === item.id ? "deleting" : ""}
                    style={{
                      ...provided.draggableProps.style,
                      userSelect: "none",
                      marginBottom: "5px",
                    }}
                    onDoubleClick={() => handleTaskDoubleClick(item)}
                  >
                    <TaskText>{item.text}</TaskText>
                    <DeleteButton onClick={() => handleDelete(item.id)}>
                      <CrossIcon />
                    </DeleteButton>
                  </TasksListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {card?.elements.length === 0 && (
              <div style={{ color: "transparent", fontSize: "1px" }}>
                placeholder
              </div>
            )}
          </TasksList>
        )}
      </Droppable>

      {isAdding && (
        <TextArea
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter a task"
        />
      )}

      {isAdding ? (
        <div className="row">
          <div className="col-8">
            <StyledButton onClick={handleAdd}>+ Add</StyledButton>
          </div>
          <div className="col-4">
            <StyledButton onClick={() => toggleAdding(id)}>
              Cancel
            </StyledButton>
          </div>
        </div>
      ) : (
        <StyledButton
          onClick={() => {
            toggleAdding(id);
            setNewItem("");
          }}
        >
          + Add new
        </StyledButton>
      )}

      {isCardElementModalOpen && selectedTask && boardId && (
        <CardElementModal
          taskId={selectedTask.id}
          boardId={boardId}
          isOpen={isCardElementModalOpen}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      )}
    </CardColumn>
  );
}

