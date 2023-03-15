import { Injectable, Inject } from '@nestjs/common';
import { ITodoRepository, ITodo } from '../../domain';
import { ITodoService } from '../services/todo.service.interface';
@Injectable()
export class TodoRepository implements ITodoRepository {
  constructor(@Inject('TodoService') private readonly service: ITodoService) {}

  addTodo(todo: ITodo): Promise<ITodo> {
    return this.service.add(todo);
  }

  getTodo(id: string): Promise<ITodo> {
    return this.service.get(id);
  }

  getListTodos(field: string, operator: string, value: string): Promise<ITodo[]> {
    return this.service.query(field, operator, value);
  }

  getTodos(): Promise<ITodo[]> {
    return this.service.getAll();
  }

  updateTodo(todo: ITodo): Promise<ITodo> {
    return this.service.update(todo);
  }

  deleteTodo(id: string): Promise<void> {
    return this.service.delete(id);
  }
}
