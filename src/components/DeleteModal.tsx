import { HeadingL } from './styles/header/HeadingL';
import './DeleteModal.css';
import { SmallDestructive, SmallSecondary, StyledButton } from './StyledButton';
import { MediumText } from './styles/text/MediumText';

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