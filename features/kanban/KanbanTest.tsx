import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Status } from "../../src/types/data";
import { getUUID } from "../../src/utils/createUUID";
import { addBoard, addTask, deleteBoard, deleteTask, selectKanban, updateTask, addColumn, deleteColumn, updateColumn } from './kanbanSlice';

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
    const [updateTaskBoard, setUpdateTaskBoard] = useState('');
    const [updateTaskValue, setUpdateTaskValue] = useState('');
    const [updateTaskColumn, setUpdateTaskColumn] = useState('');
    const [addColumnBoard, setAddColumnBoard] = useState('');
    const [addColumnName, setAddColumnName] = useState('');
    const [deleteColumnBoard, setDeleteColumnBoard] = useState('');
    const [deleteColumnId, setDeleteColumnId] = useState('');
    const [updateColumnBoard, setUpdateColumnBoard] = useState('');
    const [updateColumnId, setUpdateColumnId] = useState('');
    


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
            <input type="text" value={updateTaskBoard} onChange={(e) => setUpdateTaskBoard(e.target.value)} placeholder='enter board id to update task to' />
            <input type="text" value={updateTaskColumn} onChange={(e) => setUpdateTaskColumn(e.target.value)} placeholder='task column' />
            <input type="text" value={updateTaskValue} onChange={(e) => setUpdateTaskValue(e.target.value)} placeholder='task id to update' />
            <button onClick={
                () => dispatch(
                    updateTask({
                        boardId: updateTaskBoard, 
                        columnId: updateTaskColumn, 
                        taskId: updateTaskValue,
                        updatedTask: {
                            id: updateTaskValue,
                            title: 'asdf asdf',
                            description: `description for asdfasdf`,
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
                update task
            </button>
            <hr />
            <input type="text" value={addColumnBoard} onChange={(e) => setAddColumnBoard(e.target.value)} placeholder='enter board id to add column to' />
            <input type="text" value={addColumnName} onChange={(e) => setAddColumnName(e.target.value)} placeholder='enter new column name' />
            <button onClick={() => dispatch(addColumn({boardId: addColumnBoard, column: {
                id: getUUID(),
                name: addColumnName,
                tasks: [],
                color: `#${Math.floor(Math.random()*16777215).toString(16)}` // randomly generate a color hex
            }}))}>add column</button>
            <hr />
            <input type="text" value={deleteColumnBoard} onChange={(e) => setDeleteColumnBoard(e.target.value)} placeholder='enter board id to delete column' />
            <input type="text" value={deleteColumnId} onChange={(e) => setDeleteColumnId(e.target.value)} placeholder='enter column id to delete' />
            <button onClick={() => dispatch(deleteColumn({boardId: deleteColumnBoard, columnId: deleteColumnId}))}>delete column</button>
            <hr />
            <input type="text" value={updateColumnBoard} onChange={(e) => setUpdateColumnBoard(e.target.value)} placeholder='enter board id to update column' />
            <input type="text" value={updateColumnId} onChange={(e) => setUpdateColumnId(e.target.value)} placeholder='enter column id to update' />
            <button onClick={() => dispatch(updateColumn(
                {
                    boardId: updateColumnBoard, 
                    columnId: updateColumnId,
                    updatedColumn: {
                        id: updateColumnId,
                        name: 'new name',
                        color: '#FFFFF',
                        tasks: []
                    }
                }))}>update column</button>
            <hr />
            <pre>{JSON.stringify(kanban, null, 2)}</pre>
        </div>
    )
}