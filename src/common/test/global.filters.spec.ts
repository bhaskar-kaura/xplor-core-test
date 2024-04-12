import { ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { GlobalExceptionFilter } from '../filters/global-exception.filter';

describe('GlobalExceptionFilter', () => {
  let filter: GlobalExceptionFilter;
  let mockHost: ArgumentsHost;
  let mockResponse: Response;

  beforeEach(() => {
    filter = new GlobalExceptionFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => ({}),
      }),
    } as any;
  });

  it('should handle AxiosError', () => {
    const axiosError = new Error('Axios request failed') as any;
    axiosError.isAxiosError = true;
    axiosError.response = {
      status: 404,
      data: {
        message: 'Resource not found',
      },
    };
    filter.catch(axiosError, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });

  it('should handle HttpException', () => {
    const httpException = new HttpException('Forbidden', 403);
    filter.catch(httpException, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
  });

  it('should handle unknown exceptions', () => {
    const unknownException = new Error('Internal server error');
    filter.catch(unknownException, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});
