import { HeadingM } from '../styledComponents/header/HeadingM';
import { ReactComponent as BoardIcon } from '../../public/assets/images/icon-board.svg';
import { SidebarBoard } from './SidebarBoard';
import { HeadingS } from '../styledComponents/header/HeadingS';
import logoDark from '../../public/assets/images/logo-dark.svg';
import logoLight from '../../public/assets/images/logo-light.svg';
import './Sidebar.css';
import { DarkModeToggle } from './DarkModeToggle';

export function Sidebar(props: {boards: string[], selectedBoardIndex: number, handleToggleTheme: (theme: string) => void}) {

    return (
        <div className='sidebar'>
            <div>
                <img src={logoDark} alt="logo" />
                <HeadingS>ALL BOARDS ({props.boards.length})</HeadingS>
                {props.boards.map((board, index) => {
                    return (
                        <SidebarBoard text={board} selected={index === props.selectedBoardIndex} />
                    )
                })}
                {/* open new board modal when this is clicked */}
                {/* todo maybe just make this a sidebarboard */}
                <div className='create-new-board'>
                    <BoardIcon />
                    <HeadingM>+ Create New Board</HeadingM>
                </div>
            </div>
            <div>
                <DarkModeToggle toggleTheme={props.handleToggleTheme}/>
                {/* todo eventually make icon configurable in sidebarboard */}
                <SidebarBoard text={'Hide Sidebar'} selected={false} />
            </div>
        </div>
    )
}