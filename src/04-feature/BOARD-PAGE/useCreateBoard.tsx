import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../../01-app/redux/store';
import { addBoard } from "../../01-app/redux/slices/boardsSlice";
import { joinBoard } from "../../01-app/redux/slices/userSlice";

interface CreateBoardProps {
  boardName: string
  selectedTags: string[]
}
export const useCreateBoard = ({boardName, selectedTags}: CreateBoardProps) => {
    const dispatch = useDispatch<AppDispatch>()
    // Получаем текущего пользователя
  const user = useSelector(
    (state: {
      auth: { user: { profile: { id: string; name: string } } | null };
    }) => state.auth.user
  );
    //--add
    const handleBoardCreate = () => {
        if (!user) return; // Если пользователь не авторизован, ничего не делаем
    
        const boardId = crypto.randomUUID(); // Уникальный ID для доски
    
        // Добавляем доску и текущего пользователя как члена
        dispatch(addBoard({ id: boardId, name: boardName, tags: selectedTags, createdBy: user.profile.name }));
    
        // Добавляем ID доски в boardIds пользователя
        dispatch(joinBoard(boardId)); 
    };
    return{
      handleBoardCreate
    }
}