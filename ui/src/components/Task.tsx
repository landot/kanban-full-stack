import { HeadingM } from './styles/header/HeadingM';
import { Task as ITask } from '../types/data';
import { MediumText } from './styles/text/MediumText';
import { TaskStyles } from './styles/Task.styles';

export function Task(props: {
    task: ITask,
    handleClick: (task: ITask) => void,
}) {
    
    function handleKeyPress(e: React.KeyboardEvent) {
        if(e.key === 'Enter') {
            e.preventDefault();
            props.handleClick(props.task);
        }
    }

    const tasksRemaining = props.task.subtasks.filter(t => !t.isCompleted).length;
    return (
        <TaskStyles
            tabIndex={0} 
            onClick={() => props.handleClick(props.task)} 
            onKeyDown={handleKeyPress}
            data-testid='task'
        >
            <HeadingM data-testid='task-title'>{props.task.title}</HeadingM>
            <MediumText>{`${tasksRemaining} of ${props.task.subtasks.length} subtasks remaining`}</MediumText>
        </TaskStyles>
    )
}