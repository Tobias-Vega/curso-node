import { LogDatasource } from "../../domain/datasources/log.datasource.js";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity.js";
import { LogRepository } from "../../domain/repository/log.repository.js";


export class LogRepositoryImpl implements LogRepository {

  constructor(
    private logDataSource: LogDatasource
  ) {}

  async saveLog(log: LogEntity): Promise<void> {
    await this.logDataSource.saveLogs(log);
  }

  async getLogs(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return await this.logDataSource.getLogs(serverityLevel);
  }
}