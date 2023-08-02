import { Header } from "./Header";
import { render } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { sampleBoard } from "../data/sampleData";

describe("Header", () => {
    test('logo is shown when showSidebar=false', () => {
        const mockHandleOpenMobileSidebar = vi.fn();
        const mockHandleDeleteBoard = vi.fn();
        const mockHandleEditBoard = vi.fn();
        const mockHandleAddTask = vi.fn();
        const {getAllByTestId} = render(
            <Header 
                board={sampleBoard} 
                showSidebar={false} 
                handleOpenMobileSidebar={mockHandleOpenMobileSidebar}
                handleDeleteBoard={mockHandleDeleteBoard}
                handleEditBoard={mockHandleEditBoard}
                handleAddTask={mockHandleAddTask}
            />
        )
        expect(getAllByTestId('header-logo').length).toBeGreaterThan(0);
    })

    test('logo is hidden when showSidebar=true', () => {
        const mockHandleOpenMobileSidebar = vi.fn();
        const mockHandleDeleteBoard = vi.fn();
        const mockHandleEditBoard = vi.fn();
        const mockHandleAddTask = vi.fn();
        const {queryAllByTestId} = render(
            <Header 
                board={sampleBoard} 
                showSidebar={true} 
                handleOpenMobileSidebar={mockHandleOpenMobileSidebar}
                handleDeleteBoard={mockHandleDeleteBoard}
                handleEditBoard={mockHandleEditBoard}
                handleAddTask={mockHandleAddTask}
            />
        )
        expect(queryAllByTestId('header-logo').length).toBe(0);
    })

    test('header shows selected board name', () => {
        const mockHandleOpenMobileSidebar = vi.fn();
        const mockHandleDeleteBoard = vi.fn();
        const mockHandleEditBoard = vi.fn();
        const mockHandleAddTask = vi.fn();
        const {getByTestId} = render(
            <Header 
                board={sampleBoard} 
                showSidebar={true} 
                handleOpenMobileSidebar={mockHandleOpenMobileSidebar}
                handleDeleteBoard={mockHandleDeleteBoard}
                handleEditBoard={mockHandleEditBoard}
                handleAddTask={mockHandleAddTask}
            />
        )
        expect(getByTestId('header-title').textContent).toBe(sampleBoard.name);
    })

    test('header shows "Create a board" message when no boards exist', () => {
        const mockHandleOpenMobileSidebar = vi.fn();
        const mockHandleDeleteBoard = vi.fn();
        const mockHandleEditBoard = vi.fn();
        const mockHandleAddTask = vi.fn();
        const {getByTestId} = render(
            <Header 
                board={
                    {
                        ...sampleBoard,
                        id: ''
                    }
                } 
                showSidebar={true} 
                handleOpenMobileSidebar={mockHandleOpenMobileSidebar}
                handleDeleteBoard={mockHandleDeleteBoard}
                handleEditBoard={mockHandleEditBoard}
                handleAddTask={mockHandleAddTask}
            />
        )
        expect(getByTestId('header-title').textContent).toBe('Create a board');
    })

    test('more actions and new task buttons are hidden when no boards exist', () => {
        const mockHandleOpenMobileSidebar = vi.fn();
        const mockHandleDeleteBoard = vi.fn();
        const mockHandleEditBoard = vi.fn();
        const mockHandleAddTask = vi.fn();
        const {queryByTestId} = render(
            <Header 
                board={
                    {
                        ...sampleBoard,
                        id: ''
                    }
                } 
                showSidebar={true} 
                handleOpenMobileSidebar={mockHandleOpenMobileSidebar}
                handleDeleteBoard={mockHandleDeleteBoard}
                handleEditBoard={mockHandleEditBoard}
                handleAddTask={mockHandleAddTask}
            />
        )
        expect(queryByTestId('board-more-actions')).not.toBeInTheDocument();
        expect(queryByTestId('new-task')).not.toBeInTheDocument();
    })

    test('mobile - handleOpenMobileSidebar prop is called when dropdown arrow is clicked', async () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
        const mockHandleOpenMobileSidebar = vi.fn();
        const mockHandleDeleteBoard = vi.fn();
        const mockHandleEditBoard = vi.fn();
        const mockHandleAddTask = vi.fn();
        const {getByTestId} = render(
            <Header 
                board={sampleBoard} 
                showSidebar={true} 
                handleOpenMobileSidebar={mockHandleOpenMobileSidebar}
                handleDeleteBoard={mockHandleDeleteBoard}
                handleEditBoard={mockHandleEditBoard}
                handleAddTask={mockHandleAddTask}
            />
        )
        await userEvent.click(getByTestId('header-chevron'));
        expect(mockHandleOpenMobileSidebar).toHaveBeenCalled();
    })

    test('handleDeleteBoard prop is called when Delete Board button is clicked', async () => {
        const mockHandleOpenMobileSidebar = vi.fn();
        const mockHandleDeleteBoard = vi.fn();
        const mockHandleEditBoard = vi.fn();
        const mockHandleAddTask = vi.fn();
        const {getByTestId} = render(
            <Header 
                board={sampleBoard} 
                showSidebar={true} 
                handleOpenMobileSidebar={mockHandleOpenMobileSidebar}
                handleDeleteBoard={mockHandleDeleteBoard}
                handleEditBoard={mockHandleEditBoard}
                handleAddTask={mockHandleAddTask}
            />
        )
        await userEvent.click(getByTestId('Board-more-actions'));
        await userEvent.click(getByTestId('Delete Board'));
        expect(mockHandleDeleteBoard).toHaveBeenCalled();
    })

    test('handleEditBoard prop is called when Edit Board button is clicked', async () => {
        const mockHandleOpenMobileSidebar = vi.fn();
        const mockHandleDeleteBoard = vi.fn();
        const mockHandleEditBoard = vi.fn();
        const mockHandleAddTask = vi.fn();
        const {getByTestId} = render(
            <Header 
                board={sampleBoard} 
                showSidebar={true} 
                handleOpenMobileSidebar={mockHandleOpenMobileSidebar}
                handleDeleteBoard={mockHandleDeleteBoard}
                handleEditBoard={mockHandleEditBoard}
                handleAddTask={mockHandleAddTask}
            />
        )
        await userEvent.click(getByTestId('Board-more-actions'));
        await userEvent.click(getByTestId('Edit Board'));
        expect(mockHandleEditBoard).toHaveBeenCalled();
    })    
    
    test('handleAddTask prop is called when New Task button is clicked', async () => {
        const mockHandleOpenMobileSidebar = vi.fn();
        const mockHandleDeleteBoard = vi.fn();
        const mockHandleEditBoard = vi.fn();
        const mockHandleAddTask = vi.fn();
        const {getByTestId} = render(
            <Header 
                board={sampleBoard} 
                showSidebar={true} 
                handleOpenMobileSidebar={mockHandleOpenMobileSidebar}
                handleDeleteBoard={mockHandleDeleteBoard}
                handleEditBoard={mockHandleEditBoard}
                handleAddTask={mockHandleAddTask}
            />
        )
        await userEvent.click(getByTestId('new-task'));
        expect(mockHandleAddTask).toHaveBeenCalled();
    })


})
