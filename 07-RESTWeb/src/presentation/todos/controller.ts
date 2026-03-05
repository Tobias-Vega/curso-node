import { Request, Response } from "express";

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

  public createTodo = (req: Request, res: Response) => {

    const { text } = req.body;

    if (!text) return res.status(400).json({ error: 'Text property is required' });

    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: null,
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
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
}