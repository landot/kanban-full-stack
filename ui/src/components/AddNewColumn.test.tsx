import { AddNewColumn } from "./AddNewColumn";
import {fireEvent, render, screen} from '@testing-library/react'
import { vi } from 'vitest';
import '@testing-library/jest-dom';

describe("AddNewColumn", () => {
  test('loads and shows text', async () => {
      const mockOnClick = vi.fn()
      render(<AddNewColumn handleClick={mockOnClick()} />)
      expect(screen.getAllByText('+ New Column')).toBeTruthy();
  })

  test('clicking results in firing of onClick prop', async () => {
    const mockOnClick = vi.fn()
    const { getByTestId } = render(<AddNewColumn handleClick={mockOnClick()} />);
    const clickIndicator = getByTestId('add-new-column');
    fireEvent.click(clickIndicator)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
