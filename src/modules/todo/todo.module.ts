import { Module } from '@nestjs/common';
import { FirestoreService } from 'src/core/providers';
import { AddTodo, DeleteTodo, GetAllTodos, GetTodo, ITodoRepository, UpdateTodo } from './domain';
import { FirebaseTodoService, ITodoService, TodoRepository } from './infrastructure';
import { TodoController } from './presentation';

@Module({
    imports: [],
    controllers: [TodoController],
    providers: [
        {
            inject: [FirestoreService],
            provide: FirebaseTodoService,
            useFactory: (databaseProvider: FirestoreService) => new FirebaseTodoService(databaseProvider),
        },
        {
            inject: [FirebaseTodoService],
            provide: TodoRepository,
            useFactory: (service: ITodoService) => new TodoRepository(service),
        },
        {
            inject: [TodoRepository],
            provide: AddTodo,
            useFactory: (repository: ITodoRepository) => new AddTodo(repository),
        },
        {
            inject: [TodoRepository],
            provide: GetTodo,
            useFactory: (repository: ITodoRepository) => new GetTodo(repository),
        },
        {
            inject: [TodoRepository],
            provide: GetAllTodos,
            useFactory: (repository: ITodoRepository) => new GetAllTodos(repository),
        },
        {
            inject: [TodoRepository],
            provide: UpdateTodo,
            useFactory: (repository: ITodoRepository) => new UpdateTodo(repository),
        },
        {
            inject: [TodoRepository],
            provide: DeleteTodo,
            useFactory: (repository: ITodoRepository) => new DeleteTodo(repository),
        }
    ]
})

export class TodoModule {}
