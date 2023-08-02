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
    KanbanState,
    BoardUpdateValue,
    ColumnUpdateValue
} from './kanbanSlice';

const testData = {
    "boards": [{
            "id": "3d57ef80-6d39-495e-93a6-109279de6e96",
            "name": "Board1",
            "columns": [
                {
                    "id": "a5245481-ec8c-4934-9459-e2a2fcde36a2",
                    "name": "todo",
                    "tasks": [
                        {
                            "id": "c0a07d8a-5335-4bd3-aaf4-a95ede7ba3a1",
                            "title": "Implement design",
                            "description": "Implement the design for the new feature",
                            "subtasks": [
                                {
                                    "id": "9a044aab-9a16-4b58-8823-4413cbdc7cdc",
                                    "title": "create presentation layer",
                                    "isCompleted": false
                                },
                                {
                                    "id": "37d686f7-a8d8-4f4e-9752-680cc6abe5ed",
                                    "title": "create API layer",
                                    "isCompleted": false
                                },
                                {
                                    "id": "3bb599e8-019c-4934-9d38-3bffd497b449",
                                    "title": "integrate API with presentation layer",
                                    "isCompleted": false
                                },
                                {
                                    "id": "40b80829-f38e-4e1f-aecd-e2eb0b7b04b8",
                                    "title": "manual testing",
                                    "isCompleted": false
                                },
                                {
                                    "id": "5ab80a98-3d24-4ac6-9ff5-b53e18a8c5db",
                                    "title": "bug bash",
                                    "isCompleted": false
                                },
                                {
                                    "id": "3244bcfe-dd02-4e47-8fc9-4a21397ba4f3",
                                    "title": "release to production",
                                    "isCompleted": false
                                }
                            ],
                            "status": "todo"
                        }
                    ],
                    "color": "#801ad3"
                },
                {
                    "id": "ec2d6942-f24b-4fe1-8d3a-8eb272aec5c3",
                    "name": "doing",
                    "tasks": [
                        {
                            "id": "54be24cd-efe5-4b33-879a-50da382e5da2",
                            "title": "Create design",
                            "description": "create a design for the new feature",
                            "subtasks": [
                                {
                                    "id": "d9da42ff-cbd4-4952-a20f-b16be8340786",
                                    "title": "work with UX",
                                    "isCompleted": false
                                },
                                {
                                    "id": "e6206bdb-8502-436e-9aa0-256abfeeb439",
                                    "title": "get sign off from product",
                                    "isCompleted": false
                                },
                                {
                                    "id": "ad400e17-24bb-448a-a5fc-d5a3ecc446a6",
                                    "title": "get sign off from dev team",
                                    "isCompleted": false
                                }
                            ],
                            "status": "doing"
                        }
                    ],
                    "color": "#fe64e0"
                },
                {
                    "id": "b679bc1e-c278-47a0-950a-4a1af22d72f7",
                    "name": "done",
                    "tasks": [],
                    "color": "#c5bff1"
                },
                {
                    "id": "66800d15-3abb-4597-8a3d-7830d05dd31d",
                    "name": "defer",
                    "tasks": [],
                    "color": "#3f126c"
                }
            ]
        }
    ]
}

// todo clean up this file and create better initial state test data
describe("kanban reducer", () => {
    const initialState: KanbanState = {
        value: {
            boards: testData.boards
        },
        status: "idle"
    }

    it("should handle initial state", () => {
        expect(initialState.value.boards.length).toEqual(1);
        expect(initialState.value.boards[0].columns.length).toEqual(4);
    })

    it("should handle addBoard", () => {
        const newBoard = {name: 'board', id: '1234', columns: []};
        const actual = kanbanReducer(initialState, addBoard(newBoard))
        expect(actual.value.boards.length).toBe(2);
        expect(actual.value.boards[1]).toStrictEqual(newBoard);
    })

    it("should handle addColumn", () => {
        const newColumn = {id: '1234', name: 'new-column', color: '#FFFFFF', tasks: []};
        const actual = kanbanReducer(initialState, addColumn({boardId: initialState.value.boards[0].id, column: newColumn}))
        expect(actual.value.boards[0].columns.length).toBe(5);
        expect(actual.value.boards[0].columns[4]).toStrictEqual(newColumn);
    })

    it("should handle addTask", () => {
        const newTask = {id: '1234', title: 'newtask', description: 'new task description', status: initialState.value.boards[0].columns[0].name, subtasks: [] }
        const actual = kanbanReducer(initialState, addTask({boardId: initialState.value.boards[0].id, task: newTask}))
        expect(actual.value.boards[0].columns[0].tasks.length).toBe(2);
        expect(actual.value.boards[0].columns[0].tasks[1]).toStrictEqual(newTask);
    })

    it("should handle addTask - no new task when status does not exist", () => {
        const newTask = {id: '1234', title: 'newtask', description: 'new task description', status: 'thisstatusdoesnotexist', subtasks: [] }
        const actual = kanbanReducer(initialState, addTask({boardId: initialState.value.boards[0].id, task: newTask}))
        expect(actual.value.boards[0].columns[0].tasks.length).toBe(1);
    })

    it("should handle deleteBoard", () => {
        const boardToDelete = initialState.value.boards[0].id;
        const actual = kanbanReducer(initialState, deleteBoard(boardToDelete));
        expect(actual.value.boards.length).toBe(0);
    })

    it("should handle deleteColumn", () => {
        const columnToDelete = initialState.value.boards[0].columns[0].id;
        const actual = kanbanReducer(initialState, deleteColumn({boardId: initialState.value.boards[0].id, columnId: columnToDelete}))
        expect(actual.value.boards[0].columns.length).toBe(3);
    })

    it("should handle deleteTask", () => {
        const taskToDelete = initialState.value.boards[0].columns[0].tasks[0].id;
        const actual = kanbanReducer(initialState, deleteTask({boardId: initialState.value.boards[0].id, columnId: initialState.value.boards[0].columns[0].id, taskId: taskToDelete}))
        expect(actual.value.boards[0].columns[0].tasks.length).toBe(0);
    })

    it("should handle updateBoard - removing a column", () => {
        const boardId = initialState.value.boards[0].id;
        const updateBoardArguments = {
            columns: [
                {
                    name: 'todo',
                    id: 'a5245481-ec8c-4934-9459-e2a2fcde36a2'
                },
                {
                    name: 'doing',
                    id: 'ec2d6942-f24b-4fe1-8d3a-8eb272aec5c3'
                },
            ]
        };
        const actual = kanbanReducer(initialState, updateBoard({boardId: boardId, updatedBoard: updateBoardArguments}))
        expect(actual.value.boards[0].columns.map(c => c.id)).toEqual([updateBoardArguments.columns[0].id, updateBoardArguments.columns[1].id]);
    })

    it("should handle updateBoard - adding a column", () => {
        const boardId = initialState.value.boards[0].id;
        const updateBoardArguments: BoardUpdateValue = {
            columns: [
                {
                    name: 'todo',
                    id: 'a5245481-ec8c-4934-9459-e2a2fcde36a2'
                },
                {
                    name: 'doing',
                    id: 'ec2d6942-f24b-4fe1-8d3a-8eb272aec5c3'
                },
                {
                    name: 'done',
                    id: 'b679bc1e-c278-47a0-950a-4a1af22d72f7'
                },
                {
                    name: 'defer',
                    id: '66800d15-3abb-4597-8a3d-7830d05dd31d'
                },
                {
                    name: 'Column5',
                    id: 'col5'
                },
        ]
        };
        const actual = kanbanReducer(initialState, updateBoard({boardId: boardId, updatedBoard: updateBoardArguments}))
        expect(actual.value.boards[0].columns.length).toBe(5);
        expect(actual.value.boards[0].columns[4].name).toBe('Column5');
        expect(actual.value.boards[0].columns[4].id).toBe('col5');
        expect(actual.value.boards[0].columns[4].tasks).toStrictEqual([]);
        
    })

    // it("should handle updateBoard - adding and removing a column", () => {
    //     const boardId = 'asdf';
    //     const updateBoardArguments: BoardUpdateValue = {
    //         columns: [
    //             {
    //                 name: 'Column1',
    //                 id: 'col1'
    //             },
    //             {
    //                 name: 'Column3',
    //                 id: 'col3'
    //             },
    //             {
    //                 name: 'Column4',
    //                 id: 'col4'
    //             },
    //     ]
    //     };
    //     const actual = kanbanReducer(initialState, updateBoard({boardId: boardId, updatedBoard: updateBoardArguments}))
    //     expect(actual.value.boards[0].columns.length).toBe(3);
    //     expect(actual.value.boards[0].columns[2].name).toBe('Column4');
    //     expect(actual.value.boards[0].columns[2].id).toBe('col4');
    //     expect(actual.value.boards[0].columns[2].tasks).toStrictEqual([]);
    //     expect(actual.value.boards[0].columns.filter(c => c.id === 'col2').length).toBe(0);
    // })

    // it("should handle updateBoard - updating name", () => {
    //     const actual = kanbanReducer(initialState, updateBoard({boardId: 'asdf', updatedBoard: {name: 'newboard'}}))
    //     expect(actual.value.boards.length).toBe(1);
    //     expect(actual.value.boards[0].name).toStrictEqual('newboard');
    // })


    // it("should handle updateColumn", () => {
    //     const updatedColumn = {id: 'col1', name: 'new-column', color: '#FFFFFF', tasks: []};
    //     const actual = kanbanReducer(initialState, updateColumn({boardId: 'asdf', columnId: 'col1', updatedColumn: updatedColumn}))
    //     expect(actual.value.boards[0].columns.length).toBe(3);
    //     expect(actual.value.boards[0].columns[0]).toStrictEqual(updatedColumn);
    // })

    // it("should handle updateTask", () => {
    //     const updatedTask = {id: '5555', title: 'updatetask', description: 'updated task description', status: 'doing', subtasks: [] }
    //     const actual = kanbanReducer(initialState, updateTask({boardId: 'asdf', columnId: 'col1', taskId: updatedTask.id, updatedTask: updatedTask}))
    //     expect(actual.value.boards[0].columns[0].tasks.length).toBe(2);
    //     expect(actual.value.boards[0].columns[0].tasks[0]).toStrictEqual(updatedTask);
    // })
})
