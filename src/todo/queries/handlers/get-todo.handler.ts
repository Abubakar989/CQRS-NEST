import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../../entities/todo';
import { GetTodoQuery } from '../implementation/get-todo.query';

@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler<GetTodoQuery> {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  async execute(): Promise<Todo[]> {
    return await this.todoRepo.find();
  }
}
