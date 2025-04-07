import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBoard } from '../../01-app/redux/slices/boardsSlice';
import { AppDispatch } from '../../01-app/redux/store';
import { Board } from "../../05-entities/boardInterfaces";

export const useBoardNameEdit = (initialName: string, board: Board) => {
    const [newName, setNewName] = useState(initialName);
    const [isNameEditing, setIsNameEditing] = useState(false);
    const dispatch = useDispatch<AppDispatch>()

    const handleDoubleClick = () => {
        setNewName(board.name)
        setIsNameEditing(true)
    };

    const handleBlur = () => {
        const updatedName = newName.trim() || "New board"; // Если пустое — заменяем
        setNewName(updatedName);
      
        if (updatedName !== board.name) {
          dispatch(updateBoard({ ...board, name: updatedName }));
        }
      
        setIsNameEditing(false);
      };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
      };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          handleBlur();
        }
      };

      return {
        newName,
        isNameEditing,
        handleDoubleClick,
        handleBlur,
        handleInputChange,
        handleKeyDown,
      };

}