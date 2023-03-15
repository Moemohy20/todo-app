import { IsEnum, IsNotEmpty } from 'class-validator';
import { Expose, plainToClass } from 'class-transformer';
import { Status } from '../../domain';
import { Todo } from '../../infrastructure';
import { ApiProperty } from '@nestjs/swagger';

export class TodoDTO {
  @Expose()
  @ApiProperty({
    name: 'id',
    type: String,
    required: true,
    description: 'The id of the todo',
    example: 'jo0NlW8b0otULgk2ERVO',
  })
  @IsNotEmpty()
  id: string;

  @Expose()
  @ApiProperty({
    name: 'title',
    type: String,
    required: true,
    description: 'The title of todo',
    example: 'buy food',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'content',
    type: String,
    required: true,
    description: 'The content of the todo',
    example: 'add some descriptions',
  })
  @Expose()
  content: string;

  @Expose()
  @ApiProperty({
    name: 'todoStatus',
    type: Status,
    required: true,
    enum: Object.values(Status),
    description: 'Todo current status',
    example: 'Complete',
  })
  @IsEnum(Status)
  @IsNotEmpty()
  todoStatus: Status;

  @Expose()
  @ApiProperty({
    name: 'listId',
    type: String,
    required: true,
    description: 'The id of the list that todo belong to',
    example: 'jo0NlW8b0otULgk2ERVO',
  })
  @IsNotEmpty()
  listId: string;

  static toEntity(dto: any): Todo {
    return plainToClass(Todo, dto);
  }

  static fromEntity(todo: Todo): TodoDTO {
    return plainToClass(TodoDTO, todo);
  }
}
