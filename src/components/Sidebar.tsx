import { HeadingM } from './styles/header/HeadingM';
import { ReactComponent as BoardIcon } from '../assets/images/icon-board.svg';
import { SidebarBoard } from './SidebarBoard';
import { HeadingS } from './styles/header/HeadingS';
import logoDark from '../assets/images/logo-dark.svg';
import logoLight from '../assets/images/logo-light.svg';
import { DarkModeToggle } from './DarkModeToggle';
import { Board } from '../types/data';
import './Sidebar.css';

export function Sidebar(props: {
    boards: Board[], 
    selectedBoardIndex: number, 
    handleToggleTheme: (theme: string) => void,
    handleAddBoard: (show: boolean) => void,
    handleBoardSelect: (boardId: string) => void,
    handleHideSidebar: () => void
}) {

    return (
        <div className='sidebar'>
            <div className='sidebar-boards'>
                <img className='logo-dark' src={logoDark} alt="logo" />
                <img className='logo-light' src={logoLight} alt="logo" />
                <HeadingS>ALL BOARDS ({props.boards.length})</HeadingS>
                {props.boards.map((board, index) => {
                    return (
                        <SidebarBoard 
                            key={board.id} 
                            text={board.name} 
                            selected={index === props.selectedBoardIndex} 
                            handleClick={() => props.handleBoardSelect(board.id)}
                            icon='board' 
                        />
                    )
                })}
                {/* open new board modal when this is clicked */}
                {/* todo maybe just make this a sidebarboard */}
                <div 
                    className='create-new-board'
                    onClick={() => props.handleAddBoard(true)}
                >
                    <BoardIcon />
                    <HeadingM>+ Create New Board</HeadingM>
                </div>
            </div>
            <div className='sidebar-settings'>
                <DarkModeToggle toggleTheme={props.handleToggleTheme}/>
                {/* todo eventually make icon configurable in sidebarboard */}
                <SidebarBoard 
                    text={'Hide Sidebar'} 
                    selected={false} 
                    handleClick={props.handleHideSidebar} 
                    icon='hide'
                />
            </div>
        </div>
    )
}