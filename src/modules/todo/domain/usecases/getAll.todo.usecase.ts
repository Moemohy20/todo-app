/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Todo } from '../schemas';
import { ITodoRepository } from '../repositories';

@Injectable()
export class GetAllTodos {
    constructor(private repository: ITodoRepository) {}

    async execute(): Promise<Todo[]> {
        try {
            const allTodos = await this.repository.getAll();
            return allTodos;
        } catch (error) {
            throw error;
        }
    }
}