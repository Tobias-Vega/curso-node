import { Request, Response } from "express";

export class GitHubController {

  constructor() {}

  webhookHandler = (req: Request, res: Response) => {


    const githubEvent = req.header('x-github-event') ?? 'unknwon';
    const signature = req.header('x-hub-signature-256') ?? 'unknwon';
    const payload = req.body;

    console.log({ githubEvent });

    res.status(202).send('Accepted');

  }

}