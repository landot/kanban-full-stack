import { Draggable, Droppable } from 'react-beautiful-dnd';
import { HeadingS } from './styles/header/HeadingS';
import { Column as IColumn } from '../types/data';
import { Task } from './Task';
import { DroppableColumnStyles, ColumnStyles, ColumnHeaderStyles, ColumnHeaderDot, ColumnItemStyles, ColumnHeaderName } from './styles/Column.styles';


export function Column(
    props: {
        column: IColumn,
        handleViewTask: (show: boolean) => void,
        handleSelectedTask: (taskId: string) => void,
        handleSelectedTaskColumn: (columnId: string) => void
    }
    ) {

    function handleTaskClick(task: string) {
        props.handleViewTask(true);
        props.handleSelectedTask(task);
        props.handleSelectedTaskColumn(props.column.id);
    }

    return (
        <Droppable droppableId={props.column.id}>
            {(provided) => (
                <DroppableColumnStyles {...provided.droppableProps} ref={provided.innerRef}>
                    <ColumnStyles>
                        <ColumnHeaderStyles>
                            <ColumnHeaderDot style={{
                                backgroundColor: props.column.color
                            }}/> 
                            <ColumnHeaderName>
                                <HeadingS data-testid='column-name'>{props.column.name}</HeadingS> <HeadingS data-testid='column-task-count'>({props.column.tasks.length})</HeadingS>
                            </ColumnHeaderName>
                        </ColumnHeaderStyles>
                        <ColumnItemStyles>
                        {props.column.tasks.map((task, index)=> (
                            <Draggable draggableId={task.id} key={task.id} index={index}>
                            {(provided) => (
                                <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                    <Task 
                                        task={task} 
                                        handleClick={() => handleTaskClick(task.id)}
                                    />
                                </div>
                            )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        </ColumnItemStyles>
                    </ColumnStyles>
                </DroppableColumnStyles>
            )}
        </Droppable>
    )
}