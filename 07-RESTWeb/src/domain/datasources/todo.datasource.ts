import { CreateTodoDto } from "../dtos/index.js";
import { TodoEntity } from "../entities/todo.entity.js";
import { UpdateTodoDto } from '../dtos/todos/update-todo.dto.js';

export abstract class TodoDatasource {

  abstract create(createTodo: CreateTodoDto): Promise<TodoEntity>;
  //todo paginación
  abstract getAll(): Promise<TodoEntity[]>;

  abstract findById(id: number): Promise<TodoEntity>;
  abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
  abstract deleteById(id: number): Promise<TodoEntity>;
}