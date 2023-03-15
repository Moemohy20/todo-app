import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export enum QueryOperator {
  LESS_THAN = '<',
  LESS_THAN_OR_EQUAL = '<=',
  EQUAL = '==',
  NOT_EQUAL = '!=',
  GREATER_THAN_OR_EQUAL = '>=',
  GREATER_THAN = '>',
  ARRAY_CONTAINS = 'array-contains',
  IN = 'in',
  ARRAY_CONTAINS_ANY = 'array-contains-any',
  NOT_IN = 'not-in',
}

export class GetListTodosDto {
  @Expose()
  @ApiProperty({
    name: 'field',
    type: String,
    required: true,
    description: 'The todo listId',
    example: 'listId',
  })
  @IsNotEmpty()
  field: string;

  @Expose()
  @ApiProperty({
    name: 'operator',
    type: String,
    required: true,
    enum: Object.values(QueryOperator),
    description: 'The operator is used to filter out todos that meet the constraints',
    example: '==',
  })
  @IsEnum(QueryOperator)
  @IsNotEmpty()
  operator: string;

  @Expose()
  @ApiProperty({
    name: 'value',
    type: String,
    required: true,
    description: 'The value of the todo list id',
    example: 'fadgfwedasda',
  })
  @IsNotEmpty()
  value: string;
}
