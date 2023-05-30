import { useState } from 'react';
import ellipsis from '../../public/assets/images/icon-vertical-ellipsis.svg';
import './SubtaskMoreAction.css';

export function SubtaskMoreAction(
    props: {
        handleEditClick: () => void,
        handleDeleteClick: () => void
}) {
    const [showMoreActions, setShowMoreActions] = useState(false);
    return (
        <div className='more-actions'>
            <img 
                src={ellipsis} 
                alt="subtask actions" 
                onClick={() => setShowMoreActions(prev => !prev)}
            />
            {showMoreActions && (
                <ul>
                    <li className='edit' onClick={props.handleEditClick}>Edit Task</li>
                    <li className='delete' onClick={props.handleEditClick}>Delete Task</li>
                </ul>
            )}
        </div>
    )
}