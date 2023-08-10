import { HeadingM } from './styles/header/HeadingM';
import { ReactComponent as BoardIcon } from '../assets/images/icon-board.svg';
import { ReactComponent as HideIcon } from '../assets/images/icon-hide-sidebar.svg';
import './SidebarBoard.css';


export function SidebarBoard(props: {
    text: string, 
    selected: boolean,
    handleClick: () => void,
    icon: 'board' | 'hide'
}) {

    function handleKeyPress(e: React.KeyboardEvent) {
        if(e.key === 'Enter') {
            e.preventDefault();
            props.handleClick();
        }
    }

    return (
        <div 
            tabIndex={0}
            data-testid={`sidebar-board${props.selected ? ' selected': ''}`}
            className={`sidebar-board${props.selected ? ' selected': ''}`}
            onClick={props.handleClick}
            onKeyDown={handleKeyPress}
        >
            {props.icon === 'board' ? (
                // todo fix later
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <BoardIcon data-testid='board-icon' className='sidebar-icon' alt='board icon'/>
            ): (
                // todo fix later
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <HideIcon data-testid='hide-icon' className='sidebar-icon' alt='hide icon'/>

            )}
            <HeadingM>{props.text}</HeadingM>
        </div>
    )
}