import { HeadingL } from "../styledComponents/header/HeadingL";
import { ButtonLarge } from "./ButtonLarge";
import { MoreAction } from "./MoreAction";
import { Board } from "../types/data";
import chevronDown from "../assets/images/icon-chevron-down.svg";
import chevronUp from "../assets/images/icon-chevron-up.svg";
import useWindowSize from "../utils/useWindowSize";
import logoDark from '../assets/images/logo-dark.svg';
import logoLight from '../assets/images/logo-light.svg';
import logoMobile from '../assets/images/logo-mobile.svg';
import { ButtonSmall } from "./ButtonSmall";
import { useAppDispatch } from "../../app/hooks";
import { addDummyData } from "../../features/kanban/kanbanSlice";
import { logout } from "../utils/firebase/logOut";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { MediumText } from "../styledComponents/text/MediumText";
import './Header.css';

export function Header(props: {
    board: Board,
    showSidebar: boolean,
    handleOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>,
    handleDeleteBoard: React.Dispatch<React.SetStateAction<boolean>>,
    handleEditBoard: React.Dispatch<React.SetStateAction<boolean>>,
    handleAddTask: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const auth = useContext(AuthContext);
    const dispatch = useAppDispatch()
    const boardExists = props.board && props.board.id !== '';
    const size = useWindowSize();

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
                    <ButtonSmall label={"Add Dummy Data"} type={"primary"} onClick={() => dispatch(addDummyData())}/>
                    <ButtonSmall label={"Logout"} type={"primary"} onClick={() => logout()}/>
                </div>
                {boardExists && (
                    <div className='header-actions'>
                        <ButtonLarge 
                            label={size.width && size.width <= 500 ? '+': '+ Add New Task'} 
                            onClick={() => props.handleAddTask(true)} 
                            isDisabled={props.board.columns.length === 0}
                        />
                        <MoreAction 
                            text={"Board"} 
                            handleEditClick={() => props.handleEditBoard(true)} 
                            handleDeleteClick={() => props.handleDeleteBoard(true)} 
                        />
                    </div>
                )}
            </div>
            <div className="header-messages">
                {auth?.isAnonymous && (
                    // todo get this button set up to go to the register page
                    <>
                        <MediumText>You are logged in as a guest</MediumText>
                        <ButtonSmall label={"Create Account"} type={"primary"} onClick={() => null}/>
                    </>
                )}
            </div>
        </div>
    )
}