import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ThemeContext, ThemeContextType } from './context/ThemeContext';
import { Column } from './components/Column';
import { Task } from '../features/task/Task';
import { KanbanTest } from '../features/kanban/KanbanTest';
import { Status, Column as IColumn } from './types/data';
import './App.css'

function App() {
  const [theme, setTheme] = useState<ThemeContextType>(localStorage.getItem('theme') as ThemeContextType  || 'light');
  const [boardData, setBoardData] = useState<IColumn[]>([
    {
      name: 'Column1',
      id: 'col1', 
      color: '#49C4E5',
      tasks: [
        {
            id: '5555',
            title: 'Build UI for onboarding',
            description: 'this is the description for the task asdfasdfasdfasfd',
            status: Status.Todo,
            subtasks: [
                {
                    id: '123456',
                    title: 'create design for UI',
                    isCompleted: true
                },
                {
                    id: '123457',
                    title: 'develop MVP',
                    isCompleted: false
                },
                {
                    id: '123458',
                    title: 'test MVP',
                    isCompleted: false
                }
            ]
        },
        {
            id: '6666',
            title: 'Test new UI',
            description: 'this is the description for the task asdfasdfasdfasfd',
            status: Status.Todo,
            subtasks: [
                {
                    id: '1123456',
                    title: 'accessibility testing',
                    isCompleted: true
                },
                {
                    id: '1123457',
                    title: 'performance testing',
                    isCompleted: false
                },
                {
                    id: '1123458',
                    title: 'sign off from QA',
                    isCompleted: false
                }
            ]
        }
    ]
    },
    {
      name: 'Column2',
      id: 'col2', 
      color: '#8471F2',
      tasks: []
    },
    {
      name: 'Column3',
      id: 'col3', 
      color: '#67E2AE',
      tasks: []
    }
  ]);
  console.log(boardData);

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
          <Task />
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
