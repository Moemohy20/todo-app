import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Logger Interceptor.
 * Creates informative logs for all requests, showing the path,
 * the method name, user id, called handler, and time taken to execute the request.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    // Before the route handler
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const userAgent = request.get('user-agent') || 'none';
    const { ip, method, path } = request;

    this.logger.log(
      `method=${method} userAgent=${userAgent} ip=${ip}: handler=${context.getClass().name}.${
        context.getHandler().name
      }`,
      `Incoming Request on ${path}`,
    );

    // After the route handler
    return next.handle().pipe(
      tap(() => {
        const response = httpContext.getResponse();
        const statusCode = response.statusCode;

        this.logger.log(
          `method=${method} statusCode=${statusCode} duration +${Date.now() - now}ms`,
          `End Request for ${path}`,
        );
      }),
    );
  }
}
