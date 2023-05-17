import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../../entities/todo';
import { BadRequestException } from '@nestjs/common';
import { DeleteTodoQuery } from '../implementation';

@QueryHandler(DeleteTodoQuery)
export class DeleteTodoHandler implements IQueryHandler<DeleteTodoQuery> {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  async execute(query: DeleteTodoQuery) {
    const queryObj = query.id;
    let { id }: any = queryObj;
    const todo = await this.todoRepo.findOneBy({ id: parseInt(id) });
    if (!todo) {
      throw new BadRequestException({
        message: `Todo not found with provided id `,
      });
    }
    await this.todoRepo.remove(todo);
    return { success: true };
  }
}
