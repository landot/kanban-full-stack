import { HeadingL } from "../styledComponents/header/HeadingL"
import { HeadingS } from "../styledComponents/header/HeadingS";
import { MediumText } from "../styledComponents/text/MediumText"
import { Checkbox } from "./SubtaskCheckbox"
import { Dropdown } from "./Dropdown";
import { SubtaskMoreAction } from "./SubtaskMoreAction";
import './ViewTaskModal.css';

export interface Subtask {
    description: string;
    completed: boolean;
}

export function ViewTaskModal(
    props: {
        title: string, 
        description: string, 
        subtasks: Subtask[],
        status: 'done' | 'doing' | 'todo'
    }) {

    function getSubtaskRemainingText() {
        return (
            `${props.subtasks.filter(prop => prop.completed).length} of ${props.subtasks.length}`
        )
    }

    return (
        <div className="view-task">
            <div className='view-task-header'>
                <HeadingL>{props.title}</HeadingL>
                <SubtaskMoreAction 
                    // todo fill these in
                    handleDeleteClick={() => null}
                    handleEditClick={() => null}
                />
            </div>
            <MediumText>{props.description}</MediumText>
            <div className="subtask-section">
                <HeadingS>Subtasks ({getSubtaskRemainingText()})</HeadingS>
                {props.subtasks.map((subtask: Subtask) => {
                    return (
                        <Checkbox text={subtask.description} completed={subtask.completed}/>
                    )
                })}
            </div>
            <div className="status-section">
                <MediumText>Current Status</MediumText>
                {/* todo handle status changes */}
                <Dropdown value={props.status} handleChange={() => null}/>
            </div>
        </div>
    )
}