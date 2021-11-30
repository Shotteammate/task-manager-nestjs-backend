import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoError_DUPLICATED_EMAIL_MSG } from 'src/common/constants/errorMessages';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    switch (exception.code) {
      case 11000:
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          errorCode: 11000,
          message: MongoError_DUPLICATED_EMAIL_MSG,
          email: request?.body?.email?.toLowerCase() ?? '',
          timestamp: new Date().toISOString(),
          path: request.url,
        });
    }
  }
}
