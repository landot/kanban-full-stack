import styled from 'styled-components';
import eyeIcon from '../assets/images/icon-show-sidebar.svg';
import './ShowSidebar.css';

export const ShowSidebarStyles = styled.div`
    position: absolute;
    width: 56px;
    height: 48px;
    border-radius: 0px 100px 100px 0px;
    background: #635FC7;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background: #A8A4FF;
    }
`

export function ShowSidebar(props: {handleClick: () => void}) {
    return (
        <ShowSidebarStyles onClick={props.handleClick}>
            <img src={eyeIcon} alt="show sidebar icon" />
        </ShowSidebarStyles>
    )
}