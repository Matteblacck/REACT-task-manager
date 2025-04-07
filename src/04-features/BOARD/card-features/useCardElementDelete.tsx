import { useState } from "react";
import { updateBoardCards } from "../../../01-app/redux/slices/boardsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../../01-app/redux/store';
import { Board } from "../../../05-entities/boardInterfaces";

interface UseCardElementDeletePropsDelete{
    cardId: string
    board: Board;
    boardId: string;
}

export const useCardElementDelete = ({cardId, board, boardId}: UseCardElementDeletePropsDelete) => {
    const dispatch = useDispatch<AppDispatch>()
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const handleDelete = (taskId: string) => {
    if (!board || !boardId) return;

    setTaskToDelete(taskId);

    setTimeout(() => {
      const updatedCards = board.cards.map((c) =>
        c.id === cardId // ← Исправлено
          ? { ...c, elements: c.elements.filter((item) => item.id !== taskId) }
          : c
      );

      dispatch(updateBoardCards({ boardId, cards: updatedCards }));

      setTaskToDelete(null);
    }, 500);
  };

  return{
    taskToDelete,
    handleDelete
  }
}