import { test, expect, Page } from '@playwright/test';

// user can delete a board 
// user can delete a task 
// user can delete a column 
// user can add a board 
// user can add a task 
// user can add a column 
// user can update a board 
// user can update a task 
// user can create a board 
// user can login 
// user can log out 
// user can re-organize tasks within a board using drag and drop

export async function login(page: Page, username: string, password: string) {
  await page.getByTestId('email').type(username);
  await page.getByTestId('password').type(password);
  await page.getByTestId('submit').click();
}

export async function resetBoard(page: Page) {
  await page.getByTestId('account-more-actions').click();
  await page.getByTestId('more-actions-item').nth(1).click();
}

export async function getAllTextForTestId(page: Page, testId: string) {
  return await page.getByTestId(testId).allTextContents();
}

test('user can delete a board', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await login(page, 'timowland+asdf@gmail.com', 'asdfasdf');
  await resetBoard(page);
  const boards = await getAllTextForTestId(page, 'sidebar-board');
  const title = await page.getByTestId('header-title').textContent();
  expect(title).toBe('Platform Launch');
  await page.getByTestId('Board-more-actions').click();
  await page.getByTestId('more-actions-item').nth(1).click();
  await page.getByTestId('delete-modal-delete').click();
  const updatedTitle = await page.getByTestId('header-title').textContent();
  expect(updatedTitle).not.toEqual(title);
  expect(updatedTitle).toEqual('Marketing Plan');
  const updatedBoards = await getAllTextForTestId(page, 'sidebar-board');
  expect(boards).not.toBe(updatedBoards);
});

test('user can delete a column', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await login(page, 'timowland+asdf@gmail.com', 'asdfasdf');
  await resetBoard(page);
  const columns = await getAllTextForTestId(page, 'column-name');
  await page.getByTestId('Board-more-actions').click();
  await page.getByTestId('more-actions-item').nth(0).click();
  await page.getByTestId('column-delete').nth(0).click();
  await page.getByTestId('update-board-submit').click();
  const updatedColumn = await getAllTextForTestId(page, 'column-name');
  expect(columns).not.toBe(updatedColumn);
  expect(updatedColumn).not.toContain('Todo');
});

test('user can delete a task', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await login(page, 'timowland+asdf@gmail.com', 'asdfasdf');
  await resetBoard(page);
  const tasks = await getAllTextForTestId(page, 'task');
  await page.getByTestId('task').nth(0).click();
  await page.getByTestId('Task-more-actions').click();
  await page.getByTestId('more-actions-item').nth(1).click();
  await page.getByTestId('delete-modal-delete').click();
  const updatedTasks = await getAllTextForTestId(page, 'task');
  expect(updatedTasks).not.toBe(tasks);
  expect(updatedTasks).not.toContain(tasks[0]);
});
