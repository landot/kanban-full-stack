import { useState } from "react";
import './TextField.css';

export function TextField(props: {showValidationError: boolean}) {
    const [text, setText] = useState('');

    return (
        <div className={`text-input${props.showValidationError ? ' error': ''}`}>
            <input 
                type="text" 
                value={text} 
                placeholder='Enter task name'
                onChange={(e) => setText(e.currentTarget.value)}
            />
            {props.showValidationError && <p className="validation-message">Can’t be empty</p>}
        </div>
    )
}