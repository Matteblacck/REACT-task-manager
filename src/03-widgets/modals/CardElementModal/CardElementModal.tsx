import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../../06-shared/Button";
import { useSelector } from "react-redux";
import { Board } from "../../../01-app/redux/slices/boardsSlice";
import { FaStickyNote } from "react-icons/fa";
import PrioritySelector from "./components/PrioritySelector";

// Стили
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: rgba(0, 0, 0, 0.1); */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  text-align: center;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px;
  font-size: 16px;
  font-family: inherit;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-bottom: 15px;
  resize: none;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #ff9800;
    box-shadow: 0 0 8px rgba(255, 152, 0, 0.3);
  }

  &::placeholder {
    color: #999;
  }
`;

const ModalActions = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin: 0 auto;
`;

const StyledButton = styled(Button)`
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CancelButton = styled(StyledButton)`

 
`;

const SaveButton = styled(StyledButton)`
background-color: transparent;
  &:hover{
    background-color: #ff9800;
    color:white;
    border:none
  }
  
`;

const TaskTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const CardName = styled.h5`
  font-size: 16px;
  font-weight: 500;
  color: #666;
  margin: 0;
`;

const DescriptionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 1rem;
`;

// Интерфейс пропсов
interface ModalProps {
  taskId: string;
  boardId: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskId: string, newDescription: string) => void;
}

// Компонент
const CardElementModal: React.FC<ModalProps> = ({
  taskId,
  boardId,
  isOpen,
  onClose,
  onSave,
}) => {
  const [newDescription, setNewDescription] = useState("");

  const board = useSelector((state: { boards: { boards: Board[] } }) =>
    state.boards.boards.find((b) => b.id === boardId)
  );
  const card = board?.cards.find((c) =>
    c.elements.some((el) => el.id === taskId)
  );

  const task = board?.cards
    .flatMap((card) => card.elements)
    .find((task) => task.id === taskId);

  useEffect(() => {
    if (task) {
      setNewDescription(task.description || "");
    }
  }, [task, isOpen]);

  const handleSave = () => {
    onSave(taskId, newDescription);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <div className="pb-2 text-start">
          <div className="pb-1">
            <TaskTitle>{task?.text || ""}</TaskTitle>
          </div>

          <div className="d-flex gap-1">
            <CardName>in card:</CardName>
            <CardName>{card?.name || ""}</CardName>
          </div>
        </div>

        <div className="pb-2">
          <PrioritySelector taskId={taskId} boardId={boardId} currentPriority={task?.priority} />
        </div>

        <div>
          <DescriptionHeader>
            <FaStickyNote />
            <h4>Description:</h4>
          </DescriptionHeader>
          <Textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Enter additional details"
          />
        </div>

        <ModalActions>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CardElementModal;