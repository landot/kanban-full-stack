import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Status } from "../../src/types/data";
import { getUUID } from "../../src/utils/createUUID";
import { addBoard, addTask, deleteBoard, deleteTask, selectKanban } from './kanbanSlice';

export function KanbanTest() {
    const kanban = useAppSelector(selectKanban)
    const dispatch = useAppDispatch()
    const [deleteValue, setDeleteValue] = useState('');
    const [addTaskBoard, setAddTaskBoard] = useState('');
    const [addTaskValue, setAddTaskValue] = useState('');
    const [addTaskColumn, setAddTaskColumn] = useState('');
    const [deleteTaskBoard, setDeleteTaskBoard] = useState('');
    const [deleteTaskValue, setDeleteTaskValue] = useState('');
    const [deleteTaskColumn, setDeleteTaskColumn] = useState('');

    return (
        <div>
            <button onClick={() => dispatch(addBoard({
                name: getUUID(),
                id: getUUID(),
                columns: []
            }))}>add board</button>
            <hr />
            <input type="text" value={deleteValue} onChange={(e) => setDeleteValue(e.target.value)} placeholder='enter board id to delete' />
            <button onClick={() => dispatch(deleteBoard(deleteValue))}>delete board</button>
            <hr />
            <p>{addTaskBoard}</p>
            <p>{addTaskValue}</p>
            <p>{addTaskColumn}</p>
            <input type="text" value={addTaskBoard} onChange={(e) => setAddTaskBoard(e.target.value)} placeholder='enter board id to add task to' />
            <input type="text" value={addTaskValue} onChange={(e) => setAddTaskValue(e.target.value)} placeholder='task text' />
            <input type="text" value={addTaskColumn} onChange={(e) => setAddTaskColumn(e.target.value)} placeholder='task column' />

            <button onClick={
                () => dispatch(
                    addTask({
                        boardId: addTaskBoard, 
                        columnId: addTaskColumn, 
                        task: {
                            id: getUUID(),
                            title: addTaskValue,
                            description: `description for ${addTaskValue}`,
                            status: Status.Doing,
                            subtasks: [
                              {
                                id: getUUID(),
                                title: 'title',
                                isCompleted: false
                              }
                            ]
                          }
                    })
                )
            }>
                add task to board
            </button>
            <hr />
            <input type="text" value={deleteTaskBoard} onChange={(e) => setDeleteTaskBoard(e.target.value)} placeholder='enter board id to delete task to' />
            <input type="text" value={deleteTaskColumn} onChange={(e) => setDeleteTaskColumn(e.target.value)} placeholder='task column' />
            <input type="text" value={deleteTaskValue} onChange={(e) => setDeleteTaskValue(e.target.value)} placeholder='task id' />

            <button onClick={
                () => dispatch(
                    deleteTask({
                        boardId: deleteTaskBoard, 
                        columnId: deleteTaskColumn, 
                        taskId: deleteTaskValue
                    })
                )
            }>
                delete task
            </button>
            <hr />
            <pre>{JSON.stringify(kanban, null, 2)}</pre>
        </div>
    )
}