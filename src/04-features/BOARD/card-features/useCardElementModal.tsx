import { useState } from "react";
import { updateBoardCards } from "../../../01-app/redux/slices/boardsSlice";
import { Board } from "../../../05-entities/boardInterfaces";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../../01-app/redux/store';

interface Task {
  id: string;
  text: string;
  description?: string;
}

interface UseCardElementModalProps {
  board: Board;
  boardId: string;
  cardId: string; // Переименовал id в cardId для ясности
}

export const useCardElementModal = ({ board, boardId, cardId }: UseCardElementModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isCardElementModalOpen, setIsCardElementModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskDoubleClick = (task: Task) => {
    setSelectedTask(task);
    setIsCardElementModalOpen(true);
  };

  const handleModalClose = () => {
    setIsCardElementModalOpen(false);
    setSelectedTask(null);
  };

  const handleModalSave = (taskId: string, newDescription: string) => {
    if (!board || !boardId || !selectedTask) return;

    const updatedCards = board.cards.map((c) =>
      c.id === cardId
        ? {
            ...c,
            elements: c.elements.map((item) =>
              item.id === taskId
                ? { ...item, description: newDescription }
                : item
            ),
          }
        : c
    );

    dispatch(updateBoardCards({ boardId, cards: updatedCards }));
    handleModalClose();
  };

  return {
    isCardElementModalOpen,
    selectedTask,
    handleTaskDoubleClick,
    handleModalClose,
    handleModalSave,
  };
};