import { IEntity } from 'src/core/interfaces';

export interface ITodo extends IEntity {
  id?: string;
  title?: string;
  content?: string;
  todoStatus?: Status;
  listId?: string;

  equals(todo: ITodo): boolean;
}

export enum Status {
  NOTSTARTED = 'NotStarted',
  INPROGRESS = 'InProgress',
  COMPLETE = 'Complete',
}
