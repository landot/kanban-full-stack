import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getUUID } from "../../src/utils/createUUID";
import { addBoard, deleteBoard, selectKanban } from './kanbanSlice';

export function KanbanTest() {
    const kanban = useAppSelector(selectKanban)
    const dispatch = useAppDispatch()
    const [deleteValue, setDeleteValue] = useState('');

    return (
        <div>
            <button onClick={() => dispatch(addBoard({
                name: getUUID(),
                id: getUUID(),
                columns: []
            }))}>add board</button>
            <input type="text" value={deleteValue} onChange={(e) => setDeleteValue(e.target.value)} placeholder='enter board id to delete' />
            <button onClick={() => dispatch(deleteBoard(deleteValue))}>delete board</button>
            <p>
                {JSON.stringify(kanban)}
            </p>
        </div>
    )
}