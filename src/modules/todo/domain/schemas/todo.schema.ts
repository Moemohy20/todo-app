export interface Todo {
    id?: string;
    title?: string;
    content?: string;
    todoStatus?: Status;
    listId?: string;
}

export enum Status {
    NotStarted,
    InProgress,
    Complete
}