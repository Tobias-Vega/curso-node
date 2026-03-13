import { GitHubStarPayload } from "../../interfaces/github-start-interface.js";


export class GitHubService {

  constructor() { }

  onStar(payload: GitHubStarPayload): string {

    let message: string = '';

    const { action, sender, repository } = payload;

    message = `User ${sender.login} ${action} star on ${repository.full_name}`;

    return message;
  }


}