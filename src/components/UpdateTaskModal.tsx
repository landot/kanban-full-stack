import { HeadingS } from '../styledComponents/header/HeadingS';
import { ButtonSmall } from './ButtonSmall';
import { Dropdown } from './Dropdown';
import { TextField } from './TextField';
import DeleteIcon from '../../public/assets/images/icon-cross.svg';
import { HeadingL } from '../styledComponents/header/HeadingL';
import { useState } from 'react';
import './UpdateTaskModal.css';


interface Task {
    title: string;
    description: string;
    subtasks: string[];
    status: 'todo' | 'doing' | 'done' // todo turn into enum
}

export interface ModalError {
    section: string;
    index?: number;
}

export function UpdateTaskModal(
    props: { 
        updateType: 'add' | 'edit' 
        prefill?: {
            title: string,
            description: string,
            subtasks: string[],
            status: 'todo' | 'doing' | 'done' // todo turn into enum
        }
    }) {
    const [taskInfo, setTaskInfo] = useState<Task>({
        title: props.prefill?.title || '',
        description: props.prefill?.description || '',
        subtasks: props.prefill?.subtasks || ['', ''],
        status: props.prefill?.status || 'todo'
    });
    const [errors, setErrors] = useState<ModalError[]>([]);

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskInfo(prev => {
            return {
                ...prev,
                title: e.target.value
            }
        })
    }

    function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskInfo(prev => {
            return {
                ...prev,
                description: e.target.value
            }
        })
    }
    
    function handleNewSubtask() {
        setTaskInfo(prev => {
            return {
                ...prev,
                subtasks: prev.subtasks.concat('')
            }
        })
    }

    function handleDeleteSubtask(deleteIndex: number) {
        setTaskInfo(prev => {
            return {
                ...prev,
                subtasks: prev.subtasks.filter((_subtask, index) => index !== deleteIndex)
            }
        })
    }

    function handleSubtaskEdit(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        setTaskInfo(prev => {
            const subtasks = [...prev.subtasks];
            subtasks[index] = e.target.value;
            return {
                ...prev,
                subtasks: subtasks
            }
        })
    }

    function handleStatusUpdate(status: 'todo' | 'doing' | 'done') {
        setTaskInfo(prev => {
            return {
                ...prev,
                status: status
            }
        })
    }

    function handleSubmit() {
        const newErrors = [];
        taskInfo.title === '' ? newErrors.push({section: 'title'}): null;
        taskInfo.description === '' ? newErrors.push({section: 'description'}): null;
        taskInfo.subtasks.map((subtask, index)=> {
            if(subtask === '') {
                newErrors.push({section: 'subtask', index: index});
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
        <div className='update-task'>
            <HeadingL>{props.updateType} New Task</HeadingL>
            <div className='section title-section'>
                <HeadingS>Title</HeadingS>
                <TextField 
                    showValidationError={errors.some(e => e.section === 'title')} 
                    placeholder='e.g. Take coffee break'
                    value={taskInfo.title}
                    handleChange={(e) => handleTitleChange(e)}
                />
            </div>
            <div className='section description-section'>
                <HeadingS>Description</HeadingS>
                {/* todo increase description size (replace with textarea?) */}
                <TextField 
                    showValidationError={errors.some(e => e.section === 'description')} 
                    placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                    value={taskInfo.description} 
                    handleChange={(e) => handleDescriptionChange(e)}
                />
            </div>
            <div className='section subtask-section'>
                <HeadingS>Subtasks</HeadingS>
                {taskInfo.subtasks.map((subtask, index) => {
                    return (
                        <div className='edit-subtask' key={index}>
                            <TextField 
                                showValidationError={errors.some(e => e.section === 'subtask' && e.index === index)} 
                                placeholder='e.g. Make coffee' 
                                value={subtask}
                                handleChange={(e) => handleSubtaskEdit(e, index)} 
                            />
                            <img 
                                src={DeleteIcon} 
                                alt="delete subtask" 
                                onClick={() => handleDeleteSubtask(index)}
                            />
                        </div>
                    )
                })}
                <ButtonSmall 
                    label='+ Add New Subtask' 
                    type='secondary'
                    onClick={handleNewSubtask}
                />
            </div>
            <div className='section status-section'>
                <HeadingS>Status</HeadingS>
                <Dropdown value={taskInfo.status} handleChange={handleStatusUpdate}/>
            </div>
            <ButtonSmall 
                label={props.updateType === 'add' ? 'Create Task': 'Save changes'} 
                type='primary' 
                onClick={handleSubmit}
            />
            
            {/* for debugging */}
            <>
                <p>{JSON.stringify(taskInfo)}</p>
                <p>{JSON.stringify(errors)}</p>
            </>
        </div>
    )
}