import { useDispatch } from "react-redux";
import { AppDispatch } from '../../../01-app/redux/store';
import { useState } from "react";
import { updateBoardCards } from "../../../01-app/redux/slices/boardsSlice";
import { Board } from "../../../05-entities/boardInterfaces";

interface UseCardElementAddProps {
  board: Board;
  cardId: string;
  boardId: string;
  toggleAdding: (cardId: string) => void;
}

export const useCardElementAdd = ({ board, boardId, cardId, toggleAdding }: UseCardElementAddProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newItem, setNewItem] = useState("");

  const handleAdd = () => {
    if (!newItem.trim() || !board || !boardId) return;

    const newElement = {
      id: Date.now().toString(36),
      text: newItem,
    };

    const updatedCards = board.cards.map((c) =>
      c.id === cardId
        ? { 
            ...c, 
            elements: [...(c.elements || []), newElement] // Добавил проверку на существование elements
          }
        : c
    );

    dispatch(updateBoardCards({ boardId, cards: updatedCards }));
    setNewItem("");
    toggleAdding(cardId); // Вызываем callback после добавления
  };

  return {
    newItem,
    setNewItem,
    handleAdd,
  };
};