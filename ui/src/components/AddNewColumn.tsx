import { AddNewColumnWrapper } from "./styles/AddNewColumn.styles";
import { HeadingM } from "./styles/header/HeadingM";

export function AddNewColumn(props: {handleClick: () => void}) {

    function handleKeyPress(e: React.KeyboardEvent) {
        if(e.key === 'Enter') {
            e.preventDefault();
            props.handleClick();
        }
    }
    
    return (
        <AddNewColumnWrapper 
            tabIndex={0} 
            onClick={props.handleClick} 
            onKeyDown={handleKeyPress}
            data-testid='add-new-column'
        >
        <HeadingM>+ New Column</HeadingM>
        </AddNewColumnWrapper>
    )
}