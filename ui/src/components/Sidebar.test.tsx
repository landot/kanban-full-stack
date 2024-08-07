import { Sidebar } from "./Sidebar";
import { render } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { sampleBoard } from "../data/sampleData";

describe("Sidebar", () => {
    test('correct number of boards are shown', async () => {
        const mockHandleToggleTheme = vi.fn();
        const mockHandleAddBoard = vi.fn();
        const mockHandleBoardSelect = vi.fn();
        const mockHandleHideSidebar = vi.fn();
        const {getAllByTestId} = render(
            <Sidebar 
                boards={[
                    {
                        ...sampleBoard,
                        name: 'board1'
                    },
                    {
                        ...sampleBoard,
                        name: 'board2'
                    }, 
                    {
                        ...sampleBoard,
                        name: 'board3'
                    }, 
                ]} 
                selectedBoardIndex={0} 
                handleToggleTheme={mockHandleToggleTheme}
                handleAddBoard={mockHandleAddBoard}
                handleBoardSelect={mockHandleBoardSelect}
                handleHideSidebar={mockHandleHideSidebar}
            />
        )
        const boards = getAllByTestId('sidebar-board', {exact: false});
        const boardText = boards.map(b => b.textContent);
        // hide sidebar button is currently re-using the board component
        expect(boardText).toEqual(['board1', 'board2', 'board3', 'Hide Sidebar']);
    })

    test('selectedBoardIndex shows correct board as selected', async () => {
        const mockHandleToggleTheme = vi.fn();
        const mockHandleAddBoard = vi.fn();
        const mockHandleBoardSelect = vi.fn();
        const mockHandleHideSidebar = vi.fn();
        const {getByTestId} = render(
            <Sidebar 
                boards={[
                    {
                        ...sampleBoard,
                        name: 'board1'
                    },
                    {
                        ...sampleBoard,
                        name: 'board2'
                    }, 
                    {
                        ...sampleBoard,
                        name: 'board3'
                    }, 
                ]} 
                selectedBoardIndex={1} 
                handleToggleTheme={mockHandleToggleTheme}
                handleAddBoard={mockHandleAddBoard}
                handleBoardSelect={mockHandleBoardSelect}
                handleHideSidebar={mockHandleHideSidebar}
            />
        )
        expect(getByTestId('sidebar-board selected').textContent).toBe('board2');
    })

    test('handleToggleTheme is called when theme is updated', async () => {
        const mockHandleToggleTheme = vi.fn();
        const mockHandleAddBoard = vi.fn();
        const mockHandleBoardSelect = vi.fn();
        const mockHandleHideSidebar = vi.fn();
        const {getByTestId} = render(
            <Sidebar 
                boards={[
                    {
                        ...sampleBoard,
                        name: 'board1'
                    },
                    {
                        ...sampleBoard,
                        name: 'board2'
                    }, 
                    {
                        ...sampleBoard,
                        name: 'board3'
                    }, 
                ]} 
                selectedBoardIndex={1} 
                handleToggleTheme={mockHandleToggleTheme}
                handleAddBoard={mockHandleAddBoard}
                handleBoardSelect={mockHandleBoardSelect}
                handleHideSidebar={mockHandleHideSidebar}
            />
        )
        await userEvent.click(getByTestId('dark-mode-slider'));
        expect(mockHandleToggleTheme).toHaveBeenCalled();
    })


    test('handleAddBoard is called when the create new board button is clicked', async () => {
        const mockHandleToggleTheme = vi.fn();
        const mockHandleAddBoard = vi.fn();
        const mockHandleBoardSelect = vi.fn();
        const mockHandleHideSidebar = vi.fn();
        const {getByTestId} = render(
            <Sidebar 
                boards={[
                    {
                        ...sampleBoard,
                        name: 'board1'
                    },
                    {
                        ...sampleBoard,
                        name: 'board2'
                    }, 
                    {
                        ...sampleBoard,
                        name: 'board3'
                    }, 
                ]} 
                selectedBoardIndex={1} 
                handleToggleTheme={mockHandleToggleTheme}
                handleAddBoard={mockHandleAddBoard}
                handleBoardSelect={mockHandleBoardSelect}
                handleHideSidebar={mockHandleHideSidebar}
            />
        )
        await userEvent.click(getByTestId('create-new-board'));
        expect(mockHandleAddBoard).toHaveBeenCalled();
    })

    test('handleHideSidebar is called when the hide sidebar button is clicked', async () => {
        const mockHandleToggleTheme = vi.fn();
        const mockHandleAddBoard = vi.fn();
        const mockHandleBoardSelect = vi.fn();
        const mockHandleHideSidebar = vi.fn();
        const {getAllByTestId} = render(
            <Sidebar 
                boards={[
                    {
                        ...sampleBoard,
                        name: 'board1'
                    },
                    {
                        ...sampleBoard,
                        name: 'board2'
                    }, 
                    {
                        ...sampleBoard,
                        name: 'board3'
                    }, 
                ]} 
                selectedBoardIndex={1} 
                handleToggleTheme={mockHandleToggleTheme}
                handleAddBoard={mockHandleAddBoard}
                handleBoardSelect={mockHandleBoardSelect}
                handleHideSidebar={mockHandleHideSidebar}
            />
        )
        const boards = getAllByTestId('sidebar-board', {exact: true});
        await userEvent.click(boards[boards.length - 1]);
        expect(mockHandleHideSidebar).toHaveBeenCalled();
    })
})
