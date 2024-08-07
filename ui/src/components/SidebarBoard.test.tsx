import { SidebarBoard } from "./SidebarBoard";
import { render } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe("SidebarBoard", () => {
    test('text is shown', async () => {
        const mockHandleClick = vi.fn();
        const {getByText} = render(
            <SidebarBoard 
                text={"test"} 
                selected={false} 
                handleClick={mockHandleClick} 
                icon={"board"} 
            />
        )
        expect(getByText('test')).toBeInTheDocument();
    })


    test('handleClick prop is called when clicked', async () => {
        const mockHandleClick = vi.fn();
        const {getByTestId} = render(
            <SidebarBoard 
                text={"test"} 
                selected={false} 
                handleClick={mockHandleClick} 
                icon={"board"} 
            />
        )
        await userEvent.click(getByTestId('sidebar-board'));
        expect(mockHandleClick).toHaveBeenCalled();
    })

    test('board icon is shown', async () => {
        const mockHandleClick = vi.fn();
        const {getByTestId} = render(
            <SidebarBoard 
                text={""} 
                selected={false} 
                handleClick={mockHandleClick} 
                icon={"board"} 
            />
        )
        expect(getByTestId('board-icon')).toBeInTheDocument();
    })

    test('hide icon is shown', async () => {
        const mockHandleClick = vi.fn();
        const {getByTestId} = render(
            <SidebarBoard 
                text={""} 
                selected={false} 
                handleClick={mockHandleClick} 
                icon={"hide"} 
            />
        )
        expect(getByTestId('hide-icon')).toBeInTheDocument();
    })
})
