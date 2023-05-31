import { HeadingL } from "../styledComponents/header/HeadingL";
import { ButtonLarge } from "./ButtonLarge";
import { MoreAction } from "./MoreAction";
import logoDark from '../../public/assets/images/logo-dark.svg';
import logoLight from '../../public/assets/images/logo-light.svg';
import './Header.css';

export function Header(props: {boardName: string}) {
    return (
        <div className='header'>
            <div className="header-title">
                <img src={logoDark} alt="logo" />
                <hr />
                <HeadingL>{props.boardName}</HeadingL>
            </div>
            <div className='header-actions'>
                <ButtonLarge label={'+ Add New Task'} />
                {/* add configurable left css  */}
                <MoreAction text={"Board"} handleEditClick={() => null} handleDeleteClick={() => null} />
            </div>
        </div>
    )
}