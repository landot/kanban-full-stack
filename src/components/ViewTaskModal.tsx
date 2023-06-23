import { HeadingL } from "./styles/header/HeadingL"
import { HeadingS } from "./styles/header/HeadingS";
import { Checkbox } from "./SubtaskCheckbox"
import { Dropdown } from "./Dropdown";
import { MoreAction, MoreActionItem } from "./MoreAction";
import { Board, Subtask, Task } from "../types/data";
import { useAppDispatch } from "../../app/hooks";
import { addTask, deleteTask, updateTask } from "../../features/kanban/kanbanSlice";
import { getColumnsWithName } from "../utils/filterUtils";
import { getSubtaskIndexWithId } from "../utils/findIndexUtils";
import './ViewTaskModal.css';
import { MediumText } from "./styles/text/MediumText";

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
    const taskMoreActionsItem: MoreActionItem[] = [
        {
            text: 'Edit Task',
            class: 'edit',
            action: () => handleEditTask()
        },
        {
            text: 'Delete Task',
            class: 'delete',
            action: () => props.handleDeleteTask()
        },
    ]

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
            <div className='section view-task-header'>
                <HeadingL>{props.task.title}</HeadingL>
                <MoreAction
                    actionItemName="Task"
                    items={taskMoreActionsItem}
                />
            </div>
            <MediumText>{props.task.description}</MediumText>
            <div className="section subtask-section">
                <HeadingS>Subtasks ({getSubtaskRemainingText()})</HeadingS>
                {props.task.subtasks.map((subtask: Subtask) => {
                    return (
                        <Checkbox subtask={subtask} handleClick={() => handleSubtaskCheckboxClick(subtask.id)}/>
                    )
                })}
            </div>
            <div className="section status-section">
                <HeadingS>Current Status</HeadingS>
                <Dropdown value={props.task.status} handleChange={(status: string) => handleStatusUpdate(status)} values={props.statuses}/>
            </div>
        </div>
    )
}