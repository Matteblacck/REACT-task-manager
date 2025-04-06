import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateBoardCards } from '../../01-app/redux/slices/boardsSlice';
import { AppDispatch } from '../../01-app/redux/store';
import { CardElement } from "../../01-app/redux/slices/boardsSlice";

interface UseAddCardParams {
  boardId: string;
  currentCards: Array<{ id: string; name: string; elements: CardElement[] }>;
}

export const useAddCard = ({ boardId, currentCards }: UseAddCardParams) => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(() => {
    // Генерируем уникальный ID для новой карточки
    const generateUniqueId = () => {
      let newId = Date.now().toString();
      
      // Проверяем, что ID уникален
      while (currentCards.some(card => card.id === newId)) {
        newId = (parseInt(newId) + 1).toString(); // Генерация нового ID на основе текущего
      }
      
      return newId;
    };

    const newId = generateUniqueId();
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