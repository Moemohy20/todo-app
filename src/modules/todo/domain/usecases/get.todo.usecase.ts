/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Todo } from '../schemas';
import { ITodoRepository } from '../repositories';

@Injectable()
export class GetTodo {
    constructor(private repository: ITodoRepository) {}

    async execute(id: string): Promise<Todo> {
        try {
            const existingTodo = await this.repository.getTodo(id);
            return existingTodo;
        } catch (error) {
            throw error;
        }
    }
}
