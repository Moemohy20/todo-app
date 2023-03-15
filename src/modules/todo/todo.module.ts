import { Module } from '@nestjs/common';
import { AddTodo, DeleteTodo, GetAllTodos, GetListTodos, GetTodo, UpdateTodo } from './domain';
import { FirebaseTodoService, TodoRepository } from './infrastructure';
import { TodoController } from './presentation';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [
    {
      provide: 'TodoService',
      useClass: FirebaseTodoService,
    },
    {
      provide: 'TodoRepository',
      useClass: TodoRepository,
    },

    AddTodo,
    GetTodo,
    GetAllTodos,
    UpdateTodo,
    DeleteTodo,
    GetListTodos,
  ],
})
export class TodoModule {}
