import { useState } from 'react';
import ellipsis from '../assets/images/icon-vertical-ellipsis.svg';
import './MoreAction.css';

export interface MoreActionItem {
    text: string;
    class: string;
    action: () => void;
}

export function MoreAction(props: { actionItemName: string, items: MoreActionItem[]}) {
    const [showMoreActions, setShowMoreActions] = useState(false);

    return (
        <div className='more-actions'>
        <img 
            src={ellipsis} 
            alt={`${props.actionItemName} more actions`} 
            onClick={() => setShowMoreActions(prev => !prev)}
        />
        {showMoreActions && (
            <ul>
                {props.items.map(item => {
                    return <li className={item.class} onClick={() => {
                        item.action();
                        setShowMoreActions(false);
                    }}>{item.text}</li>
                })}
            </ul>
        )}
    </div>
    )
}

// export function BoardMoreAction(
//     props: {
//         handleEditClick: () => void,
//         handleDeleteClick: () => void,
// }) {
//     const [showMoreActions, setShowMoreActions] = useState(false);

//     function handleDelete() {
//         setShowMoreActions(false);
//         props.handleDeleteClick();
//     }

//     function handleEdit() {
//         setShowMoreActions(false);
//         props.handleEditClick();
//     }

//     return (
//         <div className='more-actions'>
//             <img 
//                 src={ellipsis} 
//                 alt="subtask actions" 
//                 onClick={() => setShowMoreActions(prev => !prev)}
//             />
//             {showMoreActions && (
//                 <ul>
//                     <li className='edit' onClick={handleEdit}>Edit {props.text}</li>
//                     <li className='delete' onClick={handleDelete}>Delete {props.text}</li>
//                 </ul>
//             )}
//         </div>
//     )
// }