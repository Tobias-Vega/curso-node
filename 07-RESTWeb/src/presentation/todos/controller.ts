import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";

export class TodosController {

  //* DI
  constructor() { }

  public getTodos = async (_req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();

    res.status(200).json(todos);
  }

  public getTodoById = async (req: Request, res: Response) => {

    const id = +req.params.id!;

    if (!id || isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = await prisma.todo.findUnique({
      where: { id }
    });

    (todo)
      ? res.status(200).json(todo)
      : res.status(404).json({ error: `TODO with id ${id} not found` });
  }

  public createTodo = async (req: Request, res: Response) => {

    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({error});

    const todo = await prisma.todo.create({
      data: createTodoDto!
    });

    res.status(201).json(todo);
  }

  public updateTodo = async (req: Request, res: Response) => {

    const id = +req.params.id!;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body, id
    });

    if (error) return res.status(400).json(error);

    const todo = await prisma.todo.findUnique({
      where: { id }
    });

    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values
    });

    res.status(200).json(updatedTodo);

  }

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id!;

    if (!id || isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = await prisma.todo.findUnique({
      where: { id }
    });
    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

    await prisma.todo.delete({
      where: { id }
    });
    res.status(204).send();
  }
}