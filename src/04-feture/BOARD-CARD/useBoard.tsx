// features/board/hooks/useBoard.ts
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Board } from "../../05-entities/boardInterfaces";


export const useBoard = () => {
  const { id } = useParams();
  const board = useSelector((state: { boards: { boards: Board[] } }) =>
    state.boards.boards.find((b) => b.id === id)
  );
  
  if (!id) throw new Error("Board ID is required");
  if (!board) throw new Error("Board not found");
  
  return board;
};