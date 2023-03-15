import { Injectable, Inject } from '@nestjs/common';
import { IUsecase } from 'src/core/interfaces';
import { ITodoRepository } from '../repositories';

@Injectable()
export class DeleteTodo implements IUsecase {
  constructor(@Inject('TodoRepository') private repository: ITodoRepository) {}

  async execute(id: string): Promise<void> {
    try {
      const myTodo = await this.repository.deleteTodo(id);
      return myTodo;
    } catch (error) {
      throw error;
    }
  }
}
