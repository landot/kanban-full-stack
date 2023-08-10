import { Subtask } from '../types/data';
import { BoldText } from './styles/text/BoldText';
import './SubtaskCheckbox.css';

export function Checkbox(props: {
    subtask: Subtask,
    handleClick: () => void
}) {
    return (
        <div data-testid={`subtask-checkbox${props.subtask.isCompleted ? '-completed': ''}`} className={`subtask ${props.subtask.isCompleted ? ' completed': ''}`}>
            <input aria-label='subtask checkbox' data-testid='checkbox' type="checkbox" defaultChecked={props.subtask.isCompleted} onClick={props.handleClick}/>
            <BoldText>{props.subtask.title}</BoldText> 
        </div>
    )
}