import { ITodo } from '../../domain';

export interface ITodoService {
  add(todo: ITodo): Promise<ITodo>;
  get(id: string): Promise<ITodo>;
  getAll(): Promise<ITodo[]>;
  query(field: string, operator: string, value: string): Promise<ITodo[]>;
  update(todo: ITodo): Promise<ITodo>;
  delete(id: string): Promise<void>;
}
