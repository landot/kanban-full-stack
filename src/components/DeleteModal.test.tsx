import { DeleteModal } from "./DeleteModal";
import {render } from '@testing-library/react'
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe("DeleteModal", () => {
  test('handleDelete prop is called when delete is clicked', async () => {
    const mockHandleDelete = vi.fn()
    const mockHideModal = vi.fn()
    const {getByTestId} = render(
        <DeleteModal 
            name={"task"} 
            text={""} 
            handleDelete={mockHandleDelete} 
            hideModal={mockHideModal} 
        />
    )
    await userEvent.click(getByTestId('delete-modal-delete'));
    expect(mockHandleDelete).toHaveBeenCalled();
  })

  test('hideModal prop is called when cancel is clicked', async () => {
    const mockHandleDelete = vi.fn()
    const mockHideModal = vi.fn()
    const {getByTestId} = render(
        <DeleteModal 
            name={"task"} 
            text={""} 
            handleDelete={mockHandleDelete} 
            hideModal={mockHideModal} 
        />
    )
    await userEvent.click(getByTestId('delete-modal-cancel'));
    expect(mockHideModal).toHaveBeenCalled();
  })
})
