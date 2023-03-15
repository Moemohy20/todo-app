import { Injectable, Inject } from '@nestjs/common';
import { IUsecase } from 'src/core/interfaces';
import { ITodo } from '../entities';
import { ITodoRepository } from '../repositories';

@Injectable()
export class GetTodo implements IUsecase {
  constructor(@Inject('TodoRepository') private repository: ITodoRepository) {}

  async execute(id: string): Promise<ITodo> {
    try {
      const existingTodo = await this.repository.getTodo(id);
      return existingTodo;
    } catch (error) {
      throw error;
    }
  }
}
