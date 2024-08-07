import { ShowSidebar } from "./ShowSidebar";
import { render } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe("ShowSidebar", () => {
    test('clicking overlay calls handleClose prop', async () => {
        const mockHandleClick = vi.fn();
        const {getByTestId} = render(
            <ShowSidebar handleClick={mockHandleClick} />
        )
        await userEvent.click(getByTestId('show-sidebar'));
        expect(mockHandleClick).toHaveBeenCalled();
    })
})
