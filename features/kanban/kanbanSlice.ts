import { 
    createSlice, 
    PayloadAction 
  } from "@reduxjs/toolkit"
  import { 
    RootState, 
  } from "../../app/store"
  import { Board, Data, Task } from '../../src/types/data';
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
      // todo
      updateBoard: (state) => {
        state.value = state.value;
      },
      addTask: (state, action: PayloadAction<{boardId: string, columnId: string, task: Task}>) => {
        const newValue = {...state.value};
        const [boardToUpdate] = newValue.boards.filter(board => board.id === action.payload.boardId);
        if(!boardToUpdate) return;
        const [columnToUpdate] = boardToUpdate.columns.filter(column => column.id === action.payload.columnId)
        if(!columnToUpdate) return;
        columnToUpdate.tasks = columnToUpdate.tasks.concat(action.payload.task);
        state.value = newValue;
      },
      deleteTask: (state, action: PayloadAction<{boardId: string, columnId: string, taskId: string}>) => {
        const newValue = {...state.value};
        const [boardToUpdate] = newValue.boards.filter(board => board.id === action.payload.boardId);
        if(!boardToUpdate) return;
        const [columnToUpdate] = boardToUpdate.columns.filter(column => column.id === action.payload.columnId)
        if(!columnToUpdate) return;
        columnToUpdate.tasks = columnToUpdate.tasks.filter(task => task.id !== action.payload.taskId);
        state.value = newValue;
      },
      // todo
      updateTask: (state) => {
        state.value = state.value;
      },
    },
  })
  
  export const { addBoard, deleteBoard, updateBoard, addTask, deleteTask, updateTask } = kanbanSlice.actions
  export const selectKanban = (state: RootState) => state.kanban.value;
  export default kanbanSlice.reducer
  