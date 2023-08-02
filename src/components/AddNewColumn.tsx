import { AddNewColumnWrapper } from "./styles/AddNewColumn.styles";
import { HeadingM } from "./styles/header/HeadingM";

export function AddNewColumn(props: {handleClick: () => void}) {
    return (
        <AddNewColumnWrapper onClick={props.handleClick} data-testid='add-new-column'>
            <HeadingM>+ New Column</HeadingM>
        </AddNewColumnWrapper>
    )
}