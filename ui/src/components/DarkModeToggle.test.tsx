import { DarkModeToggle } from "./DarkModeToggle";
import {render } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe("DarkModeToggle", () => {
    test('toggleTheme prop is called when slider is clicked', async () => {
        const mockToggleTheme = vi.fn()
        const {getByTestId} = render(
            <DarkModeToggle toggleTheme={mockToggleTheme} />
        )
        await userEvent.click(getByTestId('dark-mode-slider'));
        expect(mockToggleTheme).toHaveBeenCalledWith('dark');
    })
})
