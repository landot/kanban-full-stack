import { HeadingM } from '../styledComponents/header/HeadingM';
import { MediumText } from '../styledComponents/text/MediumText';
import { Task as ITask } from '../types/data';
import './Task.css';

export function Task(props: {
    task: ITask,
    handleClick: (task: ITask) => void,
}) {
    const tasksRemaining = props.task.subtasks.filter(t => !t.isCompleted).length;
    return (
        <div 
            className='task'
            onClick={() => props.handleClick(props.task)}
        >
            <HeadingM>{props.task.title}</HeadingM>
            <MediumText>{`${tasksRemaining} of ${props.task.subtasks.length} subtasks remaining`}</MediumText>
        </div>
    )
}