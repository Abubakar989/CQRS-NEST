import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../../entities/todo';
import { BadRequestException } from '@nestjs/common';
import { GetTodoByIdQuery } from '../implementation/get-todo-by-id.query';

@QueryHandler(GetTodoByIdQuery)
export class GetTodoByIdHandler implements IQueryHandler<GetTodoByIdQuery> {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  async execute(query: GetTodoByIdQuery): Promise<Todo> {
    const queryObj = query.id;
    let { id }: any = queryObj;
    const todo = await this.todoRepo.findOneBy({ id: parseInt(id) });
    if (!todo) {
      throw new BadRequestException({
        message: `Todo not found with provided id `,
      });
    }
    return todo;
  }
}
