import express from 'express';
import { envs } from './config/envs.js';
import { GitHubController } from './presentation/github/controller.js';


(() => {

  main();

})()

function main() {

  const app = express();

  const controller = new GitHubController();

  app.post('/api/github', controller.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`App running on port ${envs.PORT}`);
  })
}