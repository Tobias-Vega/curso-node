import { CheckService } from "../domain/use-cases/checks/check-service.js";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impletation.js";
import { CronService } from "./cron/cron-service.js";
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource.js';
import { EmailService } from "./email/email.service.js";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs.js";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource.js";
import { LogSeverityLevel } from "../domain/entities/log.entity.js";

const logRepository = new LogRepositoryImpl(
  // new FileSystemDatasource()
  new MongoLogDataSource()
); 
const emailService = new EmailService()

export class Server {

  public static async start() {

    console.log('Server started...');

    new SendEmailLogs(
      emailService,
      logRepository,

    ).execute(
      'tobiasvega1210@gmail.com'
    )

    const logs = await logRepository.getLogs(LogSeverityLevel.medium);
    console.log(logs);
    

    // const emailService = new EmailService();
    // emailService.sendEmailWithFileSystemLogs('tobiasvega1210@gmail.com');

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'https://googfdfsdle.com';
    //     new CheckService(
    //       logRepository,
    //       () => console.log(`${url} is ok`),
    //       (error) => console.log(error),
    //     ).execute(url);
    //     // new CheckService().execute('http://localhost:3000');
    //   }
    // );
  }
}