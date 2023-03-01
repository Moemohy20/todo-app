import { ITodoRepository, Todo } from "../../domain";
import { ITodoService } from "../services/todo.service.interface";

export class TodoRepository implements ITodoRepository {
    constructor(private service: ITodoService) {}

    addTodo(todo: Todo): Promise<Todo> {
        return this.service.add(todo);
    }

    getTodo(id: string): Promise<Todo> {
        return this.service.get(id);
    }

    getTodos(): Promise<Todo[]> {
        return this.service.getAll();
    }

    updateTodo(todo: Todo): Promise<Todo> {
        return this.service.update(todo);
    }

    deleteTodo(id: string): Promise<void> {
        return this.service.delete(id);
    }
}
