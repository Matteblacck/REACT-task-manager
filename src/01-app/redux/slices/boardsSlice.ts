import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Интерфейс доски
export interface CardElement {
  id: string;
  text: string;
  description?:string;
  priority?: string;
}
export interface Card {
  id:string;
  name: string;
  elements: CardElement[]; // или `Task[]`, если нужны более сложные задачи
}
export const defaultCards: Card[] = [
  { id: '1',name: "To Do", elements: [] },
  { id:'2', name: "In Progress", elements: [] },
  { id:'3', name: "Done", elements: [] }
];
export interface Board {
  id: string;
  name: string;
  members: { id: string; role: string }[];
  createdAt: string;
  cards: Card[];
}



// Состояние для досок
interface BoardsState {
  boards: Board[];
  loading: boolean;
}

const initialState: BoardsState = {
  boards: JSON.parse(localStorage.getItem("boards") || "[]"), // Загружаем доски из localStorage
  loading: false,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    fetchBoardsStart: (state) => {
      state.loading = true;
    },
    fetchBoardsSuccess: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
      state.loading = false;
      localStorage.setItem("boards", JSON.stringify(action.payload)); // Сохраняем доски
    },
    fetchBoardsFailure: (state) => {
      state.loading = false;
    },
    
    addBoard: (state, action: PayloadAction<{ id: string; name: string; createdBy: string }>) => {
      const newBoard: Board = {
        id: action.payload.id,
        name: action.payload.name,
        members: [{ id: action.payload.createdBy, role: "owner" }], // Добавляем создателя как владельца
        createdAt: new Date().toISOString(),
        cards: defaultCards,
      };
    
      state.boards.unshift(newBoard); // Добавляем доску в список
      localStorage.setItem("boards", JSON.stringify(state.boards)); // Сохраняем обновленный список досок
    },
    removeBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter((board) => board.id !== action.payload);
      localStorage.setItem("boards", JSON.stringify(state.boards));
    },
    updateBoard: (state, action: PayloadAction<Board>) => {
      const index = state.boards.findIndex((board) => board.id === action.payload.id);
      if (index !== -1) {
        state.boards[index] = action.payload;
        localStorage.setItem("boards", JSON.stringify(state.boards));
      }
    },

    // Добавление пользователя в доску
    addMemberToBoard: (
      state,
      action: PayloadAction<{ boardId: string; userId: string; role: string }>
    ) => {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (board && !board.members.some((m) => m.id === action.payload.userId)) {
        board.members.push({ id: action.payload.userId, role: action.payload.role });
        localStorage.setItem("boards", JSON.stringify(state.boards));
      }
    },

    // Удаление пользователя из доски
    removeMemberFromBoard: (state, action: PayloadAction<{ boardId: string; userId: string }>) => {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (board) {
        board.members = board.members.filter((m) => m.id !== action.payload.userId);
        localStorage.setItem("boards", JSON.stringify(state.boards));
      }
    },

    updateBoardCards: (state, action: PayloadAction<{ boardId: string; cards: Card[] }>) => {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (board) {
        board.cards = action.payload.cards;
        localStorage.setItem("boards", JSON.stringify(state.boards));
      }
    },
    updateTaskPriority: (
      state,
      action: PayloadAction<{ boardId: string; taskId: string; priority: string }>
    ) => {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (board) {
        const card = board.cards.find((c) =>
          c.elements.some((el) => el.id === action.payload.taskId)
        );
        if (card) {
          const task = card.elements.find((el) => el.id === action.payload.taskId);
          if (task) {
            task.priority = action.payload.priority; // Обновляем приоритет
            localStorage.setItem("boards", JSON.stringify(state.boards)); // Сохраняем в localStorage
          }
        }
      }
    }
  
}});

export const {
  fetchBoardsStart,
  fetchBoardsSuccess,
  fetchBoardsFailure,
  addBoard,
  removeBoard,
  updateBoard,
  addMemberToBoard,
  removeMemberFromBoard,
  updateBoardCards,
  updateTaskPriority
} = boardsSlice.actions;

export default boardsSlice.reducer;