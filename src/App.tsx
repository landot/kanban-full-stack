import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ThemeContext, ThemeContextType } from './context/ThemeContext';
import { KanbanTest } from '../features/kanban/KanbanTest';
import { Board, Column as IColumn, Task } from './types/data';
import './App.css'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { addBoard, addTask, BoardUpdateValue, deleteBoard, deleteTask, getBoardIndexWithId, getBoardsWithId, getColumnsWithId, getColumnsWithName, getTasksWithId, selectKanban, updateBoard, updateTask } from '../features/kanban/kanbanSlice';
import { Overlay } from './components/Overlay';
import { UpdateBoardModal } from './components/UpdateBoardModal';
import { DeleteModal } from './components/DeleteModal';
import { Column } from './components/Column';
import { UpdateTaskModal } from './components/UpdateTaskModal';
import { ViewTaskModal } from './components/ViewTaskModal';

// todo deal with scenario where there aren't any boards
// todo add "add column" column on right side of screen
// todo add padding to modals
// todo add button that enables the dragging of elements
// todo allow columns to be draggable/organized
// when dragging is enabled:
//   clicking tasks starts drag effect
//   clicking columns starts drag effect
// when dragging is disabled:
// clicking tasks opens the view task modal
// clicking columns does nothing
function App() {
  const dispatch = useAppDispatch()
  const [theme, setTheme] = useState<ThemeContextType>(localStorage.getItem('theme') as ThemeContextType  || 'light');
  const kanban = useAppSelector(selectKanban);
  const [selectedBoardId, setSelectedBoardId] = useState(kanban.boards[0].id);
  const [showAddBoardOverlay, setShowAddBoardOverlay] = useState(false);
  const [showEditBoardOverlay, setShowEditBoardOverlay] = useState(false);
  const [showDeleteBoardOverlay, setShowDeleteBoardOverlay] = useState(false);
  const [showAddTaskOverlay, setShowAddTaskOverlay] = useState(false);
  const [showViewTaskOverlay, setShowViewTaskOverlay] = useState(false);
  const [showDeleteTaskOverlay, setShowDeleteTaskOverlay] = useState(false);
  const [showEditTaskOverlay, setShowEditTaskOverlay] = useState(false);
  const [selectedTaskColumnId, setSelectedTaskColumnId] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState('');

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
    setSelectedBoardId(kanban.boards.filter(board => board.id !== boardId)[0].id);
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

  console.log(kanban);
  console.log(selectedBoardId);

  function handleDragEnd(result: DropResult) {
    const {destination, source} = result;
    // if (!destination) return;
    // if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    // setBoardData(prev => {
    //   const updatedData = [...prev]
    //   const sourceColumnData = updatedData.filter(d => d.id === source.droppableId)[0];
    //   const destinationColumnData = source.droppableId === destination.droppableId ? sourceColumnData: updatedData.filter(d => d.id === destination.droppableId)[0]
    //   const [movedItem] = sourceColumnData.tasks.splice(source.index, 1);
    //   destinationColumnData.tasks.splice(destination.index, 0, movedItem);
    //   return updatedData;
    // });
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
      <div className='app' id={theme}>
        <p>{showDeleteTaskOverlay.toString()}</p>
        <Sidebar 
          boards={kanban.boards} 
          selectedBoardIndex={getBoardIndexWithId(selectedBoardId, kanban.boards)} 
          handleToggleTheme={toggleTheme} 
          handleAddBoard={setShowAddBoardOverlay}
          handleBoardSelect={(boardId: string) => handleBoardChange(boardId)}
        />
        <Header 
          boardName={getBoardsWithId(selectedBoardId, kanban.boards)[0].name} 
          handleEditBoard={setShowEditBoardOverlay}
          handleDeleteBoard={setShowDeleteBoardOverlay} 
          handleAddTask={setShowAddTaskOverlay}
        />
        <div className='content'>
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
          {/* <KanbanTest /> */}
          <DragDropContext onDragEnd={handleDragEnd}>
            {getBoardsWithId(selectedBoardId, kanban.boards)[0].columns.map(column => (
              <Column 
                column={column} 
                handleViewTask={setShowViewTaskOverlay}
                handleSelectedTask={setSelectedTaskId}
                handleSelectedTaskColumn={setSelectedTaskColumnId}
              />
            ))}
          </DragDropContext>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

// function Column(props: {columnData: IColumn}) {
//   return (
//     <Droppable droppableId={props.columnData.id}>
//       {(provided) => (
//         <div {...provided.droppableProps} ref={provided.innerRef}>
//           <div className='column'>
//             <h3>{props.columnData.name}</h3>
//             <div className='column-items'>
//               {props.columnData.items.map((item: {id: string, name: string}, index: number)=> (
//                 <Draggable draggableId={item.id} key={item.id} index={index}>
//                   {(provided) => (
//                     <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
//                       <Task description={item.name} subtasksTotal={0} subtasksRemaining={0} />
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           </div>
//         </div>
//       )}
//     </Droppable>
//   )
// }

export default App
