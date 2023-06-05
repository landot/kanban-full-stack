import { BoldText } from '../styledComponents/text/BoldText';
import { Subtask } from '../types/data';
import './SubtaskCheckbox.css';

export function Checkbox(props: {
    subtask: Subtask,
    handleClick: () => void
}) {
    return (
        <div className={`subtask ${props.subtask.isCompleted ? ' completed': ''}`}>
            <input type="checkbox" checked={props.subtask.isCompleted} onClick={props.handleClick}/>
            <BoldText>{props.subtask.title}</BoldText> 
        </div>
    )
}