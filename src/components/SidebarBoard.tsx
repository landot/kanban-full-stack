import { HeadingM } from '../styledComponents/header/HeadingM';
import { ReactComponent as BoardIcon } from '../../public/assets/images/icon-board.svg';
import './SidebarBoard.css';


export function SidebarBoard(props: {
    text: string, 
    selected: boolean,
    handleClick: () => void
}) {
    return (
        <div 
            className={`sidebar-board${props.selected ? ' selected': ''}`}
            onClick={props.handleClick}
        >
            <BoardIcon className='board-icon' alt='board icon'/>
            <HeadingM>{props.text}</HeadingM>
        </div>
    )
}