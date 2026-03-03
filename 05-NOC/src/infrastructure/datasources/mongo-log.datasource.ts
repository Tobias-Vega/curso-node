import { LogModel } from "../../data/mongodb";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDataSource implements LogDatasource {

  async saveLogs(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    await newLog.save();
    console.log('Mongo Log created: ', newLog.id);
  }

  async getLogs(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({
      level: serverityLevel
    });

    return logs.map(LogEntity.fromObject);
  }
}