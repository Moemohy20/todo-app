import { ITodo } from '../entities';

export interface ITodoRepository {
  addTodo(todo: ITodo): Promise<ITodo>;
  getTodo(id: string): Promise<ITodo>;
  getTodos(): Promise<ITodo[]>;
  getListTodos(field: string, operator: string, value: string): Promise<ITodo[]>;
  updateTodo(todo: ITodo): Promise<ITodo>;
  deleteTodo(id: string): Promise<void>;
}
