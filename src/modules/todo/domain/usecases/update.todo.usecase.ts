/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ITodoRepository } from '../repositories';

@Injectable()
export class UpdateTodo {
    constructor(private repository: ITodoRepository) {}

    async execute(id: number): Promise<void> {
        try {
            await this.repository.update(id);
        } catch (error) {
            throw error;
        }
    }
}