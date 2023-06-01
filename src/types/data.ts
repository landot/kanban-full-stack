export interface Data {
    boards: Board[];
}

export interface Board {
    id:      string;
    name:    string;
    columns: Column[];
}

export interface Column {
    id:    string;
    name:  string;
    color: string;
    tasks: Task[];
}

export interface Task {
    id:          string;
    title:       string;
    description: string;
    status:      Status;
    subtasks:    Subtask[];
}

// todo status could be any value 
// status types will be decided when a board is created
// todo remove this later
export enum Status {
    Doing = "Doing",
    Done = "Done",
    Empty = "",
    Todo = "Todo",
}

export interface Subtask {
    id:          string;
    title:       string;
    isCompleted: boolean;
}
