import { 
  createAsyncThunk,
  createSlice, 
  PayloadAction 
  } from "@reduxjs/toolkit"
  import { 
    RootState, 
  } from "../../../app/store"
  import { Board, Column, Data, Task } from '../../types/data';
import { getBoardsWithId, getColumnsWithName, getColumnsWithId } from "../../utils/filterUtils";
import { getColumnIndexWithId, getTaskIndexWithId } from "../../utils/findIndexUtils";
import { generateRandomHex } from "../../utils/generateRandomHex";
import { getKanban } from "../../utils/firebase/getKanban";
import { updateKanban } from "../../utils/firebase/updateKanban";
import sampleData from '../../../data.json';


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
      boards: []
    },
    status: "loading",
  }

  export const fetchUserById = createAsyncThunk(
    'kanban/fetchKanbanData',
    async () => {
      const response = await getKanban();
      return response;
    }
  )
  
  export const kanbanSlice = createSlice({
    name: "kanban",
    initialState,
    reducers: {
      addDummyData: (state) => {
        state.value = sampleData;
        updateKanban(sampleData);
      },
      addBoard: (state, action: PayloadAction<Board>) => {
        const newValue = {
            ...state.value,
            boards: [
                ...state.value.boards,
                action.payload
            ]
        };
        state.value = newValue;
        updateKanban(newValue);
      },
      deleteBoard: (state, action: PayloadAction<string>) => {
        const newValue = {
            ...state.value,
            boards: [
                ...state.value.boards.filter(board => board.id !== action.payload)
            ]
        };
        state.value = newValue;
        updateKanban(newValue);
      },
      updateBoard: (state, action: PayloadAction<{boardId: string, updatedBoard: BoardUpdateValue}>) => {
        const newValue = {...state.value};
        const [boardToUpdate] = getBoardsWithId(action.payload.boardId, newValue.boards);
        if(!boardToUpdate) return;

        // if board name is updated
        if(action.payload.updatedBoard.name) {
          boardToUpdate.name = action.payload.updatedBoard.name;
        }

        // if columns are updated
        if(action.payload.updatedBoard.columns) {
          const previousColumnIds = boardToUpdate.columns.map(column => column.id);
          const updatedColumnIds = action.payload.updatedBoard.columns?.map(column => column.id);
          const matchingColumnIds = previousColumnIds.filter(cid => updatedColumnIds.includes(cid));
          const newColumns = action.payload.updatedBoard.columns?.filter(column => !previousColumnIds.includes(column.id));
          const previousColumnNames = boardToUpdate.columns.map(column => column.name);
          const updatedColumnNames = action.payload.updatedBoard.columns?.map(column => column.name);
          // if there are new columns
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
          if(previousColumnNames !== updatedColumnNames) {
            // update name if the ids match
            boardToUpdate.columns.map(column => {
              const matchingColumns = action.payload.updatedBoard.columns && action.payload.updatedBoard.columns.filter(c => c.id === column.id);
              if(matchingColumns && matchingColumns.length > 0 && matchingColumns[0].name !== column.name) {
                column.name = matchingColumns[0].name;
              }
            })
          }
        }
        state.value = newValue;
        updateKanban(newValue);
      },
      addColumn: (state, action: PayloadAction<{boardId: string, column: Column}>) => {
        const newValue = {...state.value};
        const [boardToUpdate] = getBoardsWithId(action.payload.boardId, newValue.boards);
        if(!boardToUpdate) return;
        boardToUpdate.columns = boardToUpdate.columns.concat(action.payload.column);
        state.value = newValue;
        updateKanban(newValue);
      },
      deleteColumn: (state, action: PayloadAction<{boardId: string, columnId: string}>) => {
        const newValue = {...state.value};
        const [boardToUpdate] = getBoardsWithId(action.payload.boardId, newValue.boards);
        if(!boardToUpdate) return;
        boardToUpdate.columns = boardToUpdate.columns.filter(column => column.id !== action.payload.columnId);
        state.value = newValue;
        updateKanban(newValue);
      },
      updateColumn: (state, action: PayloadAction<{boardId: string, columnId: string, updatedColumn: Column}>) => {
        const newValue = {...state.value};
        const [boardToUpdate] = getBoardsWithId(action.payload.boardId, newValue.boards);
        if(!boardToUpdate) return;
        const columnIndex = getColumnIndexWithId(action.payload.columnId, boardToUpdate.columns);
        if(columnIndex === -1) return;
        boardToUpdate.columns[columnIndex] = action.payload.updatedColumn;
        state.value = newValue;
        updateKanban(newValue);
      },
      addTask: (state, action: PayloadAction<{boardId: string, task: Task}>) => {
        const newValue = {...state.value};
        const [boardToUpdate] = getBoardsWithId(action.payload.boardId, newValue.boards);
        if(!boardToUpdate) return;
        const [columnToUpdate] = getColumnsWithName(action.payload.task.status, boardToUpdate.columns);
        if(!columnToUpdate) return;
        columnToUpdate.tasks = columnToUpdate.tasks.concat(action.payload.task);
        state.value = newValue;
        updateKanban(newValue);
      },
      deleteTask: (state, action: PayloadAction<{boardId: string, columnId: string, taskId: string}>) => {
        const newValue = {...state.value};
        const [boardToUpdate] = getBoardsWithId(action.payload.boardId, newValue.boards);
        if(!boardToUpdate) return;
        const [columnToUpdate] = getColumnsWithId(action.payload.columnId, boardToUpdate.columns);
        if(!columnToUpdate) return;
        columnToUpdate.tasks = columnToUpdate.tasks.filter(task => task.id !== action.payload.taskId);
        state.value = newValue;
        updateKanban(newValue);
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
        updateKanban(newValue);
      },
    },
    extraReducers(builder) {
      builder
        .addCase(fetchUserById.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchUserById.fulfilled, (state, action) => {
          state.status = 'idle';
          state.value = action.payload;
        })
        .addCase(fetchUserById.rejected, (state, action) => {
          state.status = 'failed';
          console.log('error', action.error.message)
        })
    }
  })
  
  export const { addBoard, deleteBoard, updateBoard, addTask, deleteTask, updateTask, addColumn, updateColumn, deleteColumn, addDummyData } = kanbanSlice.actions
  export const selectKanban = (state: RootState) => state.kanban.value;
  export default kanbanSlice.reducer;

  