/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ITodoRepository } from '../repositories';

@Injectable()
export class DeleteTodo {
    constructor(private repository: ITodoRepository) {}

    async execute(id: number): Promise<boolean> {
        try {
            const myTodo = await this.repository.delete(id);
            return myTodo;
        } catch (error) {
            throw error;
        }
    }
}
