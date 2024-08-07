import { StyledButton } from "./StyledButton";
import { render } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { LargeDestructive, LargePrimary } from "./styles/StyledButton.styles";

describe("StyledButton", () => {
    test('text is shown', async () => {
        const mockHandleClick = vi.fn();
        const {getByTestId} = render(
            <StyledButton 
                label={"button"} 
                isDisabled={false} 
                buttonProps={LargePrimary}         
                onClick={mockHandleClick} 
                testId='test-button'
            />
        )
        expect(getByTestId('test-button').textContent).toBe('button');
    })


    test('isDisabled prop disables button', async () => {
        const mockHandleClick = vi.fn();
        const {getByTestId} = render(
            <StyledButton 
                label={"button"} 
                isDisabled={true} 
                buttonProps={LargePrimary}         
                onClick={mockHandleClick}
                testId='test-button'
            />
        )
        expect(getByTestId('test-button')).toBeDisabled();
    })

    test('buttonProps updates button style', async () => {
        const mockHandleClick = vi.fn();
        const {getByTestId} = render(
            <StyledButton 
                label={"button"} 
                isDisabled={false} 
                buttonProps={LargeDestructive}         
                onClick={mockHandleClick}
                testId='test-button'
            />
        )
        const button = getByTestId('test-button');
        expect(button).toHaveStyle('background: #EA5555');
        expect(button).toHaveStyle('fontSize: 15px');
    })

    test('clicking button calls onClick prop', async () => {
        const mockHandleClick = vi.fn();
        const {getByTestId} = render(
            <StyledButton 
                label={"button"} 
                isDisabled={false} 
                buttonProps={LargeDestructive}         
                onClick={mockHandleClick}
                testId='test-button'
            />
        )
        const button = getByTestId('test-button');
        await userEvent.click(button);
        expect(mockHandleClick).toHaveBeenCalled();
    })

})
