import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { ServerApp } from './server-app';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
describe('Server App', () => {

  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileDestination: 'test-destination',
    fileName: 'test-filename',
  }

  test('should create ServerApp instance', () => {

    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');

  });

  test('should run ServerApp with options', () => {

    const logSpy = jest.spyOn(console, 'log');
    const createdTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith(`Server running...`);
    expect(logSpy).toHaveBeenLastCalledWith(`File created`);

    expect(createdTableSpy).toHaveBeenCalledTimes(1);
    expect(createdTableSpy).toHaveBeenCalledWith({
      base: options.base, limit: options.limit
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });

  });

});