import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impletation";
import { CronService } from "./cron/cron-service";
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource()); 
const emailService = new EmailService()

export class Server {

  public static start() {

    console.log('Server started...');

    new SendEmailLogs(
      emailService,
      fileSystemLogRepository,

    ).execute(
      'tobiasvega1210@gmail.com'
    )

    // const emailService = new EmailService();
    // emailService.sendEmailWithFileSystemLogs('tobiasvega1210@gmail.com');

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://google.com';
        new CheckService(
          fileSystemLogRepository,
          () => console.log(`${url} is ok`),
          (error) => console.log(error),
        ).execute(url);
        // new CheckService().execute('http://localhost:3000');
      }
    );
  }
}