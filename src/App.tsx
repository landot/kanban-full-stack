import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ThemeContext, ThemeContextType } from './context/ThemeContext';
import './App.css'

interface Item {
  id: string;
  name: string;
}

interface IColumn {
  name: string;
  id: string;
  items: Item[];
}

function App() {
  const [theme, setTheme] = useState<ThemeContextType>(localStorage.getItem('theme') as ThemeContextType  || 'light');
  const [dropData, setDropData] = useState<IColumn[]>([
    {
      name: 'Column1',
      id: 'col1', 
      items: [
        {id: '1', name: 'one'},
        {id: '2', name: 'two'},
      ]
    },
    {
      name: 'Column2',
      id: 'col2', 
      items: [
        {id: '3', name: 'three'},
      ]
    },
    {
      name: 'Column3',
      id: 'col3', 
      items: [
        {id: '4', name: 'four'},
      ]
    }
  ]);
  console.log(dropData);

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
    setDropData(prev => {
      const updatedData = [...prev]
      const sourceColumnData = updatedData.filter(d => d.id === source.droppableId)[0];
      const destinationColumnData = source.droppableId === destination.droppableId ? sourceColumnData: updatedData.filter(d => d.id === destination.droppableId)[0]
      const [movedItem] = sourceColumnData.items.splice(source.index, 1);
      destinationColumnData.items.splice(destination.index, 0, movedItem);
      return updatedData;
    });
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className='app' id={theme}>
        <Sidebar boards={['Test1', 'Test2']} selectedBoardIndex={0} handleToggleTheme={toggleTheme}/>
        <Header boardName={'Test1'} />
        <div className='content'>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Column columnData={dropData.filter(data => data.id === 'col1')[0]} />
            <Column columnData={dropData.filter(data => data.id === 'col2')[0]} />
            <Column columnData={dropData.filter(data => data.id === 'col3')[0]} />
          </DragDropContext>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

function Column(props: {columnData: IColumn}) {
  return (
    <Droppable droppableId={props.columnData.id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className='column'>
            <h3>{props.columnData.name}</h3>
            <div className='column-items'>
              {props.columnData.items.map((item: {id: string, name: string}, index: number)=> (
                <Draggable draggableId={item.id} key={item.id} index={index}>
                  {(provided) => (
                    <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                      <h3>{item.name}</h3>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  )
}

export default App
