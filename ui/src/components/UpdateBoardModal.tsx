import { ChangeEvent, useState } from 'react';
import { HeadingL } from './styles/header/HeadingL';
import { HeadingS } from './styles/header/HeadingS';
import { TextField } from './TextField';
import { ModalError } from './UpdateTaskModal';
import DeleteIcon from '../assets/images/icon-cross.svg';
import './UpdateBoardModal.css';
import { Board } from '../types/data';
import { getUUID } from '../utils/createUUID';
import { generateRandomHex } from '../utils/generateRandomHex';
import { BoardUpdateValue } from '../features/kanban/kanbanSlice';
import { StyledButton } from './StyledButton';
import { SmallSecondary, SmallPrimary } from './styles/StyledButton.styles';

// todo create a common component with the general layout of an update model ie: title, padding, content since this duplicates logic
export function UpdateBoardModal(
    props: {
        updateType: 'add' | 'edit',
        handleAddBoard: (board: Board) => void,
        handleUpdateBoard: (boardId: string, values: BoardUpdateValue) => void,
        hideModal: () => void,
        prefill?: Board
    }
) {
    const [boardInfo, setBoardInfo] = useState<Board>({
        id: props.prefill?.id || getUUID(),
        name: props.prefill?.name || '',
        columns: props.prefill?.columns || [
            {
                id: getUUID(),
                name: '',
                tasks: [],
                color: generateRandomHex()
            },
            {
                id: getUUID(),
                name: '',
                tasks: [],
                color: generateRandomHex()
            }
        ]
    });
    const [errors, setErrors] = useState<ModalError[]>([]);

    function handleNameUpdate(e: ChangeEvent<HTMLInputElement>) {
        setBoardInfo(prev => {
            return {
                ...prev,
                name: e.target.value
            }
        })
    }

    function handleDeleteColumn(deleteIndex: number) {
        setBoardInfo(prev => {
            return {
                ...prev,
                columns: prev.columns.filter((_column, index) => index !== deleteIndex)
            }
        })
    }

    function handleColumnEdit(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        setBoardInfo(prev => {
            const columns = [...prev.columns];
            const columnToUpdate = {...columns[index]}
            columnToUpdate.name = e.target.value;
            columns[index] = columnToUpdate;
            return {
                ...prev,
                columns: columns
            }
        })
    }

    function handleNewColumn() {
        setBoardInfo(prev => {
            return {
                ...prev,
                columns: prev.columns.concat({
                    id: getUUID(),
                    name: '',
                    tasks: [],
                    color: generateRandomHex()
                })
            }
        })
    }

    function handleSubmit() {
        const newErrors = [];
        boardInfo.name === '' ? newErrors.push({section: 'name'}): null;
        boardInfo.columns.map((column, index)=> {
            if(column.name === '') {
                newErrors.push({section: 'column', index: index});
            }
        })
        setErrors(newErrors);
        if(newErrors.length > 0) {
            // todo make better
            console.log('errors occurred. task not created')
            return
        }
        if(props.updateType === 'add') {
            props.handleAddBoard(boardInfo);
        } else {
            props.handleUpdateBoard(boardInfo.id, boardInfo);

        }
        props.hideModal();
    }

    function handleDeleteKeyPress(e: React.KeyboardEvent, index: number) {
        if(e.key === 'Enter') {
            e.preventDefault();
            handleDeleteColumn(index);
        }
    }

    return (
        <div className='update-board'>
            <HeadingL data-testid='update-board-header'>{props.updateType === 'add' ? 'add new': props.updateType} Board</HeadingL>
            <div className='section name'>
                <HeadingS>Name</HeadingS> 
                <TextField 
                    testId='name'
                    showValidationError={errors.some(e => e.section === 'name')} 
                    placeholder='e.g. Web Design' 
                    value={boardInfo.name} 
                    handleChange={(e: ChangeEvent<HTMLInputElement>) =>  handleNameUpdate(e) } 
                />   
            </div>   
            <div className='section update-columns'>
                <HeadingS>Columns</HeadingS> 
                {boardInfo.columns.map((column, index) => {
                    return (
                        <div className='edit-column' key={index}>
                            <TextField 
                                testId='column'
                                showValidationError={errors.some(e => e.section === 'column' && e.index === index)} 
                                placeholder='e.g. Todo' 
                                value={column.name}
                                handleChange={(e) => handleColumnEdit(e, index)} 
                            />
                            <img 
                                tabIndex={0}
                                data-testid='column-delete'
                                src={DeleteIcon} 
                                alt="delete column" 
                                onClick={() => handleDeleteColumn(index)}
                                onKeyDown={(e) => handleDeleteKeyPress(e, index)}
                            />
                        </div>
                    )
                })}
                <StyledButton 
                    testId='add-column'
                    buttonProps={SmallSecondary}
                    label='+ Add New Column' 
                    onClick={handleNewColumn}
                    isDisabled={false}
                />
            </div>         
            <div className='section submit'>
                <StyledButton 
                    testId='update-board-submit'
                    buttonProps={SmallPrimary}
                    label={props.updateType === 'add' ? 'Create New Board': 'Save Changes'} 
                    onClick={handleSubmit}
                    isDisabled={false}
                />
            </div>
        </div>
    )
}