import { HeadingM } from '../styledComponents/header/HeadingM';
import { MediumText } from '../styledComponents/text/MediumText';
import './Task.css';

export function Task(props: {description: string, subtasksTotal: number, subtasksRemaining: number}) {
    return (
        <div className='task'>
            <HeadingM>{props.description}</HeadingM>
            <MediumText>{`${props.subtasksRemaining} of ${props.subtasksTotal} subtasks`}</MediumText>
        </div>
    )
}