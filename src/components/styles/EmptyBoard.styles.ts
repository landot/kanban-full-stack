import styled from "styled-components";
import { HeadingL } from "./header/HeadingL";

export const EmptyBoardStyles = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${HeadingL} {
        color: #828FA3;
        text-align: center;
        margin-bottom: 24px;
    }
`