import { LogDatasource } from "../../domain/datasources/log.datasource.js";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity.js";
import { SeverityLevel } from "../../generated/prisma/enums.js";
import { prisma } from "../../lib/prisma.js";

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
}

export class PostgreLogDatasource implements LogDatasource {

  async saveLogs(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];

    await prisma.logModel.create({
      data: {
        ...log,
        level
      }
    });
  }

  async getLogs(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    const level = severityEnum[serverityLevel];

    const dblogs = await prisma.logModel.findMany({
      where: { level }
    });
    
    return dblogs.map(LogEntity.fromObject);
  }

}