import { test as base, expect } from '@playwright/test';
import { KanbanBoardPage } from './pageObjects/KanbanBoardPage';
import { LoginPage } from './pageObjects/LoginPage';
import { getAllTextByCss } from './utils/getAllTextByCss';
import { getAllTextForTestId } from './utils/getAllTextForTestId';


// Extend basic test by providing a "kanbanPage" fixture.
const test = base.extend<{ kanbanPage: KanbanBoardPage, loginPage: LoginPage }>({
  kanbanPage: async ({ page }, use) => {
    const kanbanPage = new KanbanBoardPage(page);
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login('timowland+asdf@gmail.com', 'asdfasdf');
    await kanbanPage.resetBoard();
    await use(kanbanPage);
  },
});


test('user can delete a board', async ({ page, kanbanPage }) => {
  const boards = await getAllTextForTestId(page, 'sidebar-board');
  const title = await kanbanPage.title.textContent();
  expect(title).toBe('Platform Launch');
  await kanbanPage.boardMoreActions.click();
  await kanbanPage.boardMoreActionsItem.nth(1).click();
  await kanbanPage.deleteModal.deleteButton.click();
  const updatedTitle = await kanbanPage.title.textContent();
  expect(updatedTitle).not.toEqual(title);
  expect(updatedTitle).toEqual('Marketing Plan');
  const updatedBoards = await getAllTextForTestId(page, 'sidebar-board');
  expect(boards).not.toBe(updatedBoards);
});

test('user can delete a column', async ({ page, kanbanPage }) => {
  const columns = await getAllTextForTestId(page, 'column-name');
  await kanbanPage.boardMoreActions.click();
  await kanbanPage.boardMoreActionsItem.nth(0).click();
  await kanbanPage.editBoardModal.deleteColumnIcon.nth(0).click();
  await kanbanPage.editBoardModal.submitButton.click();
  const updatedColumn = await getAllTextForTestId(page, 'column-name');
  expect(columns).not.toBe(updatedColumn);
  expect(updatedColumn).not.toContain('Todo');
});

test('user can delete a task', async ({ page, kanbanPage }) => {
  const tasks = await getAllTextForTestId(page, 'task');
  await kanbanPage.task.nth(0).click();
  await kanbanPage.viewTaskModal.moreActions.click();
  await kanbanPage.viewTaskModal.moreActionsItem.nth(1).click();
  await kanbanPage.deleteModal.deleteButton.click();
  const updatedTasks = await getAllTextForTestId(page, 'task');
  expect(updatedTasks).not.toBe(tasks);
  expect(updatedTasks).not.toContain(tasks[0]);
});

test('user can add a board', async ({ page, kanbanPage }) => {
  const boards = await getAllTextForTestId(page, 'sidebar-board');
  await kanbanPage.createNewBoard.click();
  await kanbanPage.editBoardModal.nameTextInput.type('newboard');
  await kanbanPage.editBoardModal.columnTextInput.nth(0).type('newcolumn');
  await kanbanPage.editBoardModal.deleteColumnIcon.nth(1).click();
  await kanbanPage.editBoardModal.submitButton.click();
  const updatedBoards = await getAllTextForTestId(page, 'sidebar-board');
  expect(boards).not.toBe(updatedBoards);
  expect([...boards, 'newboard'].sort()).toEqual(updatedBoards.sort());
});

test('user can add a task', async ({ page, kanbanPage }) => {
  const tasks = await getAllTextForTestId(page, 'task-title');
  await kanbanPage.newTask.click();
  await kanbanPage.editTaskModal.titleInput.type('newtask');
  await kanbanPage.editTaskModal.descriptionInput.type('newtask');
  await kanbanPage.editTaskModal.subtaskInput.nth(0).type('subtask description');
  await kanbanPage.editTaskModal.deleteSubtaskIcon.nth(1).click();
  await kanbanPage.editTaskModal.submit.click();
  const updatedTasks = await getAllTextForTestId(page, 'task-title');
  expect(tasks).not.toBe(updatedTasks);
  expect([...tasks, 'newtask'].sort()).toEqual(updatedTasks.sort());
});

test('user can add a column', async ({ page, kanbanPage }) => {
  const columns = await getAllTextForTestId(page, 'column-name');
  await kanbanPage.boardMoreActions.click();
  await kanbanPage.boardMoreActionsItem.nth(0).click();
  await kanbanPage.editBoardModal.addColumn.click();
  await kanbanPage.editBoardModal.columnTextInput.nth(3).type('newcolumn');
  await kanbanPage.editBoardModal.submitButton.click();
  const updatedColumns = await getAllTextForTestId(page, 'column-name');
  expect(columns).not.toBe(updatedColumns);
  expect([...columns, 'newcolumn'].sort()).toEqual(updatedColumns.sort());
});

// note: updating a column name keeps the tasks associated with the old column
test('user can update a column name', async ({ page, kanbanPage }) => {
  const boards = await getAllTextByCss(page, '[data-testid*="sidebar-board"]');
  await kanbanPage.boardMoreActions.click();
  await kanbanPage.boardMoreActionsItem.nth(0).click();
  await kanbanPage.editBoardModal.nameTextInput.clear();
  await kanbanPage.editBoardModal.nameTextInput.type('updatedboardname');

  await kanbanPage.editBoardModal.columnTextInput.nth(0).clear();
  await kanbanPage.editBoardModal.columnTextInput.nth(0).type('updatedcolumnname');
  await kanbanPage.editBoardModal.submitButton.click();
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

test('user can update a task via the edit task modal', async ({ kanbanPage }) => {
  await kanbanPage.task.nth(0).click();
  await kanbanPage.viewTaskModal.moreActions.click();
  await kanbanPage.viewTaskModal.moreActionsItem.nth(0).click();
  // update title
  await kanbanPage.editTaskModal.titleInput.clear();
  await kanbanPage.editTaskModal.titleInput.type('updatedtask');
  // update description
  await kanbanPage.editTaskModal.descriptionInput.clear();
  await kanbanPage.editTaskModal.descriptionInput.type('updatedtask description');
  // update first subtask
  await kanbanPage.editTaskModal.subtaskInput.nth(0).clear();
  await kanbanPage.editTaskModal.subtaskInput.nth(0).type('subtask description');
  // remove second subtask
  await kanbanPage.editTaskModal.deleteSubtaskIcon.nth(1).click();
  // update task status
  await kanbanPage.editTaskModal.selectedStatus.click();
  await kanbanPage.editTaskModal.statusDropdownOption.nth(1).click();
  // submit
  await kanbanPage.editTaskModal.submit.click();
  await kanbanPage.task.getByText('updatedtask').click();
  // verify header, description, subtasks, and status updates
  expect(await kanbanPage.viewTaskModal.header.textContent()).toBe('updatedtask');
  expect(await kanbanPage.viewTaskModal.description.textContent()).toBe('updatedtask description');
  expect(await kanbanPage.viewTaskModal.subtaskCompleted.all()).toHaveLength(1);
  expect(await kanbanPage.viewTaskModal.subtaskNotCompleted.all()).toHaveLength(1);
  expect(await kanbanPage.viewTaskModal.selectedStatus.textContent()).toBe('Doing');
});

test('user can update a task via the view task modal', async ({ kanbanPage }) => {
  await kanbanPage.task.nth(0).click();
  expect(await kanbanPage.viewTaskModal.subtaskCompleted.all()).toHaveLength(1);
  expect(await kanbanPage.viewTaskModal.subtaskNotCompleted.all()).toHaveLength(2);
  // un-cross subtask
  await kanbanPage.viewTaskModal.subtaskCompletedCheckbox.click();
  expect(await kanbanPage.viewTaskModal.subtaskCompleted.all()).toHaveLength(0);
  expect(await kanbanPage.viewTaskModal.subtaskNotCompleted.all()).toHaveLength(3);
  // cross off subtask
  await kanbanPage.viewTaskModal.subtaskNotCompletedCheckbox.nth(0).click();
  expect(await kanbanPage.viewTaskModal.subtaskCompleted.all()).toHaveLength(1);
  expect(await kanbanPage.viewTaskModal.subtaskNotCompleted.all()).toHaveLength(2);
  // change status
  await kanbanPage.viewTaskModal.selectedStatus.click();
  await kanbanPage.viewTaskModal.statusDropdownOption.nth(1).click();
  expect(await kanbanPage.viewTaskModal.selectedStatus.textContent()).toBe('Doing');
});

test('user can log out', async ({ page, kanbanPage }) => {
  await kanbanPage.logOut();
  await page.waitForURL('/login')
});

// // drag and drop not working in playwright between columns
// test.skip('user can click and drag tasks', async ({ page }) => {
//   await page.goto('http://localhost:3000/');
//   await login(page, 'timowland+asdf@gmail.com', 'asdfasdf');
//   await resetBoard(page);
//   const tasks = await page.getByTestId('task').all();
//   const taskToMove = tasks[0];
//   const taskToMoveTitle = await taskToMove.textContent() || '';
//   const taskCurrentColumn = page.locator('[data-testid="column-container"]', { has: page.getByText(taskToMoveTitle) });
//   const taskCurrentColumnName = await taskCurrentColumn.getByTestId('column-name').textContent();
//   expect(taskCurrentColumnName).toBe('Todo');
//   await taskToMove.dragTo(tasks[7]);
//   const taskNewColumn = page.locator('[data-testid="column-container"]', { has: page.getByText(taskToMoveTitle) });
//   const taskNewColumnName = await taskNewColumn.getByTestId('column-name').textContent();
//   console.log(taskCurrentColumnName);
//   console.log(taskNewColumnName);
//   expect(taskNewColumnName).not.toEqual(taskCurrentColumnName);
// });
