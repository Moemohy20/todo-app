import { Controller, Get, Put, Post, Delete, Query, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AddTodo, DeleteTodo, GetAllTodos, GetListTodos, GetTodo, UpdateTodo } from '../../domain';
import { AddTodoDto, TodoDTO, UpdateTodoDto } from '../dtos';
import { GetListTodosDto } from '../dtos/get.list.todos.dto';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(
    private addTodoUsecase: AddTodo,
    private deleteTodoUsecase: DeleteTodo,
    private getTodoUsecase: GetTodo,
    private getAllTodoUsecase: GetAllTodos,
    private updateTodoUsecase: UpdateTodo,
    private getListTodosUsecase: GetListTodos,
  ) {}

  @Post('addTodo')
  @ApiOperation({ summary: 'Add a todo.' })
  @ApiBody({
    type: AddTodoDto,
    required: true,
    isArray: false,
    description: 'todo properties to be added, id not required.',
  })
  async addTodo(@Body() dto: AddTodoDto): Promise<TodoDTO> {
    const todo = await this.addTodoUsecase.execute(TodoDTO.toEntity(dto));
    return TodoDTO.fromEntity(todo);
  }

  @Get('getTodo')
  @ApiOperation({ summary: 'Get a todo by id.' })
  @ApiQuery({
    name: 'id',
    type: String,
    required: true,
    allowEmptyValue: false,
    description: 'The todo id.',
  })
  async getTodo(@Query('id') id: string): Promise<TodoDTO> {
    const todo = await this.getTodoUsecase.execute(id);
    return TodoDTO.fromEntity(todo);
  }

  @Get('getTodos')
  @ApiOperation({ summary: 'Get all todos.' })
  async getAllTodo(): Promise<TodoDTO[]> {
    const todos = await this.getAllTodoUsecase.execute();
    return todos.map((todo) => TodoDTO.fromEntity(todo));
  }

  @Get('getListTodos')
  @ApiOperation({ summary: 'Get all todos of list.' })
  @ApiQuery({
    name: 'listId',
    type: String,
    required: true,
    allowEmptyValue: false,
    description: 'The id of list todo.',
  })
  async getListTodo(@Body() body: GetListTodosDto): Promise<TodoDTO[]> {
    const todos = await this.getListTodosUsecase.execute(body.field, body.operator, body.value);
    return todos.map((todo) => TodoDTO.fromEntity(todo));
  }

  @Put('updateTodo')
  @ApiOperation({ summary: 'Update an existing todo.' })
  @ApiBody({
    type: UpdateTodoDto,
    required: true,
    isArray: false,
    description: 'Todo properties to be updated.',
  })
  async updateTodo(@Body() dto: UpdateTodoDto): Promise<TodoDTO> {
    const updatedTodo = await this.updateTodoUsecase.execute(TodoDTO.toEntity(dto));
    return TodoDTO.fromEntity(updatedTodo);
  }

  @Delete('deleteTodo')
  @ApiOperation({ summary: 'Delete a todo by id.' })
  @ApiQuery({
    name: 'id',
    type: String,
    required: true,
    allowEmptyValue: false,
    description: 'The todo id.',
  })
  async deleteTodo(@Query('id') id: string): Promise<void> {
    return this.deleteTodoUsecase.execute(id);
  }
}
