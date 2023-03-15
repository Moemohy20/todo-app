import { Status, ITodo } from '../../domain/entities';

export class Todo implements ITodo {
  constructor(
    public id?: string,
    public title?: string,
    public content?: string,
    public todoStatus?: Status,
    public listId?: string,
  ) {}
  equals(entity: ITodo): boolean {
    if (entity instanceof Todo) {
      return this.id === entity.id;
    }
    return false;
  }
}
