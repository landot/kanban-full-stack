import styled from "styled-components"
import { HeadingL } from "./header/HeadingL"
import { ButtonStyles } from "./StyledButton.styles"

export const DeleteModalStyles = styled.div`
    background: #FFFFFF;
    height: fit-content;
    padding: 32px 32px 40px 32px;
    width: 100%;

    #dark & {
        background: #2B2C37;
    }

    ${HeadingL} {
        color: #EA5555;
        margin-bottom: 24px;
    }

    ${ButtonStyles} {
        width: 40%;
    }

    ${ButtonStyles}:first-of-type {
        margin-right: 16px;
    }
`

export const DeleteModalActionStyles = styled.div`
    margin-top: 24px;
    display: flex;
    justify-content: center;
`
