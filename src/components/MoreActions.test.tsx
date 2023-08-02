import { MoreAction } from "./MoreAction";
import { render } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe("MoreAction", () => {
    test('shows ellipsis', () => {
        const mockActionClick1 = vi.fn();
        const mockActionClick2 = vi.fn();
        const {getByTestId} = render(
            <MoreAction actionItemName={"test"} items={[
                {text: 'destructive', itemType: 'destructive', action: mockActionClick1},
                {text: 'primary', itemType: 'primary', action: mockActionClick2}
            ]}            
            />
        )
        expect(getByTestId('test-more-actions')).toBeInTheDocument();
    })

    test('calls action prop when clicked', async () => {
        const mockActionClick1 = vi.fn();
        const mockActionClick2 = vi.fn();
        const {getByTestId, queryByTestId, queryAllByTestId} = render(
            <MoreAction actionItemName={"test"} items={[
                {text: 'destructive', itemType: 'destructive', action: mockActionClick1},
                {text: 'primary', itemType: 'primary', action: mockActionClick2}
            ]}            
            />
        )
        expect(queryByTestId('more-actions-item')).not.toBeInTheDocument();
        await userEvent.click(getByTestId('test-more-actions'));
        const items = queryAllByTestId('more-actions-item');
        expect(items).toHaveLength(2);
        await userEvent.click(items[0]);
        expect(mockActionClick1).toHaveBeenCalled();
        expect(mockActionClick2).not.toHaveBeenCalled();
    })

    test('clicking outside closed more actions', async () => {
        const mockActionClick1 = vi.fn();
        const mockActionClick2 = vi.fn();
        const {getByText, getByTestId, queryByTestId, queryAllByTestId} = render(
            <>
                <p>element outside</p>
                <MoreAction actionItemName={"test"} items={[
                    {text: 'destructive', itemType: 'destructive', action: mockActionClick1},
                    {text: 'primary', itemType: 'primary', action: mockActionClick2}
                ]}               
            />
            </>
        )
        await userEvent.click(getByTestId('test-more-actions'));
        expect(queryAllByTestId('more-actions-item')).toHaveLength(2);
        await userEvent.click(getByText('element outside'));
        expect(queryByTestId('more-actions-item')).not.toBeInTheDocument();
    })
})
