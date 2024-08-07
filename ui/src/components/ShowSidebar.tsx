import eyeIcon from '../assets/images/icon-show-sidebar.svg';
import { ShowSidebarStyles } from './styles/ShowSidebar.styles';

export function ShowSidebar(props: {handleClick: () => void}) {

    function handleKeyPress(e: React.KeyboardEvent) {
        if(e.key === 'Enter') {
            e.preventDefault();
            props.handleClick();
        }
    }

    return (
        <ShowSidebarStyles tabIndex={0} data-testid='show-sidebar' onClick={props.handleClick} onKeyDown={handleKeyPress}>
            <img src={eyeIcon} alt="show sidebar icon" />
        </ShowSidebarStyles>
    )
}