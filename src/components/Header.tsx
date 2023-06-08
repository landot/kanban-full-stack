import { HeadingL } from "../styledComponents/header/HeadingL";
import { ButtonLarge } from "./ButtonLarge";
import { MoreAction } from "./MoreAction";
import { Board } from "../types/data";
import './Header.css';
import useWindowSize from "../utils/useWindowSize";

export function Header(props: {
    board: Board,
    handleDeleteBoard: (show: boolean) => void,
    handleEditBoard: (show: boolean) => void,
    handleAddTask: (show: boolean) => void
}) {
    const boardExists = props.board && props.board.id !== '';
    const size = useWindowSize();

    return (
        <div className='header'>
            <div className="header-title">
                <HeadingL>{boardExists ? props.board.name: 'Create a board'}</HeadingL>
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
    )
}