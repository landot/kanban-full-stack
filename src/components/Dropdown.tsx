import { useState } from 'react';
import chevronDown from '../assets/images/icon-chevron-down.svg';
import './Dropdown.css';

export function Dropdown(props: {
    values: string[],
    value: string, 
    handleChange: (status: string) => void
}) {
    const [status, setStatus] = useState(props.value);
    const [showDropdownItems, setShowDropdownItems] = useState(false);

    function handleDropdownUpdate(newStatus: string) {
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
                    {props.values.map(value => <li onClick={() => handleDropdownUpdate(value)}>{value}</li>)}
                </ul>
            )}
        </div>
    )
}