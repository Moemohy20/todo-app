import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { FirebaseError } from 'firebase/app';

@Catch(FirebaseError)
export class FirebaseExceptionFilter implements ExceptionFilter<FirebaseError> {
  constructor(private readonly logger: Logger) {}

  catch(exception: FirebaseError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.code;
    const message = exception.message;

    this.logger.debug(
      `method=${request.method} status=${status} message=${message}`,
      `End Request for ${request.url}`,
    );

    console.log(response.json());
  }
}
