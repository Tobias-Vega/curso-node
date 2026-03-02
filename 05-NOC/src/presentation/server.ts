import { CronJob } from "cron";

export class Server {

  public static start() {

    console.log('Server started...');

    var job = new CronJob(
      '*/2 * * * * *',
      () => {
        const date = new Date();
        console.log('2 second', date);
      }
    );

    job.start();

  }

}