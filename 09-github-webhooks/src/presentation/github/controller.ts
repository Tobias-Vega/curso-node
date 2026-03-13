import { Request, Response } from "express";

export class GitHubController {

  constructor() {}

  webhookHandler = (req: Request, res: Response) => {

    console.log('Endpoint llamado');

    res.json('Hecho');

  }

}