import { useState } from 'react';
import ellipsis from '../../public/assets/images/icon-vertical-ellipsis.svg';
import './MoreAction.css';

export function MoreAction(
    props: {
        text: string,
        handleEditClick: () => void,
        handleDeleteClick: () => void,
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
                    <li className='edit' onClick={props.handleEditClick}>Edit {props.text}</li>
                    <li className='delete' onClick={props.handleEditClick}>Delete {props.text}</li>
                </ul>
            )}
        </div>
    )
}