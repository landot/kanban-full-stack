import { 
    createSlice, 
    PayloadAction 
  } from "@reduxjs/toolkit"
  import { 
    RootState, 
  } from "../../app/store"
  import { Board, Column, Data, Task } from '../../src/types/data';
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
  
  function getBoardsWithId(id: string, boards: Board[]): Board[] {
    return boards.filter(board => board.id === id);
  }

  function getColumnsWithId(id: string, columns: Column[]): Column[] {
    return columns.filter(columns => columns.id === id);
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
        const [boardToUpdate] = getBoardsWithId(action.payload.boardId, newValue.boards);
        if(!boardToUpdate) return;
        const [columnToUpdate] = getColumnsWithId(action.payload.columnId, boardToUpdate.columns);
        if(!columnToUpdate) return;
        columnToUpdate.tasks = columnToUpdate.tasks.concat(action.payload.task);
        state.value = newValue;
      },
      deleteTask: (state, action: PayloadAction<{boardId: string, columnId: string, taskId: string}>) => {
        const newValue = {...state.value};
        const [boardToUpdate] = getBoardsWithId(action.payload.boardId, newValue.boards);
        if(!boardToUpdate) return;
        const [columnToUpdate] = getColumnsWithId(action.payload.columnId, boardToUpdate.columns);
        if(!columnToUpdate) return;
        columnToUpdate.tasks = columnToUpdate.tasks.filter(task => task.id !== action.payload.taskId);
        state.value = newValue;
      },
      // todo
      updateTask: (state) => {
        state.value = state.value;
      },
      // todo unless this isn't needed
      updateSubtask: (state) => {
        state.value = state.value;
      },
      // todo unless this isn't needed
      updateTaskStatus: (state) => {
        state.value = state.value;
      }
    },
  })
  
  export const { addBoard, deleteBoard, updateBoard, addTask, deleteTask, updateTask } = kanbanSlice.actions
  export const selectKanban = (state: RootState) => state.kanban.value;
  export default kanbanSlice.reducer
  