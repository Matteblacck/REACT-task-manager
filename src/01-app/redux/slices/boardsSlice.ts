import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, Card } from "../../../05-entities/boardInterfaces";

// Интерфейс доски


export const defaultCards: Card[] = [
  { id: "1", name: "To Do", elements: [] },
  { id: "2", name: "In Progress", elements: [] },
  { id: "3", name: "Done", elements: [] },
];



// Состояние для досок
interface BoardsState {
  boards: Board[];
  loading: boolean;
}

const initialState: BoardsState = {
  boards: [], // Не загружаем из localStorage, это будет делать redux-persist
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
    },
    fetchBoardsFailure: (state) => {
      state.loading = false;
    },

    addBoard: (state, action: PayloadAction<{ id: string; name: string; createdBy: string }>) => {
      const newBoard: Board = {
        id: action.payload.id,
        name: action.payload.name,
        members: [{ id: action.payload.createdBy, role: "owner" }],
        createdAt: new Date().toISOString(),
        cards: defaultCards,
      };
    
      state.boards.unshift(newBoard); // Добавляем доску в список
    },
    removeBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter((board) => board.id !== action.payload);
    },
    updateBoard: (state, action: PayloadAction<Board>) => {
      const index = state.boards.findIndex((board) => board.id === action.payload.id);
      if (index !== -1) {
        state.boards[index] = action.payload;
      }
    },

    addMemberToBoard: (
      state,
      action: PayloadAction<{ boardId: string; userId: string; role: string }>
    ) => {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (board && !board.members.some((m) => m.id === action.payload.userId)) {
        board.members.push({ id: action.payload.userId, role: action.payload.role });
      }
    },

    removeMemberFromBoard: (state, action: PayloadAction<{ boardId: string; userId: string }>) => {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (board) {
        board.members = board.members.filter((m) => m.id !== action.payload.userId);
      }
    },

    updateBoardCards: (state, action: PayloadAction<{ boardId: string; cards: Card[] }>) => {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (board) {
        board.cards = action.payload.cards;
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
            task.priority = action.payload.priority;
          }
        }
      }
    },
  },
});

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
  updateTaskPriority,
} = boardsSlice.actions;

export default boardsSlice.reducer;