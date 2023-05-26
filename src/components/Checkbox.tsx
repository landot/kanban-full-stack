import { BoldText } from '../styledComponents/text/BoldText';
import './Checkbox.css';

export function Checkbox(props: {text: string, completed: boolean}) {
    return (
        <div className={`subtask${props.completed ? ' completed': ''}`}>
            <input type="checkbox" checked={props.completed} />
            <BoldText>{props.text}</BoldText>
        </div>
    )
}