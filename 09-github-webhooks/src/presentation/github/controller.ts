import { Request, Response } from "express";

export class GitHubController {

  constructor() {}

  webhookHandler = (req: Request, res: Response) => {


    const githubEvent = req.header('x-github-event') ?? 'unknwon';
    const payload = req.body;

    res.status(202).send('Accepted');

  }

}