import { Board, Column, Task, Subtask } from "../types/data";

export function getBoardIndexWithId(id: string, boards: Board[]) {
    return boards.findIndex(board => board.id === id);
  }

  export function getColumnIndexWithId(id: string, columns: Column[]) {
    return columns.findIndex(column => column.id === id);
  }

  export function getTaskIndexWithId(id: string, tasks: Task[]): number {
    return tasks.findIndex(task => task.id === id);
  }

  export function getSubtaskIndexWithId(id: string, subtasks: Subtask[]): number {
    return subtasks.findIndex(subtask => subtask.id === id);
  }