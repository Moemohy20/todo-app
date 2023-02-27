/* eslint-disable prettier/prettier */
import { Todo } from '../schemas';

export interface ITodoRepository {
    add(todo: Todo): Promise<Todo>
    get(id: number): Promise<Todo>
    getAll(): Promise<Todo[]>
    update(id: number): Promise<void>
    delete(id: number): Promise<boolean>
}