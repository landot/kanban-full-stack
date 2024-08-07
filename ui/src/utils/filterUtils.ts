import { Board, Column, Task, Subtask } from "../types/data";

export function getBoardsWithId(id: string, boards: Board[]): Board[] {
    return boards.filter(board => board.id === id);
  }

  export function getColumnsWithId(id: string, columns: Column[]): Column[] {
    return columns.filter(column => column.id === id);
  }

  export function getColumnsWithName(name: string, columns: Column[]): Column[] {
    return columns.filter(column => column.name === name);
  }


  export function getTasksWithId(id: string, tasks: Task[]): Task[] {
    return tasks.filter(task => task.id === id);
  }

  export function getSubtasksWithId(id: string, subtasks: Subtask[]): Subtask[] {
    return subtasks.filter(subtask => subtask.id === id);
  }
  