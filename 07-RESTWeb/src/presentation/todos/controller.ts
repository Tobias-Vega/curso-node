import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

const todos = [
  { id: 1, text: 'Buy milk', completedAt: new Date() },
  { id: 2, text: 'Buy bread', completedAt: null },
  { id: 3, text: 'Buy butter', completedAt: new Date() },
];

export class TodosController {

  //* DI
  constructor() { }

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  }

  public getTodoById = (req: Request, res: Response) => {

    const id = +req.params.id!;

    if (!id || isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = todos.find(todo => todo.id === id);

    (todo)
      ? res.json(todo)
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

  public updateTodo = (req: Request, res: Response) => {

    const id = +req.params.id!;
    const { text, completedAt } = req.body;

    if (!id || isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = todos.find(todo => todo.id === id);
    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

    todo.text = text || todo.text;
    (completedAt === 'null')
      ? todo.completedAt = null
      : todo.completedAt = new Date(completedAt || todo.completedAt);

    res.status(200).json(todo);

  }

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id!;

    if (!id || isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = todos.find(todo => todo.id === id);
    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

    todos.splice(todos.indexOf(todo), 1);
    res.status(204).send();
  }
}