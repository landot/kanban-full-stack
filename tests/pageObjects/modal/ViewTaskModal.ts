import { Page, Locator } from "@playwright/test";

export class ViewTaskModal {
    readonly page: Page;
    readonly moreActions: Locator;
    readonly moreActionsItem: Locator;
    readonly header: Locator;
    readonly description: Locator;
    readonly subtaskCompleted: Locator;
    readonly subtaskCompletedCheckbox: Locator;
    readonly subtaskNotCompleted: Locator;
    readonly subtaskNotCompletedCheckbox: Locator;
    readonly selectedStatus: Locator;
    readonly statusDropdownOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.moreActions = this.page.getByTestId('Task-more-actions');
        this.moreActionsItem = this.page.getByTestId('more-actions-item');
        this.header = this.page.getByTestId('view-task-header');
        this.description = this.page.getByTestId('view-task-description');
        this.subtaskCompleted = this.page.getByTestId('subtask-checkbox-completed');
        this.subtaskCompletedCheckbox = this.subtaskCompleted.getByTestId('checkbox');
        this.subtaskNotCompleted = this.page.getByTestId('subtask-checkbox');
        this.subtaskNotCompletedCheckbox = this.subtaskNotCompleted.getByTestId('checkbox');
        this.selectedStatus = this.page.getByTestId('dropdown-value');
        this.statusDropdownOption = this.page.getByTestId('dropdown-option');
    }
}