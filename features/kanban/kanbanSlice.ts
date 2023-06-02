import { 
    createSlice, 
    PayloadAction 
  } from "@reduxjs/toolkit"
  import { 
    RootState, 
  } from "../../app/store"
  import { Board, Column, Data, Task } from '../../src/types/data';
  import { sampleBoard } from '../../src/data/sampleData';
import { generateRandomHex } from "../../src/utils/generateRandomHex";
  
  export interface KanbanState {
    value: Data
    status: "idle" | "loading" | "failed"
  }

  export interface ColumnUpdateValue {
    name: string;
    id: string;
  }

  export interface BoardUpdateValue {
    name?: string,
    columns?: ColumnUpdateValue[]
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

  function getColumnIndexWithId(id: string, columns: Column[]) {
    return columns.findIndex(column => column.id === id);
  }

  function getTaskIndexWithId(id: string, tasks: Task[]): number {
    return tasks.findIndex(task => task.id === id);
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
      updateBoard: (state, action: PayloadAction<{boardId: string, updatedBoard: BoardUpdateValue}>) => {
        const newValue = {...state.value};
        console.log('newValue.boards[0].columns', JSON.stringify(newValue.boards[0].columns))
        const [boardToUpdate] = getBoardsWithId(action.payload.boardId, newValue.boards);
        if(!boardToUpdate) return;
        if(action.payload.updatedBoard.name) {
          boardToUpdate.name = action.payload.updatedBoard.name;
        }
        if(action.payload.updatedBoard.columns) {
          console.log('action.payload.updatedBoard.columns', action.payload.updatedBoard.columns)
          const previousColumnIds = boardToUpdate.columns.map(column => column.id);
          console.log('previousColumnIds', previousColumnIds)
          const updatedColumnIds = action.payload.updatedBoard.columns?.map(column => column.id);
          console.log('updatedColumnIds', updatedColumnIds)
          const matchingColumnIds = previousColumnIds.filter(cid => updatedColumnIds.includes(cid));
          console.log('matchingColumnIds', matchingColumnIds)
          const newColumns = action.payload.updatedBoard.columns?.filter(column => !previousColumnIds.includes(column.id));
          console.log('newColumns', newColumns)
          if(previousColumnIds !== matchingColumnIds) {
            boardToUpdate.columns = boardToUpdate.columns.filter(column => matchingColumnIds.includes(column.id));
            newColumns.map(column => {
              boardToUpdate.columns = boardToUpdate.columns.concat({
                name: column.name,
                id: column.id,
                tasks: [],
                color: generateRandomHex()
              })
            });
          }
        }
        state.value = newValue;
      },
      addColumn: (state, action: PayloadAction<{boardId: string, column: Column}>) => {
        const newValue = {...state.value};
        const [boardToUpdate] = getBoardsWithId(action.payload.boardId, newValue.boards);
        if(!boardToUpdate) return;
        boardToUpdate.columns = boardToUpdate.columns.concat(action.payload.column);
        state.value = newValue;
      },
      deleteColumn: (state, action: PayloadAction<{boardId: string, columnId: string}>) => {
        const newValue = {...state.value};
        const [boardToUpdate] = getBoardsWithId(action.payload.boardId, newValue.boards);
        if(!boardToUpdate) return;
        boardToUpdate.columns = boardToUpdate.columns.filter(column => column.id !== action.payload.columnId);
        state.value = newValue;
      },
      updateColumn: (state, action: PayloadAction<{boardId: string, columnId: string, updatedColumn: Column}>) => {
        const newValue = {...state.value};
        console.log(action.payload)
        const [boardToUpdate] = getBoardsWithId(action.payload.boardId, newValue.boards);
        if(!boardToUpdate) return;
        const columnIndex = getColumnIndexWithId(action.payload.columnId, boardToUpdate.columns);
        if(columnIndex === -1) return;
        boardToUpdate.columns[columnIndex] = action.payload.updatedColumn;
        state.value = newValue;
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
      updateTask: (state, action: PayloadAction<{boardId: string, columnId: string, taskId: string, updatedTask: Task}>) => {
        const newValue = {...state.value};
        const [boardToUpdate] = getBoardsWithId(action.payload.boardId, newValue.boards);
        if(!boardToUpdate) return;
        const [columnToUpdate] = getColumnsWithId(action.payload.columnId, boardToUpdate.columns);
        if(!columnToUpdate) return;
        const taskIndex = getTaskIndexWithId(action.payload.taskId, columnToUpdate.tasks);
        if(taskIndex === -1) return;
        columnToUpdate.tasks[taskIndex] = action.payload.updatedTask;
        state.value = newValue;
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
  
  export const { addBoard, deleteBoard, updateBoard, addTask, deleteTask, updateTask, addColumn, updateColumn, deleteColumn } = kanbanSlice.actions
  export const selectKanban = (state: RootState) => state.kanban.value;
  export default kanbanSlice.reducer
  