import { HeadingM } from './styles/header/HeadingM';
import { Task as ITask } from '../types/data';
import { MediumText } from './styles/text/MediumText';
import { TaskStyles } from './styles/Task.styles';

export function Task(props: {
    task: ITask,
    handleClick: (task: ITask) => void,
}) {
    const tasksRemaining = props.task.subtasks.filter(t => !t.isCompleted).length;
    return (
        <TaskStyles onClick={() => props.handleClick(props.task)}>
            <HeadingM>{props.task.title}</HeadingM>
            <MediumText>{`${tasksRemaining} of ${props.task.subtasks.length} subtasks remaining`}</MediumText>
        </TaskStyles>
    )
}