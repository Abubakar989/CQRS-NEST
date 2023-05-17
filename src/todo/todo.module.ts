import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { Todo } from '../entities/todo';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoService } from './todo.services';
import { SaveTodoHandler, UpdateTodoHandler } from './commands/handler';
import {
  DeleteTodoHandler,
  GetTodoByIdHandler,
  GetTodoHandler,
} from './queries/handlers';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), CqrsModule],

  controllers: [TodoController],
  providers: [
    GetTodoHandler,
    SaveTodoHandler,
    UpdateTodoHandler,
    GetTodoByIdHandler,
    DeleteTodoHandler,
    TodoService,
  ],
})
export class TodoModule {}
