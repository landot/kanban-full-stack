import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly submit: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = this.page.getByTestId('email');
        this.password = this.page.getByTestId('password');
        this.submit = this.page.getByTestId('submit');
    }
    public async login(username: string, password: string) {
        await this.email.type(username);
        await this.password.type(password);
        await this.submit.click();
    }
}
