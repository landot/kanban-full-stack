import { HeadingL } from "./styles/header/HeadingL";
import './EmptyBoard.css';
import { StyledButton } from "./StyledButton";
import { LargePrimary } from "./styles/StyledButton.styles";

export function EmptyBoard(props: {handleNewColumnClick: () => void}) {
    return (
        <div className="empty-board">
            <HeadingL>This board is empty. Create a new column to get started.</HeadingL>
            <StyledButton buttonProps={LargePrimary} label={"+ Add New Column"} onClick={props.handleNewColumnClick} isDisabled={false}/>
        </div>
    )
}