import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

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

    const { text } = req.body;

    if (!text) return res.status(400).json({ error: 'Text property is required' });

    const todo = await prisma.todo.create({
      data: { text }
    });

    res.status(201).json(todo);
  }

  public updateTodo = async (req: Request, res: Response) => {

    const id = +req.params.id!;
    const { text, completedAt } = req.body;

    if (!id || isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = await prisma.todo.findUnique({
      where: { id }
    });

    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        text,
        completedAt: (completedAt) ? new Date(completedAt) : null,
      }
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