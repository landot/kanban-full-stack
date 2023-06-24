import { HeadingL } from "./styles/header/HeadingL";
import { MoreAction, MoreActionItem } from "./MoreAction";
import { Board } from "../types/data";
import chevronDown from "../assets/images/icon-chevron-down.svg";
import chevronUp from "../assets/images/icon-chevron-up.svg";
import useWindowSize from "../utils/useWindowSize";
import logoDark from '../assets/images/logo-dark.svg';
import logoLight from '../assets/images/logo-light.svg';
import logoMobile from '../assets/images/logo-mobile.svg';
import './Header.css';
import { StyledButton } from "./StyledButton";
import { LargePrimary } from "./styles/StyledButton.styles";

export function Header(props: {
    board: Board,
    showSidebar: boolean,
    handleOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>,
    handleDeleteBoard: React.Dispatch<React.SetStateAction<boolean>>,
    handleEditBoard: React.Dispatch<React.SetStateAction<boolean>>,
    handleAddTask: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const boardExists = props.board && props.board.id !== '';
    const size = useWindowSize();
    const boardMoreActionsItem: MoreActionItem[] = [
        {
            text: 'Edit Board',
            class: 'edit',
            action: () => props.handleEditBoard(true)
        },
        {
            text: 'Delete Board',
            class: 'delete',
            action: () => props.handleDeleteBoard(true)
        },
    ]

    function handleDropdownClick() {
        if (size.width && size.width <= 500) {
            props.handleOpenMobileSidebar(prev => !prev);
        }
    }

    return (
        <div className='header'>
            <div className='header-content'>
                <div className="header-title" onClick={handleDropdownClick}>
                    {!props.showSidebar && size.width && size.width > 500 && (
                        <>
                            <img className='logo-light' src={logoLight} alt='logo-light' />
                            <img className='logo-dark' src={logoDark} alt='logo-dark' />
                            <div className='break'/>
                        </>
                    )}
                    {size.width && size.width <= 500 && (
                        <img className='logo-mobile' src={logoMobile} alt='logo-mobile' />
                    )}
                    <HeadingL>{boardExists ? props.board.name: 'Create a board'}</HeadingL>
                    {props.showSidebar && size.width && size.width <= 500 && (
                        <img src={chevronUp} alt='show boards icon'/>
                    )}
                    {!props.showSidebar && size.width && size.width <= 500 && (
                        <img src={chevronDown} alt='show boards icon'/>
                    )}
                </div>
                {boardExists && (
                    <div className='header-actions'>
                        <StyledButton 
                            label={size.width && size.width <= 500 ? '+': '+ Add New Task'} 
                            onClick={() => props.handleAddTask(true)} 
                            isDisabled={props.board.columns.length === 0}
                            buttonProps={LargePrimary}
                        />
                        <MoreAction 
                            actionItemName="Board"
                            items={boardMoreActionsItem}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}