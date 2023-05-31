import { ChangeEvent, useState } from 'react';
import { HeadingL } from '../styledComponents/header/HeadingL';
import { HeadingS } from '../styledComponents/header/HeadingS';
import { TextField } from './TextField';
import { ButtonSmall } from './ButtonSmall';
import { ModalError } from './UpdateTaskModal';
import DeleteIcon from '../../public/assets/images/icon-cross.svg';
import './UpdateBoardModal.css';

// todo update css and remove debug marks
export function UpdateBoardModal(
    props: {
        updateType: 'add' | 'edit',
        prefill?: {
            name: string,
            columns: string[]
        }
    }
) {
    const [boardInfo, setBoardInfo] = useState({
        name: props.prefill?.name || '',
        columns: props.prefill?.columns || []
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
            columns[index] = e.target.value;
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
                columns: prev.columns.concat('')
            }
        })
    }

    function handleSubmit() {
        const newErrors = [];
        boardInfo.name === '' ? newErrors.push({section: 'name'}): null;
        boardInfo.columns.map((column, index)=> {
            if(column === '') {
                newErrors.push({section: 'column', index: index});
            }
        })
        setErrors(newErrors);
        if(newErrors.length > 0) {
            console.log('errors occurred. task not created')
        } else {
            // something here to add a task to the main dashboard
        }
    }

    return (
        <div className='update-board'>
            <p>{boardInfo.name}</p>
            <p>{boardInfo.columns.toString()}</p>
            <p>{JSON.stringify(errors)}</p>
            <HeadingL>{props.updateType} New Board</HeadingL>
            <div className='section name'>
                <HeadingS>Name</HeadingS> 
                <TextField 
                    showValidationError={false} 
                    placeholder='e.g. Web Design' 
                    value={boardInfo.name} 
                    handleChange={(e: ChangeEvent<HTMLInputElement>) =>  handleNameUpdate(e) } />   
            </div>   
            <div>
                <HeadingS>Columns</HeadingS> 
                {boardInfo.columns.map((column, index) => {
                    return (
                        <div className='edit-column' key={index}>
                            <TextField 
                                showValidationError={errors.some(e => e.section === 'column' && e.index === index)} 
                                placeholder='e.g. Todo' 
                                value={column}
                                handleChange={(e) => handleColumnEdit(e, index)} 
                            />
                            <img 
                                src={DeleteIcon} 
                                alt="delete column" 
                                onClick={() => handleDeleteColumn(index)}
                            />
                        </div>
                    )
                })}
                <ButtonSmall 
                    label='+ Add New Subtask' 
                    type='secondary'
                    onClick={handleNewColumn}
                />
                <ButtonSmall 
                    label={props.updateType === 'add' ? 'Create New Board': 'Save Changes'} 
                    type='primary' 
                    onClick={handleSubmit}
                />
            </div>         
        </div>
    )
}