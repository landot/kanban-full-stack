import styled from "styled-components";

export const MessageStyles = styled.div`
    padding: 5px 24px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    border-bottom: solid #E4EBFA 2px;
    background: #FFFFFF;

    #dark & {
        border-bottom: solid #3E3F4E 2px;
        background: #2B2C37;
    }
`