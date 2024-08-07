import styled from "styled-components"

export const DropdownStyles = styled.div`
    position: relative;
    cursor: pointer;
`

export const SelectedItemStyles = styled.div<{open: boolean}>`
    border: ${p => p.open ? '1px solid #635FC7': '1px solid rgba(130, 143, 163, 0.25)'};
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px 9px 16px;

    p {
        margin: 0; 
    }

    #dark & {
        color: #FFFFFF;
    }
`

export const DropdownListStyles = styled.ul`
    background: #FFFFFF;
    z-index: 20;
    width: 100%;
    position: absolute;
    top: 35px;
    left: 0;
    list-style-type: none;
    padding: 16px 0 16px 0;
    box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
    border-radius: 8px;
`

export const DropdownListItemStyles = styled.li`
    margin-left: 16px;
    margin-right: -16px;
    width: 90%;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 23px;
    color: #828FA3;

    &:not(:last-of-type) {
        margin-bottom: 8px;
    }
`
