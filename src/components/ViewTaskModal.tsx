import { HeadingL } from "../styledComponents/header/HeadingL"
import { HeadingS } from "../styledComponents/header/HeadingS";
import { MediumText } from "../styledComponents/text/MediumText"
import { Checkbox } from "./SubtaskCheckbox"
import { Dropdown } from "./Dropdown";
import { MoreAction } from "./MoreAction";
import { Board, Subtask, Task } from "../types/data";
import { useAppDispatch } from "../../app/hooks";
import { addTask, deleteTask, getColumnsWithName } from "../../features/kanban/kanbanSlice";
import './ViewTaskModal.css';

export function ViewTaskModal(props: {
    task: Task, 
    statuses: string[],
    board: Board,
    handleDeleteTask: () => void,
    handleUpdateSelectedColumnId: (columnId: string) => void
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

    // still not working properly
    function handleSubtaskCheckboxClick(subtaskId: string) {
        // console.log(subtaskId)
        // const task = {...props.task};
        // // console.log('task before', task)
        // const subtaskIndex = getSubtaskIndexWithId(subtaskId, props.task.subtasks);
        // // console.log(subtaskIndex)
        // const subtasks = [...props.task.subtasks];
        // // console.log('subtask before', subtasks[subtaskIndex].isCompleted)
        // subtasks[subtaskIndex] = {
        //     ...task.subtasks[subtaskIndex],
        //     isCompleted: !task.subtasks[subtaskIndex].isCompleted
        // }
        // // console.log('subtask after', subtasks[subtaskIndex].isCompleted)
        // task.subtasks = subtasks;
        // // console.log('task after', task)
        // dispatch(updateTask({
        //     boardId: props.board.id,
        //     columnId: getColumnsWithName(props.task.status, props.board.columns)[0].id,
        //     taskId: props.task.id,
        //     updatedTask: task
        // }))
    }

    return (
        <div className="view-task">
            <div className='view-task-header'>
                <HeadingL>{props.task.title}</HeadingL>
                <MoreAction 
                    // todo fill these in
                    text="task"
                    handleDeleteClick={props.handleDeleteTask}
                    handleEditClick={() => null}
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
                {/* todo handle status changes */}
                <Dropdown value={props.task.status} handleChange={(status: string) => handleStatusUpdate(status)} values={props.statuses}/>
            </div>
        </div>
    )
}