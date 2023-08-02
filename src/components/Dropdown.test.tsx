import { Dropdown } from "./Dropdown";
import {render } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe("Dropdown", () => {
    test('selected dropdown value is shown', () => {
        const mockHandleChange = vi.fn()
        const {getByTestId} = render(
            <Dropdown values={['1', '2', '3']} value={'2'} handleChange={mockHandleChange} />
        )
        expect(getByTestId('dropdown-value').textContent).toBe('2');
    })

    test('handleChange prop is called when a dropdown item is selected', async () => {
        const mockHandleChange = vi.fn()
        const {getByTestId, getAllByTestId} = render(
            <Dropdown values={['1', '2', '3']} value={'2'} handleChange={mockHandleChange} />
        )
        await userEvent.click(getByTestId('dropdown-value'));
        await userEvent.click(getAllByTestId('dropdown-option')[0]);
        expect(getByTestId('dropdown-value').textContent).toBe('1');
        expect(mockHandleChange).toHaveBeenCalledWith('1');
    })

    test('dropdown is closed when clicking outside', async () => {
        const mockHandleChange = vi.fn()
        const {getByText, getByTestId, getAllByTestId, queryByTestId} = render(
            <>
                <p>element outside</p>
                <Dropdown values={['1', '2', '3']} value={'2'} handleChange={mockHandleChange} />
            </>
        )
        await userEvent.click(getByTestId('dropdown-value'));
        expect(getAllByTestId('dropdown-option')).toHaveLength(3);
        await userEvent.click(getByText('element outside'));
        expect(queryByTestId('dropdown-option')).not.toBeInTheDocument();
    })
})
