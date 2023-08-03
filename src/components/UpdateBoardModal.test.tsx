import { UpdateBoardModal } from "./UpdateBoardModal";
import { render, screen, within } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { sampleBoard } from "../data/sampleData";

describe("UpdateBoardModal", () => {    
    test('prefilled data is populated in the modal', () => {
        const mockHandleAddBoard = vi.fn();
        const mockHandleUpdateBoard = vi.fn();
        const mockHideModal = vi.fn();
        const {getAllByTestId} = render(
            <UpdateBoardModal 
                updateType={"edit"} 
                handleAddBoard={mockHandleAddBoard}
                handleUpdateBoard={mockHandleUpdateBoard}
                hideModal={mockHideModal}
                prefill={sampleBoard}
            />
        )
        const columns = getAllByTestId('column text-field');
        screen.debug()
        const columnNames = columns.map(column => within(column).getByTestId('text-field-input').getAttribute('value'));
        expect(columnNames).toEqual(sampleBoard.columns.map(column => column.name));
    })

    test('modal title is "Add New Board" when updateType=add', () => {
        const mockHandleAddBoard = vi.fn();
        const mockHandleUpdateBoard = vi.fn();
        const mockHideModal = vi.fn();
        const {getByTestId} = render(
            <UpdateBoardModal 
                updateType={"add"} 
                handleAddBoard={mockHandleAddBoard}
                handleUpdateBoard={mockHandleUpdateBoard}
                hideModal={mockHideModal}
                prefill={sampleBoard}
            />
        )
        expect(getByTestId('update-board-header').textContent).toBe('add new Board');
    })

    test('modal title is "Edit Board" when updateType=edit', () => {
        const mockHandleAddBoard = vi.fn();
        const mockHandleUpdateBoard = vi.fn();
        const mockHideModal = vi.fn();
        const {getByTestId} = render(
            <UpdateBoardModal 
                updateType={"edit"} 
                handleAddBoard={mockHandleAddBoard}
                handleUpdateBoard={mockHandleUpdateBoard}
                hideModal={mockHideModal}
                prefill={sampleBoard}
            />
        )
        expect(getByTestId('update-board-header').textContent).toBe('edit Board');
    })

    test('new column can be added', async () => {
        const mockHandleAddBoard = vi.fn();
        const mockHandleUpdateBoard = vi.fn();
        const mockHideModal = vi.fn();
        const {getAllByTestId, getByTestId} = render(
            <UpdateBoardModal 
                updateType={"add"} 
                handleAddBoard={mockHandleAddBoard}
                handleUpdateBoard={mockHandleUpdateBoard}
                hideModal={mockHideModal}
            />
        )
        await userEvent.click(getByTestId('add-column'));
        expect(getAllByTestId('column text-field')).toHaveLength(3);
    })


    test('new board can be added', async () => {
        const mockHandleAddBoard = vi.fn();
        const mockHandleUpdateBoard = vi.fn();
        const mockHideModal = vi.fn();
        const {getAllByTestId, getByTestId} = render(
            <UpdateBoardModal 
                updateType={"add"} 
                handleAddBoard={mockHandleAddBoard}
                handleUpdateBoard={mockHandleUpdateBoard}
                hideModal={mockHideModal}
            />
        )
        const inputs = getAllByTestId('text-field-input');
        await userEvent.type(inputs[0], 'name');
        await userEvent.type(inputs[1], 'col1');
        await userEvent.type(inputs[2], 'col2');
        await userEvent.click(getByTestId('update-board-submit'));
        expect(mockHandleAddBoard).toHaveBeenCalled();
    })

    test('board data can be updated', async () => {
        const mockHandleAddBoard = vi.fn();
        const mockHandleUpdateBoard = vi.fn();
        const mockHideModal = vi.fn();
        const { getByTestId, getAllByTestId } = render(
            <UpdateBoardModal 
                updateType={"edit"} 
                handleAddBoard={mockHandleAddBoard}
                handleUpdateBoard={mockHandleUpdateBoard}
                hideModal={mockHideModal}
                prefill={sampleBoard}
            />
        )
        const nameInput = within(getByTestId('name text-field')).getByTestId('text-field-input');
        await userEvent.clear(nameInput);
        await userEvent.type(nameInput, 'new name');
        const [deleteFirstColumnIcon] = getAllByTestId('column-delete');
        await userEvent.click(deleteFirstColumnIcon);
        await userEvent.click(getByTestId('update-board-submit'));
        expect(mockHandleUpdateBoard).toHaveBeenCalledWith(
            'asdf',
            {
                columns: sampleBoard.columns.filter(c => c.id !== sampleBoard.columns[0].id),
                id: 'asdf',
                name: 'new name',
            },
        );
    })

    test('validation errors are shown when name is empty', async () => {
        const mockHandleAddBoard = vi.fn();
        const mockHandleUpdateBoard = vi.fn();
        const mockHideModal = vi.fn();
        const {getByTestId} = render(
            <UpdateBoardModal 
                updateType={"edit"} 
                handleAddBoard={mockHandleAddBoard}
                handleUpdateBoard={mockHandleUpdateBoard}
                hideModal={mockHideModal}
                prefill={{
                    ...sampleBoard,
                    name: ''
                }}
            />
        )
        await userEvent.click(getByTestId('update-board-submit'));
        expect(mockHandleUpdateBoard).not.toHaveBeenCalled();
        expect(getByTestId('name text-field-error')).toBeInTheDocument();
    })

    test('validation errors are shown when column is empty', async () => {
        const mockHandleAddBoard = vi.fn();
        const mockHandleUpdateBoard = vi.fn();
        const mockHideModal = vi.fn();
        const {getByTestId} = render(
            <UpdateBoardModal 
                updateType={"edit"} 
                handleAddBoard={mockHandleAddBoard}
                handleUpdateBoard={mockHandleUpdateBoard}
                hideModal={mockHideModal}
                prefill={{
                    ...sampleBoard,
                    columns: [
                        {name: '', id: 'asdf', color: '#FFFFFF', tasks: []}
                    ]
                }}
            />
        )
        await userEvent.click(getByTestId('update-board-submit'));
        expect(mockHandleUpdateBoard).not.toHaveBeenCalled();
        expect(getByTestId('column text-field-error')).toBeInTheDocument();
    })
})