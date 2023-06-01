import { 
    createSlice, 
    PayloadAction 
  } from "@reduxjs/toolkit"
  import { 
    RootState, 
  } from "../../app/store"
  import { Board, Data } from '../../src/types/data';
  import { sampleBoard } from '../../src/data/sampleData';
  
  export interface KanbanState {
    value: Data
    status: "idle" | "loading" | "failed"
  }
  
  const initialState: KanbanState = {
    value: {
        boards: [
            sampleBoard
        ]
    },
    status: "idle",
  }
  
  export const kanbanSlice = createSlice({
    name: "kanban",
    initialState,
    reducers: {
      addBoard: (state, action: PayloadAction<Board>) => {
        state.value = {
            ...state.value,
            boards: [
                ...state.value.boards,
                action.payload
            ]
        };
      },
      deleteBoard: (state, action: PayloadAction<string>) => {
        state.value = {
            ...state.value,
            boards: [
                ...state.value.boards.filter(board => board.id !== action.payload)
            ]
        };
      },
      updateBoard: (state) => {
        state.value = state.value;
      },
      addTask: (state) => {
        state.value = state.value;
      },
      deleteTask: (state) => {
        state.value = state.value;
      },
      updateTask: (state) => {
        state.value = state.value;
      },
    },
  })
  
  export const { addBoard, deleteBoard, updateBoard, addTask, deleteTask, updateTask } = kanbanSlice.actions
  export const selectKanban = (state: RootState) => state.kanban.value;
  export default kanbanSlice.reducer
  