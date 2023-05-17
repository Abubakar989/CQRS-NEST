import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../../entities/todo';
import { SaveTodoCommand } from '../implementation/save-todo.handler';

@CommandHandler(SaveTodoCommand)
export class SaveTodoHandler implements ICommandHandler<SaveTodoCommand> {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  async execute(command: SaveTodoCommand) {
    let todo = new Todo();
    todo.title = command.title;
    todo.description = command.description;
    return await this.todoRepo.save(todo);
  }
}
