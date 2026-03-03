import { LogEntity, LogSeverityLevel } from "../entities/log.entity.js";

export abstract class LogDatasource {
  abstract saveLogs(log: LogEntity): Promise<void>;
  abstract getLogs(serverityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}