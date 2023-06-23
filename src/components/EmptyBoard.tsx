import { HeadingL } from "../styledComponents/header/HeadingL";
import { LargePrimary, StyledButton } from "./StyledButton";
import './EmptyBoard.css';

export function EmptyBoard(props: {handleNewColumnClick: () => void}) {
    return (
        <div className="empty-board">
            <HeadingL>This board is empty. Create a new column to get started.</HeadingL>
            <StyledButton buttonProps={LargePrimary} label={"+ Add New Column"} onClick={props.handleNewColumnClick} isDisabled={false}/>
        </div>
    )
}