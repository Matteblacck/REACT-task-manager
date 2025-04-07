import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateBoardCards } from '../../01-app/redux/slices/boardsSlice';
import { AppDispatch } from '../../01-app/redux/store';
import { CardElement } from "../../05-entities/boardInterfaces";


interface UseAddCardParams {
  boardId: string;
  currentCards: Array<{ id: string; name: string; elements: CardElement[] }>;
}

export const useAddCard = ({ boardId, currentCards }: UseAddCardParams) => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(() => {

    const newId = Date.now().toString();
    const newCard = {
      id: newId,      // Уникальный ID
      name: "New board", // Имя всегда "New board"
      elements: [],
    };

    dispatch(updateBoardCards({ 
      boardId, 
      cards: [...currentCards, newCard] 
    }));
  }, [boardId, currentCards, dispatch]);
};