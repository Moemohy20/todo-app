import { Injectable, Inject } from '@nestjs/common';
import { IUsecase } from 'src/core/interfaces';
import { ITodo } from '../entities';
import { ITodoRepository } from '../repositories';

@Injectable()
export class UpdateTodo implements IUsecase {
  constructor(@Inject('TodoRepository') private repository: ITodoRepository) {}

  async execute(todo: ITodo): Promise<ITodo> {
    try {
      const newTodo = await this.repository.updateTodo(todo);
      return newTodo;
    } catch (error) {
      throw error;
    }
  }
}
