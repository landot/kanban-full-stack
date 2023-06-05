import { HeadingL } from "../styledComponents/header/HeadingL"
import { HeadingS } from "../styledComponents/header/HeadingS";
import { MediumText } from "../styledComponents/text/MediumText"
import { Checkbox } from "./SubtaskCheckbox"
import { Dropdown } from "./Dropdown";
import { MoreAction } from "./MoreAction";
import { Board, Subtask, Task } from "../types/data";
import { useAppDispatch } from "../../app/hooks";
import { addTask, deleteTask, getColumnsWithName, getSubtaskIndexWithId, updateTask } from "../../features/kanban/kanbanSlice";
import './ViewTaskModal.css';

export function ViewTaskModal(props: {
    task: Task, 
    statuses: string[],
    board: Board,
    handleEditTask: () => void,
    handleDeleteTask: () => void,
    handleUpdateSelectedColumnId: (columnId: string) => void,
    hideModal: () => void
}) {
    const dispatch = useAppDispatch()

    function getSubtaskRemainingText() {
        return (
            `${props.task.subtasks.filter(prop => prop.isCompleted).length} of ${props.task.subtasks.length}`
        )
    }

    function handleStatusUpdate(status: string) {
        if(status === props.task.status) return;
        const task = {...props.task};
        task.status = status;
        dispatch(deleteTask({
            boardId: props.board.id, 
            columnId: getColumnsWithName(props.task.status, props.board.columns)[0].id,
            taskId: props.task.id
        }))
        dispatch(addTask({
            boardId: props.board.id,
            task: task
        }))
        props.handleUpdateSelectedColumnId(getColumnsWithName(task.status, props.board.columns)[0].id);
    }

    function handleSubtaskCheckboxClick(subtaskId: string) {
        const task = {...props.task};
        const subtaskIndex = getSubtaskIndexWithId(subtaskId, props.task.subtasks);
        const subtasks = [...props.task.subtasks];
        subtasks[subtaskIndex] = {
            ...task.subtasks[subtaskIndex],
            isCompleted: !task.subtasks[subtaskIndex].isCompleted
        }
        task.subtasks = subtasks;
        dispatch(updateTask({
            boardId: props.board.id,
            columnId: getColumnsWithName(props.task.status, props.board.columns)[0].id,
            taskId: props.task.id,
            updatedTask: task
        }))
    }

    function handleEditTask() {
        props.hideModal();
        props.handleEditTask();
    }

    return (
        <div className="view-task">
            <div className='view-task-header'>
                <HeadingL>{props.task.title}</HeadingL>
                <MoreAction 
                    text="task"
                    handleDeleteClick={props.handleDeleteTask}
                    handleEditClick={handleEditTask}
                />
            </div>
            <MediumText>{props.task.description}</MediumText>
            <div className="subtask-section">
                <HeadingS>Subtasks ({getSubtaskRemainingText()})</HeadingS>
                {props.task.subtasks.map((subtask: Subtask) => {
                    return (
                        <Checkbox subtask={subtask} handleClick={() => handleSubtaskCheckboxClick(subtask.id)}/>
                    )
                })}
            </div>
            <div className="status-section">
                <MediumText>Current Status</MediumText>
                <Dropdown value={props.task.status} handleChange={(status: string) => handleStatusUpdate(status)} values={props.statuses}/>
            </div>
        </div>
    )
}