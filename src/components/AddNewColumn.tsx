import styled from "styled-components";
import { HeadingM } from "../styledComponents/header/HeadingM";

const AddNewColumnWrapper = styled.div`
    cursor: pointer;
    margin: 50px 0 50px 0;
    min-width: 280px;
    height: 90%;
    background: rgb(175, 182, 185, .1);
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;

    ${HeadingM} {
        color: #828FA3;
    }

     #dark & {
        background: linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%);
     }
`

export function AddNewColumn(props: {handleClick: () => void}) {
    return (
        <AddNewColumnWrapper onClick={props.handleClick}>
            <HeadingM>+ New Column</HeadingM>
        </AddNewColumnWrapper>
    )
}