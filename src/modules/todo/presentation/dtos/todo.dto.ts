import { IsEnum, IsNotEmpty } from 'class-validator';
import { Expose, plainToClass } from 'class-transformer';
import { Status, Todo } from '../../domain';
import { TodoEntity } from '../../infrastructure';

export class TodoDTO {
  @Expose()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsNotEmpty()
  industry: string;

  @Expose()
  content: string;

  @Expose()
  @IsEnum(Status)
  @IsNotEmpty()
  todoStatus: Status;

  @Expose()
  @IsNotEmpty()
  listId: string;

  static toEntity(dto: any): Todo {
    return plainToClass(TodoEntity, dto);
  }

  static fromEntity(todo: TodoEntity): TodoDTO {
    return plainToClass(TodoDTO, todo);
  }
}
