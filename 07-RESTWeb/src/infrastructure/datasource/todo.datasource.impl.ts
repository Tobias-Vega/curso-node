import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain/index.js";
import { prisma } from "../../lib/prisma.js";


export class TodoDatasourceImpl implements TodoDatasource {

  create(createTodo: CreateTodoDto): Promise<TodoEntity> {
    
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    return todos.map(TodoEntity.fromObject);
  }

  findById(id: number): Promise<TodoEntity> {
    
  }

  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    
  }

  deleteById(id: number): Promise<TodoEntity> {
    
  }

}