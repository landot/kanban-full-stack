import { HeadingL } from "../styledComponents/header/HeadingL";
import { ButtonLarge } from "./ButtonLarge";
import { MoreAction } from "./MoreAction";
import logoDark from '../../public/assets/images/logo-dark.svg';
import logoLight from '../../public/assets/images/logo-light.svg';
import './Header.css';

export function Header(props: {
    boardName: string, 
    handleDeleteBoard: (show: boolean) => void,
    handleEditBoard: (show: boolean) => void,
    handleAddTask: (show: boolean) => void
}) {
    return (
        <div className='header'>
            <div className="header-title">
                {/* todo see if this is even needed later */}
                {/* <img src={logoDark} alt="logo" />
                <hr /> */}
                <HeadingL>{props.boardName}</HeadingL>
            </div>
            <div className='header-actions'>
                <ButtonLarge label={'+ Add New Task'} onClick={() => props.handleAddTask(true)} />
                {/* add configurable left css  */}
                <MoreAction 
                    text={"Board"} 
                    handleEditClick={() => props.handleEditBoard(true)} 
                    handleDeleteClick={() => props.handleDeleteBoard(true)} 
                />
            </div>
        </div>
    )
}