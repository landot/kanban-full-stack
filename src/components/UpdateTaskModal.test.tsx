import { UpdateTaskModal } from "./UpdateTaskModal";
import { render, within } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { sampleBoard } from "../data/sampleData";
import { Provider } from "react-redux";
import { store } from "../../app/store";

describe("UpdateTaskModal", () => {    
    test('prefilled data is populated in the modal', () => {
        const mockHandleAddTask = vi.fn();
        const mockHandleUpdateTask = vi.fn();
        const mockHideModal = vi.fn();
        const taskData = sampleBoard.columns[0].tasks[0];
        const {getByTestId, getAllByTestId} = render(
            <Provider store={store}>
                <UpdateTaskModal 
                    updateType={"edit"} 
                    board={sampleBoard} 
                    statuses={sampleBoard.columns.map(c => c.name)}
                    handleAddTask={mockHandleAddTask}
                    handleUpdateTask={mockHandleUpdateTask}
                    hideModal={mockHideModal}
                    prefill={taskData}
                />
            </Provider>
        )
        expect(getByTestId('dropdown-value').textContent).toBe(taskData.status);
        expect(within(getByTestId('task-title text-field')).getByTestId('text-field-input').getAttribute('value')).toBe(taskData.title);
        expect(within(getByTestId('task-description text-field')).getByTestId('text-field-input').getAttribute('value')).toBe(taskData.description);
        expect(getAllByTestId('edit-subtask')).toHaveLength(3);
    })

    test('status updates when a new dropdown item is selected', async () => {
        const mockHandleAddTask = vi.fn();
        const mockHandleUpdateTask = vi.fn();
        const mockHideModal = vi.fn();
        const taskData = sampleBoard.columns[0].tasks[0];
        const {getByTestId, getAllByTestId} = render(
            <Provider store={store}>
                <UpdateTaskModal 
                    updateType={"edit"} 
                    board={sampleBoard} 
                    statuses={sampleBoard.columns.map(c => c.name)}
                    handleAddTask={mockHandleAddTask}
                    handleUpdateTask={mockHandleUpdateTask}
                    hideModal={mockHideModal}
                    prefill={taskData}
                />
            </Provider>
        )
        await userEvent.click(getByTestId('dropdown-value'));
        await userEvent.click(getAllByTestId('dropdown-option')[1]);
        expect(getByTestId('dropdown-value').textContent).toBe(sampleBoard.columns[1].name);
    })

    test('handleUpdateTask prop is called submit button is clicked', async () => {
        const mockHandleAddTask = vi.fn();
        const mockHandleUpdateTask = vi.fn();
        const mockHideModal = vi.fn();
        const taskData = sampleBoard.columns[0].tasks[0];
        const {getByTestId} = render(
            <Provider store={store}>
                <UpdateTaskModal 
                    updateType={"edit"} 
                    board={sampleBoard} 
                    statuses={sampleBoard.columns.map(c => c.name)}
                    handleAddTask={mockHandleAddTask}
                    handleUpdateTask={mockHandleUpdateTask}
                    hideModal={mockHideModal}
                    prefill={taskData}
                />
            </Provider>
        )
        // await userEvent.click(getByTestId('dropdown-value'));
        // await userEvent.click(getAllByTestId('dropdown-option')[1]);
        await userEvent.click(getByTestId('update-task-submit'));
        expect(mockHandleUpdateTask).toHaveBeenCalled();
    })

    test('deleteTask dispatch is called when a task is deleted', async () => {
        const mockHandleAddTask = vi.fn();
        const mockHandleUpdateTask = vi.fn();
        const mockHideModal = vi.fn();
        const taskData = sampleBoard.columns[0].tasks[0];
        const {getAllByTestId} = render(
            <Provider store={store}>
                <UpdateTaskModal 
                    updateType={"edit"} 
                    board={sampleBoard} 
                    statuses={sampleBoard.columns.map(c => c.name)}
                    handleAddTask={mockHandleAddTask}
                    handleUpdateTask={mockHandleUpdateTask}
                    hideModal={mockHideModal}
                    prefill={taskData}
                />
            </Provider>
        )
        expect(getAllByTestId('edit-subtask')).toHaveLength(3);
        await userEvent.click(getAllByTestId('delete-subtask')[0]);
        expect(getAllByTestId('edit-subtask')).toHaveLength(2);
    })

    test('handleAddTask and hideModal prop is called when a new task is added', async () => {
        const mockHandleAddTask = vi.fn();
        const mockHandleUpdateTask = vi.fn();
        const mockHideModal = vi.fn();
        const taskData = sampleBoard.columns[0].tasks[0];
        const {getByTestId} = render(
            <Provider store={store}>
                <UpdateTaskModal 
                    updateType={"add"} 
                    board={sampleBoard} 
                    statuses={sampleBoard.columns.map(c => c.name)}
                    handleAddTask={mockHandleAddTask}
                    handleUpdateTask={mockHandleUpdateTask}
                    hideModal={mockHideModal}
                    prefill={taskData}
                />
            </Provider>
        )
        await userEvent.click(getByTestId('update-task-submit'));
        expect(mockHandleAddTask).toHaveBeenCalled();
        expect(mockHideModal).toHaveBeenCalled();
    })

    test('handleAddTask and hideModal prop are not called when a task is updated with validation errors', async () => {
        const mockHandleAddTask = vi.fn();
        const mockHandleUpdateTask = vi.fn();
        const mockHideModal = vi.fn();
        const {getByTestId} = render(
            <Provider store={store}>
                <UpdateTaskModal 
                    updateType={"add"} 
                    board={sampleBoard} 
                    statuses={sampleBoard.columns.map(c => c.name)}
                    handleAddTask={mockHandleAddTask}
                    handleUpdateTask={mockHandleUpdateTask}
                    hideModal={mockHideModal}
                />
            </Provider>
        )
        await userEvent.click(getByTestId('update-task-submit'));
        expect(mockHandleAddTask).not.toHaveBeenCalled();
        expect(mockHideModal).not.toHaveBeenCalled();
    })
})