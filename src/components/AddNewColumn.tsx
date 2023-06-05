import { HeadingM } from "../styledComponents/header/HeadingM";
import './AddNewColumn.css';

export function AddNewColumn(props: {handleClick: () => void}) {
    return (
        <div className='add-new-column' onClick={props.handleClick}>
            <HeadingM>+ New Column</HeadingM>
        </div>
    )
}