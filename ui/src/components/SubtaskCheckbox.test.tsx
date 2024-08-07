import { Checkbox } from "./SubtaskCheckbox";
import { render } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Subtask } from '../types/data';

const completedSubtask: Subtask = {
    id: '123',
    title: 'task title',
    isCompleted: true
}


const notCompletedSubtask: Subtask = {
    id: '123',
    title: 'task title',
    isCompleted: false
}

describe("Checkbox", () => {
    test('checkbox is shown when isComplete=true', () => {
        const mockClick = vi.fn();
        const {getByTestId} = render(
            <Checkbox subtask={completedSubtask} handleClick={mockClick} />
        )
        const subtask = getByTestId('subtask-checkbox-completed');
        expect(subtask).toBeInTheDocument();
        expect(subtask.textContent).toBe('task title');
    })

    test('checkbox is shown when isComplete=false', () => {
        const mockClick = vi.fn();
        const {getByTestId} = render(
            <Checkbox subtask={notCompletedSubtask} handleClick={mockClick} />
        )
        const subtask = getByTestId('subtask-checkbox');
        expect(subtask).toBeInTheDocument();
        expect(subtask.textContent).toBe('task title');
    })

    test('handleClick prop is called when checkbox is clicked (isComplete=true)', async () => {
        const mockClick = vi.fn();
        const {getByTestId} = render(
            <Checkbox subtask={completedSubtask} handleClick={mockClick} />
        )
        const checkbox = getByTestId('checkbox');
        await userEvent.click(checkbox);
        expect(mockClick).toHaveBeenCalled();
    })


    test('handleClick prop is called when checkbox is clicked (isComplete=false)', async () => {
        const mockClick = vi.fn();
        const {getByTestId} = render(
            <Checkbox subtask={notCompletedSubtask} handleClick={mockClick} />
        )
        const checkbox = getByTestId('checkbox');
        await userEvent.click(checkbox);
        expect(mockClick).toHaveBeenCalled();
    })
})