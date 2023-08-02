import { EmptyBoard } from "./EmptyBoard";
import { render } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe("EmptyBoard", () => {
    test('selected dropdown value is shown', () => {
        const mockNewColumnClick = vi.fn()
        const {getByText} = render(
            <EmptyBoard handleNewColumnClick={mockNewColumnClick} />
        )
        expect(getByText('This board is empty. Create a new column to get started.')).toBeInTheDocument();
    })

    test('Clicking new column calls handleNewColumnClick prop', async () => {
        const mockNewColumnClick = vi.fn()
        const {getByTestId} = render(
            <EmptyBoard handleNewColumnClick={mockNewColumnClick} />
        )
        await userEvent.click(getByTestId('empty-new-column'));
        expect(mockNewColumnClick).toHaveBeenCalled();
    })
})
