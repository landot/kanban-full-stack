import { HeadingL } from '../styledComponents/header/HeadingL';
import { MediumText } from '../styledComponents/text/MediumText';
import { ButtonSmall } from './ButtonSmall';
import './DeleteModal.css';


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
                <ButtonSmall label={'Delete'} type={'destructive'} onClick={handleDelete}/>
                <ButtonSmall label={'Cancel'} type={'secondary'} onClick={props.hideModal}/>
            </div>
        </div>
    )
}