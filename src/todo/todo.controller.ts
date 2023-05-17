import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SaveTodoDto } from './dtos/save-todo.dto';
import { TodoService } from './todo.services';
import { UpdateTodoDto } from './dtos/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @HttpCode(201)
  async saveTodo(@Body() saveTodoInput: SaveTodoDto) {
    return await this.todoService.saveTodo(saveTodoInput);
  }

  @Get()
  @HttpCode(200)
  async getAll() {
    return await this.todoService.getAll();
  }

  @Patch()
  @HttpCode(200)
  async updateTodo(@Body() updateTodoInput: UpdateTodoDto) {
    return await this.todoService.updateTodo(updateTodoInput);
  }

  @Get(':id')
  @HttpCode(200)
  async findTodoById(@Param() id: string) {
    return await this.todoService.findTodoById(id);
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteTodo(@Param() id: string) {
    return await this.todoService.deleteTodo(id);
  }
}
