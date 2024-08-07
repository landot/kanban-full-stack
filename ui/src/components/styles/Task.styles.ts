import styled from "styled-components";

export const TaskStyles = styled.div`
    width: 100%;
    padding: 23px 16px;
    background: #FFFFFF;
    box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);
    border-radius: 8px;
    
    #dark & {
        background: #2B2C37;
    }

    #dark & h3 {
        color: #FFFFFF;
    }
`