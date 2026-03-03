import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impletation.js";
import { CronService } from "./cron/cron-service.js";
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource.js';
import { EmailService } from "./email/email.service.js";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource.js";
import { PostgreLogDatasource } from "../infrastructure/datasources/postgre-log.datasource.js";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple.js";

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
); 
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDataSource()
); 
const postgresLogRepository = new LogRepositoryImpl(
  new PostgreLogDatasource()
);

export class Server {

  public static async start() {

    console.log('Server started...');
    
    // const emailService = new EmailService();
    // emailService.sendEmailWithFileSystemLogs('tobiasvega1210@gmail.com');

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://google.com';
        new CheckServiceMultiple(
          [fsLogRepository, mongoLogRepository, postgresLogRepository],
          () => console.log(`${url} is ok`),
          (error) => console.log(error),
        ).execute(url);
        // new CheckService().execute('http://localhost:3000');
      }
    );
  }
}