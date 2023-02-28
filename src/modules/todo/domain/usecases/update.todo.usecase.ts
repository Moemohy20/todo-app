/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ITodoRepository } from '../repositories';
import { Todo } from '../schemas';

@Injectable()
export class UpdateTodo {
    constructor(private repository: ITodoRepository) {}

    async execute(todo: Todo): Promise<Todo> {
        try {
            const newTodo = await this.repository.updateTodo(todo);
            return newTodo;
        } catch (error) {
            throw error;
        }
    }
}