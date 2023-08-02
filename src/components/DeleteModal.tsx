import { HeadingL } from './styles/header/HeadingL';
import { MediumText } from './styles/text/MediumText';
import { DeleteModalStyles, DeleteModalActionStyles } from './styles/DeleteModal.styles';
import { StyledButton } from './StyledButton';
import { SmallDestructive, SmallSecondary } from './styles/StyledButton.styles';

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
        <DeleteModalStyles>
            <HeadingL>Delete this {props.name}?</HeadingL>
            <MediumText>{props.text}</MediumText>
            <DeleteModalActionStyles>
                <StyledButton testId='delete-modal-delete' buttonProps={SmallDestructive} label={'Delete'} onClick={handleDelete} isDisabled={false}/>
                <StyledButton testId='delete-modal-cancel' buttonProps={SmallSecondary} label={'Cancel'} onClick={props.hideModal} isDisabled={false}/>
            </DeleteModalActionStyles>
        </DeleteModalStyles>
    )
}