import express from 'express';
import { envs } from './config/envs.js';
import { GitHubController } from './presentation/github/controller.js';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware.js';


(() => {

  main();

})()

function main() {

  const app = express();

  app.use(express.json());

  const controller = new GitHubController();

  app.use(GithubSha256Middleware.verifyGithubSignature);

  app.post('/api/github', controller.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`App running on port ${envs.PORT}`);
  })
}