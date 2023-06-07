import { HeadingL } from "../styledComponents/header/HeadingL";
import { ButtonLarge } from "./ButtonLarge";
import { MoreAction } from "./MoreAction";
import './Header.css';

export function Header(props: {
    boardName: string, 
    handleDeleteBoard: (show: boolean) => void,
    handleEditBoard: (show: boolean) => void,
    handleAddTask: (show: boolean) => void
}) {
    const boardExists = props.boardName !== '';
    return (
        <div className='header'>
            <div className="header-title">
                <HeadingL>{boardExists ? props.boardName: 'Create a board'}</HeadingL>
            </div>
            {boardExists && (
                <div className='header-actions'>
                    <ButtonLarge label={'+ Add New Task'} onClick={() => props.handleAddTask(true)} />
                    {/* add configurable left css  */}
                    <MoreAction 
                        text={"Board"} 
                        handleEditClick={() => props.handleEditBoard(true)} 
                        handleDeleteClick={() => props.handleDeleteBoard(true)} 
                    />
                </div>
            )}
        </div>
    )
}