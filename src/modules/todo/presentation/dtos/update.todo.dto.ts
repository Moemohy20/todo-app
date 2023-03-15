import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { AddTodoDto } from './add.todo.dto';
import { TodoDTO } from './todo.dto';

export class UpdateTodoDto extends IntersectionType(PickType(TodoDTO, ['id']), PartialType(AddTodoDto)) {}
