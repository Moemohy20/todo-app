/* eslint-disable prettier/prettier */
export interface Todo {
    id?: number;
    title: string;
    content: string;
    status: Status
}

export enum Status {
    NotStarted,
    InProgress,
    Complete
}