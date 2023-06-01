import { Draggable, Droppable } from 'react-beautiful-dnd';
import { HeadingS } from '../styledComponents/header/HeadingS';
import { Column as IColumn } from '../types/data';
import { Task } from './Task';
import './Column.css';

export function Column(props: IColumn) {
    return (
        <Droppable droppableId={props.id}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    <div className='column'>
                        <div className='column-header'>
                            <span className='dot' style={{
                                backgroundColor: props.color
                            }}/> 
                            <HeadingS>{props.name} ({props.tasks.length})</HeadingS>
                        </div>
                        <div className='column-items'>
                        {props.tasks.map((task, index)=> (
                            <Draggable draggableId={task.id} key={task.id} index={index}>
                            {(provided) => (
                                <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                <Task description={task.title} subtasksTotal={task.subtasks.length} subtasksRemaining={task.subtasks.filter(t => !t.isCompleted).length} />
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