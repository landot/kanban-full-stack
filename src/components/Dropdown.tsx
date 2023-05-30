import { useState } from 'react';
import chevronDown from '../../public/assets/images/icon-chevron-down.svg';
import './Dropdown.css';

export function Dropdown(props: {value: 'todo' | 'doing' | 'done', handleChange: (s: any) => void}) {
    const [status, setStatus] = useState(props.value);
    const [showDropdownItems, setShowDropdownItems] = useState(false);

    function handleDropdownUpdate(newStatus: 'todo' | 'doing' | 'done') {
        setStatus(newStatus);
        setShowDropdownItems(false);
        props.handleChange(newStatus);
    }
    
    return (
        <div className={`status-dropdown ${showDropdownItems ? ' open': ''}`}>
            <div className='selected-status' onClick={() => setShowDropdownItems(prev => !prev)}>
                <p>{status}</p>
                <img src={chevronDown} alt="" />
            </div>
            {showDropdownItems && (
                <ul className='dropdown-items'>
                    <li onClick={() => handleDropdownUpdate('todo')}>Todo</li>
                    <li onClick={() => handleDropdownUpdate('doing')}>Doing</li>
                    <li onClick={() => handleDropdownUpdate('done')}>Done</li>
                </ul>
            )}
        </div>
    )
}