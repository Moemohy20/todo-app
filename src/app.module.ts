import { Logger, Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import {
  firebaseConfigs,
  FirebaseModule,
  HttpExceptionFilter,
  LoggingInterceptor,
  ResponseInterceptor,
} from './core';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [
    FirebaseModule.forRoot({
      appName: firebaseConfigs.appName,
      apiKey: firebaseConfigs.apiKey,
      authDomain: firebaseConfigs.authDomain,
      projectId: firebaseConfigs.projectId,
      storageBucket: firebaseConfigs.storageBucket,
    }),
    TodoModule,
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
