import { HeadingL } from "../styledComponents/header/HeadingL";
import { ButtonLarge } from "./ButtonLarge";
import './EmptyBoard.css';

export function EmptyBoard(props: {handleNewColumnClick: () => void}) {
    return (
        <div className="empty-board">
            <HeadingL>This board is empty. Create a new column to get started.</HeadingL>
            <ButtonLarge label={"+ Add New Column"} onClick={props.handleNewColumnClick} isDisabled={false}/>
        </div>
    )
}