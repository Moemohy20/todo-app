import { Injectable, Inject } from '@nestjs/common';
import { IUsecase } from 'src/core/interfaces';
import { ITodo } from '../entities';
import { ITodoRepository } from '../repositories';

@Injectable()
export class AddTodo implements IUsecase {
  constructor(@Inject('TodoRepository') private repository: ITodoRepository) {}

  async execute(Todo: ITodo): Promise<ITodo> {
    try {
      const newTodo = await this.repository.addTodo(Todo);
      return newTodo;
    } catch (error) {
      throw error;
    }
  }
}
