import { Injectable } from '@nestjs/common';
import { SaveTodoDto } from './dtos/save-todo.dto';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { SaveTodoCommand, UpdateTodoCommand } from './commands/implementation';
import {
  DeleteTodoQuery,
  GetTodoByIdQuery,
  GetTodoQuery,
} from './queries/implementation';

@Injectable()
export class TodoService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async saveTodo({ title, description }: SaveTodoDto) {
    return this.commandBus.execute(new SaveTodoCommand(title, description));
  }

  async findTodoById(id: string) {
    return this.queryBus.execute(new GetTodoByIdQuery(id));
  }

  async getAll() {
    return this.queryBus.execute(new GetTodoQuery());
  }

  async updateTodo(updateTodoInput: UpdateTodoDto) {
    const { id, title, description, completed } = updateTodoInput;
    return this.commandBus.execute(
      new UpdateTodoCommand(id, title, description, completed),
    );
  }

  async deleteTodo(id: string) {
    return this.queryBus.execute(new DeleteTodoQuery(id));
  }
}
