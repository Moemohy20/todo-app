import { Todo } from "../../domain"

export interface ITodoService {
    add(todo: Todo): Promise<Todo>
    get(id: string): Promise<Todo>
    getAll(): Promise<Todo[]>
    update(todo: Todo): Promise<Todo>
    delete(id: string): Promise<void>
}
