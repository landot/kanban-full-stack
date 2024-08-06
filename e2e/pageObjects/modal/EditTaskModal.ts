import { Page, Locator } from "@playwright/test";

export class EditTaskModal {
    readonly page: Page;
    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly subtaskInput: Locator;
    readonly deleteSubtaskIcon: Locator;
    readonly selectedStatus: Locator;
    readonly statusDropdownOption: Locator;
    readonly submit: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleInput = this.page.getByTestId('task-title text-field').getByTestId('text-field-input');
        this.descriptionInput = this.page.getByTestId('task-description text-field').getByTestId('text-field-input');
        this.subtaskInput = this.page.getByTestId('edit-subtask').getByTestId('text-field-input');
        this.deleteSubtaskIcon = this.page.getByTestId('delete-subtask');
        this.selectedStatus = this.page.getByTestId('dropdown-value');
        this.statusDropdownOption = this.page.getByTestId('dropdown-option');
        this.submit = this.page.getByTestId('update-task-submit');
    }
}