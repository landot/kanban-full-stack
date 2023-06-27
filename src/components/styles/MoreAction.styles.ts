import styled from "styled-components"

export const ListItemStyles = styled.li<{itemType: 'destructive' | 'primary'}>`
    list-style-type: none;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 23px;
    cursor: pointer;
    color: ${p => p.itemType === 'destructive' ? '#EA5555': '#828FA3'};
`

export const MoreActionStyles = styled.div`
    position: relative;

    & + img {
        cursor: pointer;
        padding: 10px;
    }

    ul {
        box-sizing: border-box;
        margin: 0;
        padding: 16px;
        z-index: 5;
        position: absolute;
        top: 50px;
        left: -120px;
        background: #FFFFFF;
        width: 150px;
        height: fit-content;
        display: flex;
        gap: 15px;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
        border-radius: 8px;
    }

    #dark & ul {
        background: #20212C;
    }
`