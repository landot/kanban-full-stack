import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ThemeContext, ThemeContextType } from './context/ThemeContext';
import { Board, Column as IColumn, Task } from './types/data';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { 
  addBoard, 
  addTask, 
  BoardUpdateValue, 
  deleteBoard, 
  deleteTask, 
  selectKanban, 
  updateBoard, 
  updateColumn, 
  updateTask 
} from '../features/kanban/kanbanSlice';
import { Overlay } from './components/Overlay';
import { UpdateBoardModal } from './components/UpdateBoardModal';
import { DeleteModal } from './components/DeleteModal';
import { Column } from './components/Column';
import { UpdateTaskModal } from './components/UpdateTaskModal';
import { ViewTaskModal } from './components/ViewTaskModal';
import { AddNewColumn } from './components/AddNewColumn';
import { ShowSidebar } from './components/ShowSidebar';
import './App.css'
import { getBoardsWithId, getColumnsWithId, getTasksWithId } from './utils/filterUtils';
import { getBoardIndexWithId } from './utils/findIndexUtils';
import { EmptyBoard } from './components/EmptyBoard';


// refactor reducers
// set up tablet styling
// set up mobile styling
// fix accessibility issues
// make all clickable elements tab-accessible
// convert styles to styled components
// fix up redux tests for new test data
// fix up storybook stories that are not loading
// allow columns to be dragged around?
// add RTL tests for components
// integrate with firebase for auth
// integrate with firebase for data manipulation
function App() {
  const dispatch = useAppDispatch()
  // todo add logic to save theme to local storage
  const [theme, setTheme] = useState<ThemeContextType>(localStorage.getItem('theme') as ThemeContextType  || 'light');
  const kanban = useAppSelector(selectKanban);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedBoardId, setSelectedBoardId] = useState(kanban.boards.length > 0 ? kanban.boards[0].id: '');
  const [selectedTaskColumnId, setSelectedTaskColumnId] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState('');

  const [showAddBoardOverlay, setShowAddBoardOverlay] = useState(false);
  const [showEditBoardOverlay, setShowEditBoardOverlay] = useState(false);
  const [showDeleteBoardOverlay, setShowDeleteBoardOverlay] = useState(false);
  const [showAddTaskOverlay, setShowAddTaskOverlay] = useState(false);
  const [showViewTaskOverlay, setShowViewTaskOverlay] = useState(false);
  const [showDeleteTaskOverlay, setShowDeleteTaskOverlay] = useState(false);
  const [showEditTaskOverlay, setShowEditTaskOverlay] = useState(false);

  console.log(kanban)
  function toggleTheme() {
    if (theme === 'light') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
  }

  function handleBoardChange(boardId: string) {
    const [board] = getBoardsWithId(boardId, kanban.boards);
    if(board) setSelectedBoardId(board.id);
  }

  function handleBoardDelete(boardId: string) {
    dispatch(deleteBoard(boardId))
    const remainingBoards = kanban.boards.filter(board => board.id !== boardId);
    setSelectedBoardId(remainingBoards.length > 0 ? remainingBoards[0].id: '');
  }

  function handleBoardEdit(boardId: string, updatedBoard: BoardUpdateValue) {
    dispatch(updateBoard({boardId: boardId, updatedBoard: updatedBoard}));
  }

  function handleTaskDelete() {
    dispatch(deleteTask({
      boardId: selectedBoardId,
      columnId: selectedTaskColumnId,
      taskId: selectedTaskId
    }));
    setSelectedTaskId('');
    setSelectedTaskColumnId('');
    setShowDeleteTaskOverlay(false);
  }

  function handleDragEnd(result: DropResult) {
    const {destination, source} = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    const boardData = {...getSelectedBoard()};
    const sourceColumn = {...getColumnsWithId(source.droppableId, boardData.columns)[0]};
    const sourceColumnTasks = [...sourceColumn.tasks];
    const movedItem = {...sourceColumnTasks.splice(source.index, 1)[0]}; 
    sourceColumn.tasks = [...sourceColumnTasks];
    const destinationColumn = source.droppableId === destination.droppableId ? {...sourceColumn} : {...getColumnsWithId(destination.droppableId, getSelectedBoard().columns)[0]};
    if(source.droppableId !== destination.droppableId) {
      movedItem.status = destinationColumn.name;
    }
    dispatch(deleteTask({boardId: selectedBoardId, columnId: sourceColumn.id, taskId: movedItem.id}));
    const updatedDestinationColumnTasks = [...destinationColumn.tasks];
    updatedDestinationColumnTasks.splice(destination.index, 0, movedItem);
    destinationColumn.tasks = updatedDestinationColumnTasks;
    dispatch(updateColumn({boardId: selectedBoardId, columnId: destinationColumn.id, updatedColumn: destinationColumn}))
  }

  function getSelectedTask(): Task {
    return getTasksWithId(
      selectedTaskId,
      getSelectedColumn().tasks
    )[0]
  }

  function getSelectedColumn(): IColumn {
    return getColumnsWithId(
      selectedTaskColumnId, 
      getBoardsWithId(selectedBoardId, kanban.boards)[0].columns
    )[0]
  }

  function getSelectedBoard(): Board {
    return getBoardsWithId(selectedBoardId, kanban.boards)[0];
  }

  function getBoardStatuses(): string[] {
    return getSelectedBoard().columns.map(column => column.name);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`app ${showSidebar ? 'sidebar-visible': 'sidebar-hidden'}`} id={theme}>
        <div className='modal'>
          {showAddBoardOverlay && (
            <Overlay handleClose={() => setShowAddBoardOverlay(false)} children={
              <UpdateBoardModal 
                updateType={'add'} 
                handleAddBoard={(board: Board) => dispatch(addBoard(board))} 
                handleUpdateBoard={(boardId: string, values: BoardUpdateValue) => dispatch(updateBoard({boardId: boardId, updatedBoard: values}))} 
                hideModal={() => setShowAddBoardOverlay(false)}
              />
              }/>
            )
          }
          {showDeleteBoardOverlay && (
            <Overlay handleClose={() => setShowDeleteBoardOverlay(false)} children={
              <DeleteModal 
                name={'board'}
                text={`Are you sure you want to delete the ‘${getBoardsWithId(selectedBoardId, kanban.boards)[0].name}’ board? This action will remove all columns and tasks and cannot be reversed.`}
                handleDelete={() => handleBoardDelete(selectedBoardId)} 
                hideModal={() => setShowDeleteBoardOverlay(false)}
              />
            }/>
          )}
          {showEditBoardOverlay && (
            <Overlay handleClose={() => setShowEditBoardOverlay(false)} children={
              <UpdateBoardModal 
                updateType={'edit'} 
                handleAddBoard={(board: Board) => dispatch(addBoard(board))} 
                handleUpdateBoard={(boardId: string, values: BoardUpdateValue) => handleBoardEdit(boardId, values)} 
                hideModal={() => setShowEditBoardOverlay(false)}
                prefill={getBoardsWithId(selectedBoardId, kanban.boards)[0]}
              />
            }/>
          )}
          {showAddTaskOverlay && (
            <Overlay handleClose={() => setShowAddTaskOverlay(false)} children={
              <UpdateTaskModal 
                updateType={'add'}
                board={getSelectedBoard()}
                statuses={getBoardStatuses()} 
                handleAddTask={(task: Task) => dispatch(addTask({boardId: selectedBoardId, task: task}))} 
                handleUpdateTask={(task: Task) => dispatch(updateTask({boardId: selectedBoardId, columnId: selectedTaskColumnId, taskId: selectedTaskId, updatedTask: task}))} 
                hideModal={() => setShowAddTaskOverlay(false)}
              />
            }/>
          )}
          {showViewTaskOverlay && selectedTaskId && selectedTaskColumnId && (
            <Overlay handleClose={() => setShowViewTaskOverlay(false)} children={
              <ViewTaskModal 
                task={getSelectedTask()} 
                statuses={getBoardStatuses()}
                board={getSelectedBoard()}
                handleEditTask={() => setShowEditTaskOverlay(true)}
                handleDeleteTask={() => setShowDeleteTaskOverlay(true)}
                handleUpdateSelectedColumnId={setSelectedTaskColumnId}
                hideModal={() => setShowViewTaskOverlay(false)}
              />
            }/>
          )}
          {showEditTaskOverlay && selectedTaskId && selectedTaskColumnId && (
            <Overlay handleClose={() => setShowEditTaskOverlay(false)} children={
              <UpdateTaskModal 
                updateType={'edit'}
                board={getSelectedBoard()}
                statuses={getBoardStatuses()} 
                handleAddTask={(task: Task) => dispatch(addTask({boardId: selectedBoardId, task: task}))} 
                handleUpdateTask={(task: Task) => dispatch(updateTask({boardId: selectedBoardId, columnId: selectedTaskColumnId, taskId: selectedTaskId, updatedTask: task}))} 
                hideModal={() => setShowEditTaskOverlay(false)}
                prefill={getSelectedTask()}
              />
            }/>
          )}
          {showDeleteTaskOverlay && selectedTaskId && selectedTaskColumnId && (
            <Overlay handleClose={() => setShowDeleteTaskOverlay(false)} children={
              <DeleteModal 
                name={'task'} 
                text={`Are you sure you want to delete the ‘${getSelectedTask().title}’ task and its subtasks? This action cannot be reversed.`} 
                handleDelete={handleTaskDelete}
                hideModal={() => setShowDeleteTaskOverlay(false)}
              />
            }/>
          )}
        </div>
        {showSidebar && (
          <Sidebar 
            boards={kanban.boards} 
            selectedBoardIndex={getBoardIndexWithId(selectedBoardId, kanban.boards)} 
            handleToggleTheme={toggleTheme} 
            handleAddBoard={setShowAddBoardOverlay}
            handleBoardSelect={(boardId: string) => handleBoardChange(boardId)}
            handleHideSidebar={() => setShowSidebar(false)}
          />
        )}
        <Header 
          board={getSelectedBoard()}
          handleEditBoard={setShowEditBoardOverlay}
          handleDeleteBoard={setShowDeleteBoardOverlay} 
          handleAddTask={setShowAddTaskOverlay}
        />
        <div className='content'>
          {(selectedBoardId && kanban.boards.length > 0) && (
            <DragDropContext onDragEnd={handleDragEnd}>
              {getBoardsWithId(selectedBoardId, kanban.boards)[0].columns.map(column => (
                <Column 
                  key={column.id}
                  column={column} 
                  handleViewTask={setShowViewTaskOverlay}
                  handleSelectedTask={setSelectedTaskId}
                  handleSelectedTaskColumn={setSelectedTaskColumnId}
                />
              ))}
            </DragDropContext>
          )}
          {selectedBoardId && getSelectedBoard().columns.length > 0 && (
            <AddNewColumn handleClick={() => setShowEditBoardOverlay(true)}/>
          )}
          {selectedBoardId && getSelectedBoard().columns.length === 0 && (
            <EmptyBoard handleNewColumnClick={() => setShowEditBoardOverlay(true)} />
          )}
          {!showSidebar && (
            <ShowSidebar handleClick={() => setShowSidebar(true)}/>
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
