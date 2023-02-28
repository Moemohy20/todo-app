import { Todo } from '../schemas';

export interface ITodoRepository {
    addTodo(todo: Todo): Promise<Todo>
    getTodo(id: string): Promise<Todo>
    getTodos(): Promise<Todo[]>
    updateTodo(todo: Todo): Promise<Todo>
    deleteTodo(id: string): Promise<void>
}