import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import { TodoRepository } from "../../domain/index.js";

export class TodosController {

  //* DI
  constructor(
    private readonly todoRepository: TodoRepository,
  ) { }

  public getTodos = async (_req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();

    res.status(200).json(todos);
  }

  public getTodoById = async (req: Request, res: Response) => {

    const id = +req.params.id!;

    try {

      const todo = await this.todoRepository.findById(id);
      res.status(200).json(todo);

    } catch (error) {
      res.status(400).json({error});
    }
  }

  public createTodo = async (req: Request, res: Response) => {

    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const todo = await this.todoRepository.create(createTodoDto!);

    res.status(201).json(todo);
  }

  public updateTodo = async (req: Request, res: Response) => {

    const id = +req.params.id!;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body, id
    });

    if (error) return res.status(400).json(error);

    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);

    return res.status(200).json(updatedTodo);

  }

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id!;

    const deletedTodo = await this.todoRepository.deleteById(id);
    res.status(200).json(deletedTodo);
  }
}