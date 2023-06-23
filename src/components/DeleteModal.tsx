import { HeadingL } from '../styledComponents/header/HeadingL';
import { MediumText } from '../styledComponents/text/MediumText';
import './DeleteModal.css';
import { SmallDestructive, SmallSecondary, StyledButton } from './StyledButton';

export function DeleteModal(props: {
    name: 'task' | 'board', 
    text: string,
    handleDelete: () => void;
    hideModal: () => void;
}) {

    function handleDelete() {
        props.handleDelete();
        props.hideModal();
    }

    return (
        <div className='delete-modal'>
            <HeadingL>Delete this {props.name}?</HeadingL>
            <MediumText>{props.text}</MediumText>
            <div className='action-buttons'>
                <StyledButton buttonProps={SmallDestructive} label={'Delete'} onClick={handleDelete} isDisabled={false}/>
                <StyledButton buttonProps={SmallSecondary} label={'Cancel'} onClick={props.hideModal} isDisabled={false}/>
            </div>
        </div>
    )
}