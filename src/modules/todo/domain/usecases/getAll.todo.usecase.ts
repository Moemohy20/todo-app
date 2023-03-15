import { Injectable, Inject } from '@nestjs/common';
import { IUsecase } from 'src/core/interfaces';
import { ITodo } from '../entities';
import { ITodoRepository } from '../repositories';

@Injectable()
export class GetAllTodos implements IUsecase {
  constructor(@Inject('TodoRepository') private repository: ITodoRepository) {}

  async execute(): Promise<ITodo[]> {
    try {
      const allTodos = await this.repository.getTodos();
      return allTodos;
    } catch (error) {
      throw error;
    }
  }
}
