/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Todo } from '../schemas';
import { ITodoRepository } from '../repositories';

@Injectable()
export class AddTodo {
    constructor(private repository: ITodoRepository) {}

    async execute(Todo: Todo): Promise<Todo> {
        try {
            const newTodo = await this.repository.add(Todo);
            return newTodo;
        } catch (error) {
            throw error;
        }
    }
}
