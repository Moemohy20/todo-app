import { Module } from '@nestjs/common';

import { FirestoreService } from 'src/core/providers';
import { AddTodo, ITodoRepository } from './domain';
import { FirebaseTodoService, ITodoService, TodoRepository } from './infrastructure';

@Module({
    imports: [],
    // controllers: [OrganizationController],
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
            inject: [ TodoRepository],
            provide: AddTodo,
            useFactory: (repository: ITodoRepository) => new AddTodo(repository),
        }

    ]
})

export class TodoModule {}
