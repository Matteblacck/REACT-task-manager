import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Интерфейс доски
interface Board {
    id: string;
    name: string;
    members: { id: string; role: string }[];
    createdAt: string;
}

// Состояние для досок
interface BoardsState {
    boards: Board[];
    loading: boolean;
}

const initialState: BoardsState = {
    boards: JSON.parse(localStorage.getItem('boards') || '[]'), // Загружаем доски из localStorage
    loading: false,
};

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        fetchBoardsStart: (state) => {
            state.loading = true;
        },
        fetchBoardsSuccess: (state, action: PayloadAction<Board[]>) => {
            state.boards = action.payload;
            state.loading = false;
            localStorage.setItem('boards', JSON.stringify(action.payload)); // Сохраняем доски
        },
        fetchBoardsFailure: (state) => {
            state.loading = false;
        },
        addBoard: (state, action: PayloadAction<Board>) => {
            state.boards.push(action.payload);
            localStorage.setItem('boards', JSON.stringify(state.boards));
        },
        removeBoard: (state, action: PayloadAction<string>) => {
            state.boards = state.boards.filter(board => board.id !== action.payload);
            localStorage.setItem('boards', JSON.stringify(state.boards));
        },
        updateBoard: (state, action: PayloadAction<Board>) => {
            const index = state.boards.findIndex(board => board.id === action.payload.id);
            if (index !== -1) {
                state.boards[index] = action.payload;
                localStorage.setItem('boards', JSON.stringify(state.boards));
            }
        }
    }
});

export const { 
    fetchBoardsStart, fetchBoardsSuccess, fetchBoardsFailure,
    addBoard, removeBoard, updateBoard 
} = boardsSlice.actions;

export default boardsSlice.reducer;