import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impletation";
import { CronService } from "./cron/cron-service";
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";

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