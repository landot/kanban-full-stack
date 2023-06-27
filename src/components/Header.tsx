import { HeadingL } from "./styles/header/HeadingL";
import { MoreAction, MoreActionItem } from "./MoreAction";
import { Board } from "../types/data";
import chevronDown from "../assets/images/icon-chevron-down.svg";
import chevronUp from "../assets/images/icon-chevron-up.svg";
import useWindowSize from "../utils/useWindowSize";
import logoDark from '../assets/images/logo-dark.svg';
import logoLight from '../assets/images/logo-light.svg';
import logoMobile from '../assets/images/logo-mobile.svg';
import { StyledButton } from "./StyledButton";
import { LargePrimary } from "./styles/StyledButton.styles";
import { HeaderStyles, HeaderContentStyles, HeaderTitleStyles, LightLogoStyles, DarkLogoStyles, Break, MobileLogoStyles, HeaderActionStyles } from "./styles/Header.styles";

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
            itemType: 'primary',
            action: () => props.handleEditBoard(true)
        },
        {
            text: 'Delete Board',
            itemType: 'destructive',
            action: () => props.handleDeleteBoard(true)
        },
    ]

    function handleDropdownClick() {
        if (size.width && size.width <= 500) {
            props.handleOpenMobileSidebar(prev => !prev);
        }
    }

    return (
        // todo remove this classname when app.css is refactored for styled components
        <HeaderStyles className="header">
            <HeaderContentStyles>
                <HeaderTitleStyles onClick={handleDropdownClick}>
                    {!props.showSidebar && size.width && size.width > 500 && (
                        <>
                            <LightLogoStyles src={logoLight} alt='logo-light' />
                            <DarkLogoStyles src={logoDark} alt='logo-dark' />
                            <Break/>
                        </>
                    )}
                    {size.width && size.width <= 500 && (
                        <MobileLogoStyles src={logoMobile} alt='logo-mobile' />
                    )}
                    <HeadingL>{boardExists ? props.board.name: 'Create a board'}</HeadingL>
                    {props.showSidebar && size.width && size.width <= 500 && (
                        <img src={chevronUp} alt='show boards icon'/>
                    )}
                    {!props.showSidebar && size.width && size.width <= 500 && (
                        <img src={chevronDown} alt='show boards icon'/>
                    )}
                </HeaderTitleStyles>
                {boardExists && (
                    <HeaderActionStyles>
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
                    </HeaderActionStyles>
                )}
            </HeaderContentStyles>
        </HeaderStyles>
    )
}