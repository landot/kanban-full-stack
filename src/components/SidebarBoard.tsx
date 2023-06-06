import { HeadingM } from '../styledComponents/header/HeadingM';
import { ReactComponent as BoardIcon } from '../../public/assets/images/icon-board.svg';
import { ReactComponent as HideIcon } from '../../public/assets/images/icon-hide-sidebar.svg';
import './SidebarBoard.css';


export function SidebarBoard(props: {
    text: string, 
    selected: boolean,
    handleClick: () => void,
    icon: 'board' | 'hide'
}) {
    return (
        <div 
            className={`sidebar-board${props.selected ? ' selected': ''}`}
            onClick={props.handleClick}
        >
            {props.icon === 'board' ? (
                <BoardIcon className='sidebar-icon' alt='board icon'/>
            ): (
                <HideIcon className='sidebar-icon' alt='hide icon'/>

            )}
            <HeadingM>{props.text}</HeadingM>
        </div>
    )
}