import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../../01-app/redux/store';
import { updateBoardCards } from '../../../01-app/redux/slices/boardsSlice';
import { Card } from "../../../05-entities/boardInterfaces";

interface UseCardNameEditParams {
  title: string;
  id: string;
  boardId: string;
  currentCards: Card[];
}

export const useCardNameEdit = ({ title, id, boardId, currentCards }: UseCardNameEditParams) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isCardNameEditing, setIsCardNameEditing] = useState(false);
  const [newCardName, setNewCardName] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCardNameEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCardNameEditing]);

  const handleCardNameEditing = () => {
    setNewCardName(title);
    setIsCardNameEditing(true);
  };

  const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardName(e.target.value);
  };

  const handleCardNameSave = () => {
    if (newCardName.trim() === title) {
      setIsCardNameEditing(false);
      return;
    }

    const updatedCards = currentCards.map((c) =>
      c.id === id ? { ...c, name: newCardName.trim() } : c
    );

    dispatch(updateBoardCards({ boardId, cards: updatedCards }));
    setIsCardNameEditing(false);
  };

  return {
    isCardNameEditing,
    newCardName,
    inputRef,
    handleCardNameEditing,
    handleCardNameChange,
    handleCardNameSave,
  };
};