import styled from "styled-components"
import { HeadingL } from "./header/HeadingL"
import { BaseButtonStyles } from "./StyledButton.styles"

export const HeaderStyles = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    border-bottom: solid #E4EBFA 2px;
    background: #FFFFFF;

    #dark & {
        background: #2B2C37;
        border-bottom: solid #3E3F4E 2px;  
    }
`

export const HeaderContentStyles = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    #dark & ${HeadingL} {
        color: #FFFFFF;
    }
`

export const Break = styled.div`
    height: 100px;
    width: 2px;
    background: #E4EBFA;
    margin: 0 32px;
    border: none;

    #dark & {
        background: #3E3F4E;
    }
`

export const LightLogoStyles = styled.img`
    display: none;

    #dark & {
        display: block;
    }
`

export const DarkLogoStyles = styled.img`
    display: block;

    #dark & {
        display: none;
    }
`

export const MobileLogoStyles = styled.img`
    margin-right: 16px;
`

export const HeaderTitleStyles = styled.div`
    display: flex;
    align-items: center;

    img {
        margin-left: 8px;
    }
`

export const HeaderActionStyles = styled.div`
    display: flex;
    align-items: center;

    ${BaseButtonStyles} {
        margin-right: 24px;
    }

    @media (max-width: 500px) {
        ${BaseButtonStyles} {
            padding: 6px 20px;
        }
    }
`
