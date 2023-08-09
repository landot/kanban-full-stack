import { Locator, Page } from "@playwright/test";
import { DeleteModal } from "./modal/DeleteModal";
import { EditBoardModal } from "./modal/EditBoardModal";
import { EditTaskModal } from "./modal/EditTaskModal";
import { ViewTaskModal } from "./modal/ViewTaskModal";

export class KanbanBoardPage {
    readonly page: Page;
    readonly accountMoreActions: Locator;
    readonly accountMoreActionsItem: Locator;

    readonly boardMoreActions: Locator;
    readonly boardMoreActionsItem: Locator;

    readonly sidebarBoard: Locator;
    readonly createNewBoard: Locator;

    readonly title: Locator;
    readonly newTask: Locator;
    readonly task: Locator;

    readonly deleteModal: DeleteModal;
    readonly editBoardModal: EditBoardModal;
    readonly viewTaskModal: ViewTaskModal;
    readonly editTaskModal: EditTaskModal;

    constructor(page: Page) {
        this.page = page;

        // account actions
        this.accountMoreActions = this.page.getByTestId('account-more-actions');
        this.accountMoreActionsItem = this.page.getByTestId('more-actions-item');
        
        // board actions
        this.boardMoreActions = this.page.getByTestId('Board-more-actions');
        this.boardMoreActionsItem = this.page.getByTestId('more-actions-item');
        
        // sidebar
        this.sidebarBoard = this.page.getByTestId('sidebar-board');
        this.createNewBoard = this.page.getByTestId('create-new-board');

        // kanban board
        this.title = this.page.getByTestId('header-title');
        this.newTask = this.page.getByTestId('new-task');
        this.task = this.page.getByTestId('task');

        //modals
        this.deleteModal = new DeleteModal(page);
        this.editBoardModal = new EditBoardModal(page);
        this.viewTaskModal = new ViewTaskModal(page);
        this.editTaskModal = new EditTaskModal(page);
    }

    public async logOut() {
        await this.accountMoreActions.click();
        await this.accountMoreActionsItem.nth(0).click();
      }

    public async resetBoard() {
        await this.accountMoreActions.click();
        await this.accountMoreActionsItem.nth(1).click();
    }
}
