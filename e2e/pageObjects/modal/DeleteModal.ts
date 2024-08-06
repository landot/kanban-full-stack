import { Page, Locator } from "@playwright/test";

export class DeleteModal {
    readonly page: Page;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.deleteButton = this.page.getByTestId('delete-modal-delete');
    }
}