import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ThemeContext, ThemeContextType } from './context/ThemeContext';
import { Column } from './components/Column';
import { KanbanTest } from '../features/kanban/KanbanTest';
import { Column as IColumn } from './types/data';
import './App.css'
import { useAppSelector } from '../app/hooks';
import { selectKanban } from '../features/kanban/kanbanSlice';

function App() {
  const [theme, setTheme] = useState<ThemeContextType>(localStorage.getItem('theme') as ThemeContextType  || 'light');
  const kanban = useAppSelector(selectKanban);
  const [boardData, setBoardData] = useState<IColumn[]>([...kanban.boards[0].columns]);

  function toggleTheme() {
    if (theme === 'light') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
  }

  function handleDragEnd(result: DropResult) {
    const {destination, source} = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    setBoardData(prev => {
      const updatedData = [...prev]
      const sourceColumnData = updatedData.filter(d => d.id === source.droppableId)[0];
      const destinationColumnData = source.droppableId === destination.droppableId ? sourceColumnData: updatedData.filter(d => d.id === destination.droppableId)[0]
      const [movedItem] = sourceColumnData.tasks.splice(source.index, 1);
      destinationColumnData.tasks.splice(destination.index, 0, movedItem);
      return updatedData;
    });
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className='app' id={theme}>
        <Sidebar boards={['Test1', 'Test2']} selectedBoardIndex={0} handleToggleTheme={toggleTheme}/>
        <Header boardName={'Test1'} />
        <div className='content'>
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
