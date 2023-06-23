import { AddNewColumnWrapper } from "./styles/AddNewColumn.styles";
import { HeadingM } from "./styles/header/HeadingM";

export function AddNewColumn(props: {handleClick: () => void}) {
    return (
        <AddNewColumnWrapper onClick={props.handleClick}>
            <HeadingM>+ New Column</HeadingM>
        </AddNewColumnWrapper>
    )
}