import { Column } from "./Column";
import { act, fireEvent, render} from '@testing-library/react'
import { vi } from 'vitest';
import { sampleBoard } from "../data/sampleData";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { DragDropContext } from "react-beautiful-dnd";
import userEvent from '@testing-library/user-event';


describe("Dropdown", () => {
    test('props are called when a task is clicked', async () => {
        const mockHandleViewTask = vi.fn();
        const mockHandleSelectedTask = vi.fn();
        const mockHandleSelectedTaskColumn = vi.fn();
        const mockHandleDragEnd = vi.fn();
        const testData = sampleBoard.columns[0];
        const { getAllByTestId } = render(
            <DragDropContext onDragEnd={mockHandleDragEnd}>
                <Column 
                    column={testData} 
                    handleViewTask={mockHandleViewTask} 
                    handleSelectedTask={mockHandleSelectedTask} 
                    handleSelectedTaskColumn={mockHandleSelectedTaskColumn} 
                />
            </DragDropContext>
        )
        await userEvent.click(getAllByTestId('task')[0]);
        expect(mockHandleViewTask).toHaveBeenCalledWith(true);
        expect(mockHandleSelectedTask).toHaveBeenCalledWith(testData.tasks[0].id);
        expect(mockHandleSelectedTaskColumn).toHaveBeenCalledWith(testData.id);
    })

    test('dragging a task calls the onDragEnd function', async () => {
        const mockHandleViewTask = vi.fn();
        const mockHandleSelectedTask = vi.fn();
        const mockHandleSelectedTaskColumn = vi.fn();
        const mockHandleDragEnd = vi.fn();
        const testData = sampleBoard.columns[0];
        const { getAllByTestId } = render(
            <Provider store={store}>
                <DragDropContext onDragEnd={mockHandleDragEnd}>
                    <Column 
                        column={testData} 
                        handleViewTask={mockHandleViewTask} 
                        handleSelectedTask={mockHandleSelectedTask} 
                        handleSelectedTaskColumn={mockHandleSelectedTaskColumn} 
                    />
                </DragDropContext>
            </Provider>
        )
        const tasks = getAllByTestId('task');
        act(() => {
            fireEvent.mouseDown(tasks[0]);
            fireEvent.mouseMove(tasks[0], { clientY: 500 });
            fireEvent.mouseUp(tasks[0]);
        });
        expect(mockHandleDragEnd).toHaveBeenCalled();
    })
})
