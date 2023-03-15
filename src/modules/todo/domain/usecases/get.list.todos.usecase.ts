import { Injectable, Inject } from '@nestjs/common';
import { IUsecase } from 'src/core/interfaces';
import { ITodo } from '../entities';
import { ITodoRepository } from '../repositories';

@Injectable()
export class GetListTodos implements IUsecase {
  constructor(@Inject('TodoRepository') private repository: ITodoRepository) {}

  async execute(field: string, operator: string, value: string): Promise<ITodo[]> {
    try {
      const todos = await this.repository.getListTodos(field, operator, value);
      return todos;
    } catch (error) {
      throw error;
    }
  }
}
