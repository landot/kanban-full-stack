import { sampleBoard } from '../../src/data/sampleData';
import { Status } from '../../src/types/data';
import kanbanReducer, {
    addBoard, 
    addColumn, 
    addTask, 
    updateBoard, 
    updateColumn, 
    updateTask, 
    deleteBoard, 
    deleteColumn, 
    deleteTask,
    KanbanState
} from './kanbanSlice';

describe("kanban reducer", () => {
    const initialState: KanbanState = {
        value: {
            boards: [
                sampleBoard
            ]
        },
        status: "idle"
    }

    it("should handle initial state", () => {
        expect(initialState.value.boards.length).toEqual(1);
        expect(initialState.value.boards[0].columns.length).toEqual(3);
    })

    it("should handle addBoard", () => {
        const newBoard = {name: 'board', id: '1234', columns: []};
        const actual = kanbanReducer(initialState, addBoard(newBoard))
        expect(actual.value.boards.length).toBe(2);
        expect(actual.value.boards[1]).toStrictEqual(newBoard);
    })

    it("should handle addColumn", () => {
        const newColumn = {id: '1234', name: 'new-column', color: '#FFFFFF', tasks: []};
        const actual = kanbanReducer(initialState, addColumn({boardId: 'asdf', column: newColumn}))
        expect(actual.value.boards[0].columns.length).toBe(4);
        expect(actual.value.boards[0].columns[3]).toStrictEqual(newColumn);
    })

    it("should handle addTask", () => {
        const newTask = {id: '1234', title: 'newtask', description: 'new task description', status: Status.Doing, subtasks: [] }
        const actual = kanbanReducer(initialState, addTask({boardId: 'asdf', columnId: 'col1', task: newTask}))
        expect(actual.value.boards[0].columns[0].tasks.length).toBe(3);
        expect(actual.value.boards[0].columns[0].tasks[2]).toStrictEqual(newTask);
    })

    it("should handle deleteBoard", () => {
        const boardToDelete = 'asdf';
        const actual = kanbanReducer(initialState, deleteBoard(boardToDelete));
        expect(actual.value.boards.length).toBe(0);
    })

    it("should handle deleteColumn", () => {
        const columnToDelete = 'col1';
        const actual = kanbanReducer(initialState, deleteColumn({boardId: 'asdf', columnId: columnToDelete}))
        expect(actual.value.boards[0].columns.length).toBe(2);
    })

    it("should handle deleteTask", () => {
        const taskToDelete = '5555';
        const actual = kanbanReducer(initialState, deleteTask({boardId: 'asdf', columnId: 'col1', taskId: taskToDelete}))
        expect(actual.value.boards[0].columns[0].tasks.length).toBe(1);
    })

    // it("should handle updateBoard - removing a column", () => {
    //     const updatedBoard = {name: 'board', id: '1234', columns: []};
    //     const actual = kanbanReducer(initialState, updateBoard({boardId: 'asdf', updatedBoard: {name: 'newboard'}}))
    //     expect(actual.value.boards.length).toBe(1);
    //     expect(actual.value.boards[0]).toStrictEqual(updatedBoard);
    // })

    // it("should handle updateBoard - adding a column", () => {
    //     const updatedBoard = {name: 'board', id: '1234', columns: []};
    //     const actual = kanbanReducer(initialState, updateBoard({boardId: 'asdf', updatedBoard: {name: 'newboard'}}))
    //     expect(actual.value.boards.length).toBe(1);
    //     expect(actual.value.boards[0]).toStrictEqual(updatedBoard);
    // })

    // it("should handle updateBoard - adding and removing a column", () => {
    //     const updatedBoard = {name: 'board', id: '1234', columns: []};
    //     const actual = kanbanReducer(initialState, updateBoard({boardId: 'asdf', updatedBoard: {name: 'newboard'}}))
    //     expect(actual.value.boards.length).toBe(1);
    //     expect(actual.value.boards[0]).toStrictEqual(updatedBoard);
    // })

    // it("should handle updateBoard - updating name", () => {
    //     const updatedBoard = {name: 'board', id: '1234', columns: []};
    //     const actual = kanbanReducer(initialState, updateBoard({boardId: 'asdf', updatedBoard: {name: 'newboard'}}))
    //     expect(actual.value.boards.length).toBe(1);
    //     expect(actual.value.boards[0]).toStrictEqual(updatedBoard);
    // })


    it("should handle updateColumn", () => {
        const updatedColumn = {id: 'col1', name: 'new-column', color: '#FFFFFF', tasks: []};
        const actual = kanbanReducer(initialState, updateColumn({boardId: 'asdf', columnId: 'col1', updatedColumn: updatedColumn}))
        expect(actual.value.boards[0].columns.length).toBe(3);
        expect(actual.value.boards[0].columns[0]).toStrictEqual(updatedColumn);
    })

    it("should handle updateTask", () => {
        const updatedTask = {id: '5555', title: 'updatetask', description: 'updated task description', status: Status.Doing, subtasks: [] }
        const actual = kanbanReducer(initialState, updateTask({boardId: 'asdf', columnId: 'col1', taskId: updatedTask.id, updatedTask: updatedTask}))
        expect(actual.value.boards[0].columns[0].tasks.length).toBe(2);
        expect(actual.value.boards[0].columns[0].tasks[0]).toStrictEqual(updatedTask);
    })
})
