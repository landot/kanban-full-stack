import { useState } from 'react';
import ellipsis from '../assets/images/icon-vertical-ellipsis.svg';
import './MoreAction.css';

export function MoreAction(
    props: {
        text: string,
        handleEditClick: () => void,
        handleDeleteClick: () => void,
}) {
    const [showMoreActions, setShowMoreActions] = useState(false);

    function handleDelete() {
        setShowMoreActions(false);
        props.handleDeleteClick();
    }

    function handleEdit() {
        setShowMoreActions(false);
        props.handleEditClick();
    }

    return (
        <div className='more-actions'>
            <img 
                src={ellipsis} 
                alt="subtask actions" 
                onClick={() => setShowMoreActions(prev => !prev)}
            />
            {showMoreActions && (
                <ul>
                    <li className='edit' onClick={handleEdit}>Edit {props.text}</li>
                    <li className='delete' onClick={handleDelete}>Delete {props.text}</li>
                </ul>
            )}
        </div>
    )
}