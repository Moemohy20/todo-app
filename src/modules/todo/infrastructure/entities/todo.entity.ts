import { Status, Todo } from "../../domain/schemas";

export class TodoEntity implements Todo {
    constructor(
        public id?: string,
        public title?: string,
        public content?: string,
        public todoStatus?: Status,
        public listId?: string
    )
    {}

}
