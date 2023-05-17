import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../../entities/todo';
import { UpdateTodoCommand } from '../implementation/update-todo.handler';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  async execute(command: UpdateTodoCommand) {
    const { id, title, description, completed } = command;
    const todo = await this.todoRepo.findOneBy({ id: parseInt(id) });

    if (!todo) {
      throw new BadRequestException({
        message: `Todo with id ${id} not found`,
      });
    }
    todo.title = title;
    todo.description = description;
    todo.completed = completed;
    await this.todoRepo.update(id, todo);
  }
}
