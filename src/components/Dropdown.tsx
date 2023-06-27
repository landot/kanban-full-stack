import { useState } from 'react';
import chevronDown from '../assets/images/icon-chevron-down.svg';
import { DropdownStyles, SelectedItemStyles, DropdownListStyles, DropdownListItemStyles } from './styles/Dropdown.styles';

export function Dropdown(props: {
    values: string[],
    value: string, 
    handleChange: (status: string) => void
}) {
    const [value, setSelectedValue] = useState(props.value);
    const [showDropdownItems, setShowDropdownItems] = useState(false);

    function handleDropdownUpdate(newStatus: string) {
        setSelectedValue(newStatus);
        setShowDropdownItems(false);
        props.handleChange(newStatus);
    }
    
    return (
        <DropdownStyles>
            <SelectedItemStyles open={showDropdownItems} onClick={() => setShowDropdownItems(prev => !prev)}>
                <p>{value}</p>
                <img src={chevronDown} alt="dropdown chevron" />
            </SelectedItemStyles>
            {showDropdownItems && (
                <DropdownListStyles className='dropdown-items'>
                    {props.values.map(value => <DropdownListItemStyles onClick={() => handleDropdownUpdate(value)}>{value}</DropdownListItemStyles>)}
                </DropdownListStyles>
            )}
        </DropdownStyles>
    )
}