import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
/**
 * @HttpError Filter.
 * Gets an HttpException in code and creates an error response
 */
@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.debug(
      `method=${request.method} status=${status} trace=${exception?.stack}`,
      `End Request for ${request.url}`,
    );

    response.status(status).json({
      statusCode: status,
      message: exception?.message,
      cause: exception?.cause?.message,
      method: request.method,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
