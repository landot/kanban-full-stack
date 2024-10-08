import { HeadingS } from './styles/header/HeadingS';
import { Dropdown } from './Dropdown';
import { TextField } from './TextField';
import DeleteIcon from '../assets/images/icon-cross.svg';
import { HeadingL } from './styles/header/HeadingL';
import { useState } from 'react';
import { Board, Task } from '../types/data';
import { getUUID } from '../utils/createUUID';
import { useAppDispatch } from '../../app/hooks';
import { addTask, deleteTask } from '../features/kanban/kanbanSlice';
import { getColumnsWithName } from '../utils/filterUtils';
import './UpdateTaskModal.css';
import { StyledButton } from './StyledButton';
import { SmallSecondary, SmallPrimary } from './styles/StyledButton.styles';

export interface ModalError {
    section: string;
    index?: number;
}

export function UpdateTaskModal(
    props: { 
        updateType: 'add' | 'edit',
        board: Board,
        statuses: string[],
        handleAddTask: (task: Task) => void,
        handleUpdateTask: (task: Task) => void,
        hideModal: () => void,
        prefill?: Task
    }) {
    const dispatch = useAppDispatch()
    const [taskInfo, setTaskInfo] = useState<Task>({
        id: getUUID(),
        title: props.prefill?.title || '',
        description: props.prefill?.description || '',
        subtasks: props.prefill && props.prefill.subtasks ? [...props.prefill.subtasks]: [
            {
                id: getUUID(),
                title: '',
                isCompleted: false
            },
            {
                id: getUUID(),
                title: '',
                isCompleted: false
            }
        ],
        status: props.prefill?.status || props.statuses[0],
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
                subtasks: prev.subtasks.concat({
                    id: getUUID(),
                    title: '',
                    isCompleted: false
                })
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
            const updatedSubtask = {...subtasks[index]};
            updatedSubtask.title = e.target.value;
            subtasks[index] = updatedSubtask;
            return {
                ...prev,
                subtasks: subtasks
            }
        })
    }

    function handleStatusUpdate(status: string) {
        setTaskInfo(prev => {
            return {
                ...prev,
                status: status
            }
        })
    }

    function handleUpdateTask() {
        if(taskInfo === props.prefill) return;
        if(taskInfo.status === props.prefill?.status) {
            props.handleUpdateTask(taskInfo);
        } else {
            dispatch(deleteTask({
                boardId: props.board.id, 
                // todo fix this later
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                columnId: getColumnsWithName(props.prefill!.status, props.board.columns)[0].id,
                // todo fix this later
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                taskId: props.prefill!.id
            }))
            dispatch(addTask({
                boardId: props.board.id,
                task: taskInfo
            }))
        }
    }

    function handleSubmit() {
        const newErrors = [];
        taskInfo.title === '' ? newErrors.push({section: 'title'}): null;
        taskInfo.description === '' ? newErrors.push({section: 'description'}): null;
        taskInfo.subtasks.map((subtask, index)=> {
            if(subtask.title === '') {
                newErrors.push({section: 'subtask', index: index});
            }
        })
        setErrors(newErrors);
        if(newErrors.length > 0) {
            // todo make better
            console.log('errors occurred. task not created')
        } else {
            props.hideModal();
            if(props.updateType === 'add') {
                props.handleAddTask(taskInfo);
            } else {
                handleUpdateTask();
            }
        }
    }

    return (
        <div className='update-task'>
            <HeadingL>{props.updateType} Task</HeadingL>
            <div className='section title-section'>
                <HeadingS>Title</HeadingS>
                <TextField 
                    testId={'task-title'}
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
                    testId={'task-description'}
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
                        <div 
                            data-testid='edit-subtask' 
                            className='edit-subtask' 
                            key={index}
                        >
                            <TextField 
                                showValidationError={errors.some(e => e.section === 'subtask' && e.index === index)} 
                                placeholder='e.g. Make coffee' 
                                value={subtask.title}
                                handleChange={(e) => handleSubtaskEdit(e, index)} 
                            />
                            <img 
                                data-testid='delete-subtask'
                                src={DeleteIcon} 
                                alt="delete subtask" 
                                onClick={() => handleDeleteSubtask(index)}
                            />
                        </div>
                    )
                })}
                <StyledButton 
                    buttonProps={SmallSecondary}
                    label='+ Add New Subtask' 
                    onClick={handleNewSubtask}
                    isDisabled={false}
                />
            </div>
            <div className='section status-section'>
                <HeadingS>Status</HeadingS>
                <Dropdown values={props.statuses} value={taskInfo.status} handleChange={handleStatusUpdate}/>
            </div>
            <StyledButton 
                testId='update-task-submit'
                buttonProps={SmallPrimary}
                label={props.updateType === 'add' ? 'Create Task': 'Save changes'} 
                onClick={handleSubmit}
                isDisabled={false}
            />
        </div>
    )
}