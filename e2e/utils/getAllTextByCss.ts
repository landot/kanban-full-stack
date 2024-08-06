import { Page } from "@playwright/test";

export async function getAllTextByCss(page: Page, css: string) {
    return await page.locator(css).allTextContents();
  }