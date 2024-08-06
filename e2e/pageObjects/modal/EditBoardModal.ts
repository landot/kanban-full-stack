import { Page, Locator } from "@playwright/test";

export class EditBoardModal {
    readonly page: Page;
    readonly nameTextInput: Locator;
    readonly columnTextInput: Locator;
    readonly deleteColumnIcon: Locator;
    readonly addColumn: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameTextInput = this.page.getByTestId('name text-field').getByTestId('text-field-input');
        this.columnTextInput = this.page.getByTestId('column text-field').getByTestId('text-field-input');
        this.deleteColumnIcon = this.page.getByTestId('column-delete');
        this.addColumn = this.page.getByTestId('add-column');
        this.submitButton = this.page.getByTestId('update-board-submit');
    }
}