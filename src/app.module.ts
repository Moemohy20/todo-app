import { Module } from '@nestjs/common';
import { firebaseConfigs, FirebaseModule } from './core';
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
  providers: [],
})
export class AppModule {}
