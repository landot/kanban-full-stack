import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ThemeContext, ThemeContextType } from './context/ThemeContext';
import { KanbanTest } from '../features/kanban/KanbanTest';
import { Board } from './types/data';
import './App.css'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { addBoard, BoardUpdateValue, deleteBoard, getBoardIndexWithId, getBoardsWithId, selectKanban, updateBoard } from '../features/kanban/kanbanSlice';
import { Overlay } from './components/Overlay';
import { UpdateBoardModal } from './components/UpdateBoardModal';
import { DeleteModal } from './components/DeleteModal';

function App() {
  const [theme, setTheme] = useState<ThemeContextType>(localStorage.getItem('theme') as ThemeContextType  || 'light');
  const kanban = useAppSelector(selectKanban);
  const [selectedBoard, setSelectedBoard] = useState<Board>(kanban.boards[0]);
  const [showAddBoardOverlay, setShowAddBoardOverlay] = useState(false);
  const [showEditBoardOverlay, setShowEditBoardOverlay] = useState(false);
  const [showDeleteBoardOverlay, setShowDeleteBoardOverlay] = useState(false);

  const dispatch = useAppDispatch()

  // const [boardData, setBoardData] = useState<IColumn[]>([...kanban.boards[0].columns]);

  function toggleTheme() {
    if (theme === 'light') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
  }

  function handleBoardChange(boardId: string) {
    const [board] = getBoardsWithId(boardId, kanban.boards);
    if(board) setSelectedBoard(board);
  }

  function handleBoardDelete(boardId: string) {
    // delete board
    dispatch(deleteBoard(boardId))
    // reset selectedBoard to the first board
    // todo maybe I could just show the previous board
    setSelectedBoard(kanban.boards[0]);
  }

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

  return (
    <ThemeContext.Provider value={theme}>
      <div className='app' id={theme}>
        <Sidebar 
          boards={kanban.boards} 
          selectedBoardIndex={getBoardIndexWithId(selectedBoard.id, kanban.boards)} 
          handleToggleTheme={toggleTheme} 
          handleAddBoard={setShowAddBoardOverlay}
          handleBoardSelect={(boardId: string) => handleBoardChange(boardId)}
        />
        <Header 
          boardName={selectedBoard.name} 
          handleDeleteBoard={setShowDeleteBoardOverlay} 
        />
        <div className='content'>
          <p>{showDeleteBoardOverlay.toString()}</p>
          {showAddBoardOverlay && (
            <Overlay children={
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
            <Overlay children={
              <DeleteModal 
                name={'board'}
                text={`Are you sure you want to delete the ‘${selectedBoard.name}’ board? This action will remove all columns and tasks and cannot be reversed.`}
                handleDelete={() => handleBoardDelete(selectedBoard.id)} 
                hideModal={() => setShowDeleteBoardOverlay(false)}
              />
            }/>
          )}
          <KanbanTest />
          {/* <DragDropContext onDragEnd={handleDragEnd}>
            <Column name={boardData[0].name} id={boardData[0].id} tasks={boardData[0].tasks} color={boardData[0].color} />
            <Column name={boardData[1].name} id={boardData[1].id} tasks={boardData[1].tasks} color={boardData[1].color} />
            <Column name={boardData[2].name} id={boardData[2].id} tasks={boardData[2].tasks} color={boardData[2].color} />
          </DragDropContext> */}
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
