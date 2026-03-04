import { MongoDatabase } from '../../../src/data/mongodb/init';
import { envs } from '../../../src/config/plugins/envs.plugin';
import mongoose from 'mongoose';
import { MongoLogDataSource } from '../../../src/infrastructure/datasources/mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { jest } from '@jest/globals';
import { LogModel } from '../../../src/data/mongodb';


describe('MongoLogDatasource', () => {


  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    })
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });
  
  afterAll(async () => {
    mongoose.connection.close();
  });
  
  const logDataSource = new MongoLogDataSource();
  const log = new LogEntity({
    message: 'Test log message',
    level: LogSeverityLevel.medium,
    origin: 'mongo-log.datasource.test.ts',
  })

  test('should create a log', async () => {
    
    const logSpy = jest.spyOn(console, 'log');

    await logDataSource.saveLogs(log);

    expect(logSpy).toHaveBeenCalledWith("Mongo Log created: ", expect.any(String) );
  });

  test('should get logs', async () => {

    await logDataSource.saveLogs(log);
    await logDataSource.saveLogs(log);

    const logs = await logDataSource.getLogs(LogSeverityLevel.medium);

    expect(logs.length).toBe(2);
    expect(logs[0].level).toBe(LogSeverityLevel.medium);
    });
});
