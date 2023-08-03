import { TextField } from "./TextField";
import { render } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe("TextField", () => {
    test('has placeholder', () => {
        const mockHandleChange = vi.fn();
        const {getByTestId} = render(
            <TextField 
                showValidationError={false} 
                placeholder={"test"} 
                value={""} 
                handleChange={mockHandleChange} 
            />
        )
        const input = getByTestId('text-field-input');
        expect(input).toHaveAttribute('placeholder', 'test')
    })

    test('shows value', () => {
        const mockHandleChange = vi.fn();
        const {getByTestId} = render(
            <TextField 
                showValidationError={false} 
                placeholder={"test"} 
                value={"asdf"} 
                handleChange={mockHandleChange} 
            />
        )
        const input = getByTestId('text-field-input');
        expect(input).toHaveAttribute('value', 'asdf');
    })

    test('validation error is shown when showValidationError=true', () => {
        const mockHandleChange = vi.fn();
        const {getByTestId} = render(
            <TextField 
                showValidationError={true} 
                placeholder={"test"} 
                value={""} 
                handleChange={mockHandleChange} 
            />
        )
        expect(getByTestId('validation-message')).toBeInTheDocument();
    })

    test('handleChange prop is called when value is updated', async () => {
        const mockHandleChange = vi.fn();
        const {getByTestId} = render(
            <TextField 
                showValidationError={false} 
                placeholder={"test"} 
                value={""} 
                handleChange={mockHandleChange} 
            />
        )
        const input = getByTestId('text-field-input');
        await userEvent.type(input, 'test');
        expect(mockHandleChange).toHaveBeenCalled();
    })
})