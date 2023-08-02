import { Overlay } from "./Overlay";
import { render } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe("Overlay", () => {
    test('clicking overlay calls handleClose prop', async () => {
        const mockHandleClose = vi.fn();
        const {getByTestId} = render(
            <Overlay handleClose={mockHandleClose}>
                <p>stuff inside overlay</p>
            </Overlay>
        )
        await userEvent.click(getByTestId('overlay'))
        expect(mockHandleClose).toHaveBeenCalled();
    })

    test('clicking overlay content does not call handleClose prop', async () => {
        const mockHandleClose = vi.fn();
        const {getByTestId} = render(
            <Overlay handleClose={mockHandleClose}>
                <p>stuff inside overlay</p>
            </Overlay>
        )
        await userEvent.click(getByTestId('overlay-content'))
        expect(mockHandleClose).not.toHaveBeenCalled();
    })

    test('content is shown in overlay', async () => {
        const mockHandleClose = vi.fn();
        const {getByText} = render(
            <Overlay handleClose={mockHandleClose}>
                <p>stuff inside overlay</p>
            </Overlay>
        )
        expect(getByText('stuff inside overlay')).toBeInTheDocument();
    })
})
