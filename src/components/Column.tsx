import { Draggable, Droppable } from 'react-beautiful-dnd';
import { HeadingS } from '../styledComponents/header/HeadingS';
import { Column as IColumn } from '../types/data';
import { Task as ITask } from '../types/data';
import { Task } from './Task';
import './Column.css';

export function Column(
    props: {
        column: IColumn,
        handleViewTask: (show: boolean) => void,
        handleSelectedTask: (task: ITask) => void,
    }
    ) {

    function handleTaskClick(task: ITask) {
        props.handleViewTask(true);
        props.handleSelectedTask(task);
    }

    return (
        <Droppable droppableId={props.column.id}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    <div className='column'>
                        <div className='column-header'>
                            <span className='dot' style={{
                                backgroundColor: props.column.color
                            }}/> 
                            <HeadingS>{props.column.name} ({props.column.tasks.length})</HeadingS>
                        </div>
                        <div className='column-items'>
                        {props.column.tasks.map((task, index)=> (
                            <Draggable draggableId={task.id} key={task.id} index={index}>
                            {(provided) => (
                                <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                    <Task 
                                        task={task} 
                                        handleClick={() => handleTaskClick(task)}
                                    />
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