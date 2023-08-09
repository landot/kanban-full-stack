import { Page } from "@playwright/test";

export async function getAllTextForTestId(page: Page, testId: string | RegExp) {
    return await page.getByTestId(testId).allTextContents();
  }