import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Board } from "../../05-entities/boardInterfaces";
import { CardParams } from "../../05-entities/cardProps";

export const useBoard = () => {
  const { id } = useParams();
  
  // Получаем доску из Redux store
  const board = useSelector((state: { 
    boards: { boards: Board[] },
    cardCustomization: CardParams 
  }) => {
    const foundBoard = state.boards.boards.find((b) => b.id === id);
    
    // Если нужно, можно добавить параметры кастомизации в объект доски
    return foundBoard ? {
      ...foundBoard,
      cardParams: state.cardCustomization // Добавляем параметры карточек
    } : undefined;
  });
  
  // Инициализация из localStorage при монтировании

  if (!id) throw new Error("Board ID is required");
  if (!board) throw new Error("Board not found");
  
  return board;
};