import { HeadingL } from "./styles/header/HeadingL";
import { StyledButton } from "./StyledButton";
import { LargePrimary } from "./styles/StyledButton.styles";
import { EmptyBoardStyles } from "./styles/EmptyBoard.styles";

export function EmptyBoard(props: {handleNewColumnClick: () => void}) {
    return (
        <EmptyBoardStyles>
            <HeadingL>This board is empty. Create a new column to get started.</HeadingL>
            <StyledButton testId="empty-new-column" buttonProps={LargePrimary} label={"+ Add New Column"} onClick={props.handleNewColumnClick} isDisabled={false}/>
        </EmptyBoardStyles>
    )
}