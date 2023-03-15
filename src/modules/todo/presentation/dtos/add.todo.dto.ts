import { OmitType } from '@nestjs/swagger';
import { TodoDTO } from './todo.dto';

export class AddTodoDto extends OmitType(TodoDTO, ['id']) {}
