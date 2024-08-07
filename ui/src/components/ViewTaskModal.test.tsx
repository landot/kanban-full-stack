import { ViewTaskModal } from "./ViewTaskModal";
import { render } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { sampleBoard } from "../data/sampleData";
import { Provider } from "react-redux";
import { store } from "../../app/store";

describe("ViewTaskModal", () => {    
    test('view task modal has correct title and description', () => {
        const mockHandleEditTask = vi.fn();
        const mockHandleDeleteTask = vi.fn();
        const mockHandleUpdateColumn = vi.fn();
        const mockHideModal = vi.fn();
        const taskData = sampleBoard.columns[0].tasks[0];
        const {getByTestId} = render(
            <Provider store={store}>
                <ViewTaskModal 
                    task={taskData} 
                    statuses={sampleBoard.columns.map(c => c.name)} 
                    board={sampleBoard} 
                    handleEditTask={mockHandleEditTask}
                    handleDeleteTask={mockHandleDeleteTask}
                    handleUpdateSelectedColumnId={mockHandleUpdateColumn}
                    hideModal={mockHideModal}
                />
            </Provider>
        )
        expect(getByTestId('view-task-header').textContent).toBe(taskData.title);
        expect(getByTestId('view-task-description').textContent).toBe(taskData.description);
        expect(getByTestId('subtasks-remaining').textContent).toBe('Subtasks (1 of 3)');
    })

    test('handleEditTask and hideModal prop is called when the Edit Task button is clicked', async () => {
        const mockHandleEditTask = vi.fn();
        const mockHandleDeleteTask = vi.fn();
        const mockHandleUpdateColumn = vi.fn();
        const mockHideModal = vi.fn();
        const taskData = sampleBoard.columns[0].tasks[0];
        const {getByTestId, getAllByTestId} = render(
            <Provider store={store}>
                <ViewTaskModal 
                    task={taskData} 
                    statuses={sampleBoard.columns.map(c => c.name)} 
                    board={sampleBoard} 
                    handleEditTask={mockHandleEditTask}
                    handleDeleteTask={mockHandleDeleteTask}
                    handleUpdateSelectedColumnId={mockHandleUpdateColumn}
                    hideModal={mockHideModal}
                />
            </Provider>
        )
        await userEvent.click(getByTestId('Task-more-actions'));
        await userEvent.click(getAllByTestId('more-actions-item')[0]);
        expect(mockHandleEditTask).toHaveBeenCalled();
        expect(mockHideModal).toHaveBeenCalled();
    })

    test('handleDeleteTask prop is called when the Edit Task button is clicked', async () => {
        const mockHandleEditTask = vi.fn();
        const mockHandleDeleteTask = vi.fn();
        const mockHandleUpdateColumn = vi.fn();
        const mockHideModal = vi.fn();
        const taskData = sampleBoard.columns[0].tasks[0];
        const {getByTestId, getAllByTestId} = render(
            <Provider store={store}>
                <ViewTaskModal 
                    task={taskData} 
                    statuses={sampleBoard.columns.map(c => c.name)} 
                    board={sampleBoard} 
                    handleEditTask={mockHandleEditTask}
                    handleDeleteTask={mockHandleDeleteTask}
                    handleUpdateSelectedColumnId={mockHandleUpdateColumn}
                    hideModal={mockHideModal}
                />
            </Provider>
        )
        await userEvent.click(getByTestId('Task-more-actions'));
        await userEvent.click(getAllByTestId('more-actions-item')[1]);
        expect(mockHandleDeleteTask).toHaveBeenCalled();
    })

    test('task status can be updated', async () => {
        const mockHandleEditTask = vi.fn();
        const mockHandleDeleteTask = vi.fn();
        const mockHandleUpdateColumn = vi.fn();
        const mockHideModal = vi.fn();
        const taskData = sampleBoard.columns[0].tasks[0];
        const {getByTestId, getAllByTestId} = render(
            <Provider store={store}>
                <ViewTaskModal 
                    task={taskData} 
                    statuses={sampleBoard.columns.map(c => c.name)} 
                    board={sampleBoard} 
                    handleEditTask={mockHandleEditTask}
                    handleDeleteTask={mockHandleDeleteTask}
                    handleUpdateSelectedColumnId={mockHandleUpdateColumn}
                    hideModal={mockHideModal}
                />
            </Provider>
        )
        expect(getByTestId('dropdown-value').textContent).toBe('Column1');
        await userEvent.click(getByTestId('dropdown-value'));
        await userEvent.click(getAllByTestId('dropdown-option')[1]);
        expect(getByTestId('dropdown-value').textContent).toBe('Column2');
        expect(mockHandleUpdateColumn).toHaveBeenCalledWith('col2');
    })

    // test('subtask can be checked', async () => {
    //     const mockHandleEditTask = vi.fn();
    //     const mockHandleDeleteTask = vi.fn();
    //     const mockHandleUpdateColumn = vi.fn();
    //     const mockHideModal = vi.fn();
    //     const taskData = sampleBoard.columns[0].tasks[0];
    //     const {getAllByTestId} = render(
    //         <Provider store={store}>
    //             <ViewTaskModal 
    //                 task={taskData} 
    //                 statuses={sampleBoard.columns.map(c => c.name)} 
    //                 board={sampleBoard} 
    //                 handleEditTask={mockHandleEditTask}
    //                 handleDeleteTask={mockHandleDeleteTask}
    //                 handleUpdateSelectedColumnId={mockHandleUpdateColumn}
    //                 hideModal={mockHideModal}
    //             />
    //         </Provider>
    //     )
    //     const subtask = getAllByTestId('subtask', {exact: false})[0];
    //     const checkbox = getAllByTestId('checkbox')[0] as HTMLInputElement;
    //     expect(checkbox.checked).toBeTruthy();
    //     await userEvent.click(subtask);
    // })

    // test('subtask can be unchecked', async () => {
    //     const mockHandleEditTask = vi.fn();
    //     const mockHandleDeleteTask = vi.fn();
    //     const mockHandleUpdateColumn = vi.fn();
    //     const mockHideModal = vi.fn();
    //     const taskData = sampleBoard.columns[0].tasks[0];
    //     const {getAllByTestId} = render(
    //         <Provider store={store}>
    //             <ViewTaskModal 
    //                 task={taskData} 
    //                 statuses={sampleBoard.columns.map(c => c.name)} 
    //                 board={sampleBoard} 
    //                 handleEditTask={mockHandleEditTask}
    //                 handleDeleteTask={mockHandleDeleteTask}
    //                 handleUpdateSelectedColumnId={mockHandleUpdateColumn}
    //                 hideModal={mockHideModal}
    //             />
    //         </Provider>
    //     )
    //     const checkboxes = getAllByTestId('checkbox');
    //     expect(checkboxes[1].hasAttribute('checked')).toBeFalsy();
    //     await userEvent.click(checkboxes[1]);
    //     expect(checkboxes[1].hasAttribute('checked')).toBeTruthy();
    // })
})