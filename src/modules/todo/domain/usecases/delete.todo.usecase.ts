/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ITodoRepository } from '../repositories';

@Injectable()
export class DeleteTodo {
    constructor(private repository: ITodoRepository) {}

    async execute(id: string): Promise<void> {
        try {
            const myTodo = await this.repository.deleteTodo(id);
            return myTodo;
        } catch (error) {
            throw error;
        }
    }
}
