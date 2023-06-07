import eyeIcon from '../assets/images/icon-show-sidebar.svg';
import './ShowSidebar.css';

export function ShowSidebar(props: {handleClick: () => void}) {
    return (
        <div className='show-sidebar' onClick={props.handleClick}>
            <img src={eyeIcon} alt="show sidebar icon" />
        </div>
    )
}