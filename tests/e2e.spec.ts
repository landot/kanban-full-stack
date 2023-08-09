import { test, expect, Page } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  await page.getByTestId('email').type(username);
  await page.getByTestId('password').type(password);
  await page.getByTestId('submit').click();
}

export async function resetBoard(page: Page) {
  await page.getByTestId('account-more-actions').click();
  await page.getByTestId('more-actions-item').nth(1).click();
}


export async function logOut(page: Page) {
  await page.getByTestId('account-more-actions').click();
  await page.getByTestId('more-actions-item').nth(0).click();
}

export async function registerAccount(page: Page) {
  await page.getByTestId('account-more-actions').click();
  await page.getByTestId('more-actions-item').nth(2).click();
}

export async function getAllTextForTestId(page: Page, testId: string | RegExp) {
  return await page.getByTestId(testId).allTextContents();
}

export async function getAllTextByCss(page: Page, css: string) {
  return await page.locator(css).allTextContents();
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

test('user can add a board', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await login(page, 'timowland+asdf@gmail.com', 'asdfasdf');
  await resetBoard(page);
  const boards = await getAllTextForTestId(page, 'sidebar-board');
  await page.getByTestId('create-new-board').click();
  await page.getByTestId('name text-field').getByTestId('text-field-input').type('newboard');
  await page.getByTestId('column text-field').getByTestId('text-field-input').nth(0).type('newcolumn');
  await page.getByTestId('column-delete').nth(1).click();
  await page.getByTestId('update-board-submit').click();
  const updatedBoards = await getAllTextForTestId(page, 'sidebar-board');
  expect(boards).not.toBe(updatedBoards);
  expect([...boards, 'newboard'].sort()).toEqual(updatedBoards.sort());
});

test('user can add a task', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await login(page, 'timowland+asdf@gmail.com', 'asdfasdf');
  await resetBoard(page);
  const tasks = await getAllTextForTestId(page, 'task-title');
  await page.getByTestId('new-task').click();
  await page.getByTestId('task-title text-field').getByTestId('text-field-input').type('newtask');
  await page.getByTestId('task-description text-field').getByTestId('text-field-input').type('newtask description');
  await page.getByTestId('edit-subtask').getByTestId('text-field-input').nth(0).type('subtask description');
  await page.getByTestId('delete-subtask').nth(1).click();
  await page.getByTestId('update-task-submit').click();
  const updatedTasks = await getAllTextForTestId(page, 'task-title');
  expect(tasks).not.toBe(updatedTasks);
  expect([...tasks, 'newtask'].sort()).toEqual(updatedTasks.sort());
});

test('user can add a column', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await login(page, 'timowland+asdf@gmail.com', 'asdfasdf');
  await resetBoard(page);
  const columns = await getAllTextForTestId(page, 'column-name');
  await page.getByTestId('Board-more-actions').click();
  await page.getByTestId('more-actions-item').nth(0).click();
  await page.getByTestId('add-column').click();
  await page.getByTestId('column text-field').getByTestId('text-field-input').nth(3).type('newcolumn');
  await page.getByTestId('update-board-submit').click();
  const updatedColumns = await getAllTextForTestId(page, 'column-name');
  expect(columns).not.toBe(updatedColumns);
  expect([...columns, 'newcolumn'].sort()).toEqual(updatedColumns.sort());
});

// note: updating a column name keeps the tasks associated with the old column
test('user can update a column name', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await login(page, 'timowland+asdf@gmail.com', 'asdfasdf');
  await resetBoard(page);
  const boards = await getAllTextByCss(page, '[data-testid*="sidebar-board"]');
  await page.getByTestId('Board-more-actions').click();
  await page.getByTestId('more-actions-item').nth(0).click();
  await page.getByTestId('name text-field').getByTestId('text-field-input').clear();
  await page.getByTestId('name text-field').getByTestId('text-field-input').type('updatedboardname');
  await page.getByTestId('column text-field').getByTestId('text-field-input').nth(0).clear();
  await page.getByTestId('column text-field').getByTestId('text-field-input').nth(0).type('updatedcolumnname');
  await page.getByTestId('update-board-submit').click();
  const updatedBoards = await getAllTextByCss(page, '[data-testid*="sidebar-board"]');
  const updatedColumns = await getAllTextForTestId(page, 'column-name');
  const updatedTasks = await getAllTextForTestId(page, 'task-title');
  expect(boards).not.toBe(updatedBoards);
  expect(updatedBoards).not.toContain('Platform Launch');
  expect(updatedBoards).toContain('updatedboardname');
  expect(updatedColumns).toEqual([
    "updatedcolumnname",
    "Doing",
    "Done",
  ]);
  expect(updatedTasks.length).toEqual(17);
});

test('user can update a task via the edit task modal', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await login(page, 'timowland+asdf@gmail.com', 'asdfasdf');
  await resetBoard(page);
  await page.getByTestId('task-title').nth(0).click();
  await page.getByTestId('Task-more-actions').click();
  await page.getByTestId('more-actions-item').nth(0).click();
  // update title
  await page.getByTestId('task-title text-field').getByTestId('text-field-input').clear();
  await page.getByTestId('task-title text-field').getByTestId('text-field-input').type('updatedtask');
  // update description
  await page.getByTestId('task-description text-field').getByTestId('text-field-input').clear();
  await page.getByTestId('task-description text-field').getByTestId('text-field-input').type('updatedtask description');
  // update first subtask
  await page.getByTestId('edit-subtask').getByTestId('text-field-input').nth(0).clear();
  await page.getByTestId('edit-subtask').getByTestId('text-field-input').nth(0).type('subtask description');
  // remove second subtask
  await page.getByTestId('delete-subtask').nth(1).click();
  // update task status
  await page.getByTestId('dropdown-value').click();
  await page.getByTestId('dropdown-option').nth(1).click();
  // submit
  await page.getByTestId('update-task-submit').click();

  await page.getByTestId('task-title').getByText('updatedtask').click();
  // verify header, description, subtasks, and status updates
  expect(await page.getByTestId('view-task-header').textContent()).toBe('updatedtask');
  expect(await page.getByTestId('view-task-description').textContent()).toBe('updatedtask description');
  expect(await page.getByTestId('subtask-checkbox-completed').all()).toHaveLength(1);
  expect(await page.getByTestId('subtask-checkbox').all()).toHaveLength(1);
  expect(await page.getByTestId('dropdown-value').textContent()).toBe('Doing');
});

test('user can update a task via the view task modal', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await login(page, 'timowland+asdf@gmail.com', 'asdfasdf');
  await resetBoard(page);
  await page.getByTestId('task-title').nth(0).click();
  expect(await page.getByTestId('subtask-checkbox-completed').all()).toHaveLength(1);
  expect(await page.getByTestId('subtask-checkbox').all()).toHaveLength(2);
  // un-cross subtask
  await page.getByTestId('subtask-checkbox-completed').getByTestId('checkbox').click();
  expect(await page.getByTestId('subtask-checkbox-completed').all()).toHaveLength(0);
  expect(await page.getByTestId('subtask-checkbox').all()).toHaveLength(3);
  // cross off subtask
  await page.getByTestId('subtask-checkbox').nth(0).getByTestId('checkbox').click();
  expect(await page.getByTestId('subtask-checkbox-completed').all()).toHaveLength(1);
  expect(await page.getByTestId('subtask-checkbox').all()).toHaveLength(2);
  // change status
  await page.getByTestId('dropdown-value').click();
  await page.getByTestId('dropdown-option').nth(1).click();
  expect(await page.getByTestId('dropdown-value').textContent()).toBe('Doing');
});

test('user can log out', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await login(page, 'timowland+asdf@gmail.com', 'asdfasdf');
  await logOut(page);
  await page.waitForURL('http://localhost:5173/login')
});

// drag and drop not working in playwright between columns
test.skip('user can click and drag tasks', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await login(page, 'timowland+asdf@gmail.com', 'asdfasdf');
  await resetBoard(page);
  const tasks = await page.getByTestId('task').all();
  const taskToMove = tasks[0];
  const taskToMoveTitle = await taskToMove.textContent() || '';
  const taskCurrentColumn = page.locator('[data-testid="column-container"]', { has: page.getByText(taskToMoveTitle) });
  const taskCurrentColumnName = await taskCurrentColumn.getByTestId('column-name').textContent();
  expect(taskCurrentColumnName).toBe('Todo');
  await taskToMove.dragTo(tasks[7]);
  const taskNewColumn = page.locator('[data-testid="column-container"]', { has: page.getByText(taskToMoveTitle) });
  const taskNewColumnName = await taskNewColumn.getByTestId('column-name').textContent();
  console.log(taskCurrentColumnName);
  console.log(taskNewColumnName);
  expect(taskNewColumnName).not.toEqual(taskCurrentColumnName);
});
