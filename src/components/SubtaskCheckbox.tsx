import { BoldText } from '../styledComponents/text/BoldText';
import { Subtask } from '../types/data';
import './SubtaskCheckbox.css';

export function Checkbox(props: {
    subtask: Subtask,
    handleClick: () => void
}) {
    console.log(props.subtask.isCompleted);
    return (
        <div className={`subtask ${props.subtask.isCompleted ? ' completed': ''}`}  onClick={props.handleClick}>
            <input type="checkbox" checked={props.subtask.isCompleted}/>
            <BoldText>{props.subtask.title}</BoldText> 
        </div>
    )
}