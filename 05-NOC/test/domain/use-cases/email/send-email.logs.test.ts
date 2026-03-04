import { jest } from '@jest/globals';
import { SendEmailLogs } from '../../../../src/domain/use-cases/email/send-email-logs';
import { LogEntity } from '../../../../src/domain/entities/log.entity';

describe('SendEmailLogs', () => {

  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  }

  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockRepository as any,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  })


  test('should call sendEmail and saveLog', async () => {
    const result = await sendEmailLogs.execute('tobiasvega1210@gmail.com');

    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message: "Log email sent",
      origin: "send-email-logs.ts",
    })
  });

  test('should call log in case of error', async () => {

    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

    const result = await sendEmailLogs.execute('tobiasvega1210@gmail.com');

    expect(result).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message: "Error: Email log not sent",
      origin: "send-email-logs.ts",
    })
  });




})