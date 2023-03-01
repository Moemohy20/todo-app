import { Controller, Get, Put, Post, Delete, Query, Body } from '@nestjs/common';

import { AddTodo, DeleteTodo, GetAllTodos, GetTodo, UpdateTodo } from '../../domain';
import { TodoDTO } from '../dtos/todo.dto';

export class TodoController {
    constructor(
        private addTodoUsecase: AddTodo,
        private deleteTodoUsecase: DeleteTodo,
        private getTodoUsecase: GetTodo,
        private getAllTodoUsecase: GetAllTodos,
        private updateTodoUsecase: UpdateTodo
    ) {}

    @Post()
    async addTodo(@Body() dto: TodoDTO): Promise<TodoDTO> {
        const todo = await this.addTodoUsecase.execute(dto)
        return TodoDTO.fromEntity(todo);
    }

    @Delete()
    async deleteTodo(@Query('id') id: string): Promise<void> {
        return this.deleteTodoUsecase.execute(id)
    }

    @Get()
    async getTodo(@Query('id') id: string): Promise<TodoDTO> {
        const todo = await this.getTodoUsecase.execute(id);
        return TodoDTO.fromEntity(todo);
    }

    @Get()
    async getAllTodo(): Promise<TodoDTO[]> {
        const todos = await this.getAllTodoUsecase.execute();
        return todos.map(todo => TodoDTO.fromEntity(todo));
    }

    @Put()
    async updateTodo(@Body() dto: TodoDTO): Promise<TodoDTO> {
        const todo = TodoDTO.toEntity(dto);
        const updatedTodo = await this.updateTodoUsecase.execute(todo);
        return TodoDTO.fromEntity(updatedTodo);
    }

}