import { DynamicModule, Module, OnApplicationShutdown, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { deleteApp, getApps, initializeApp } from 'firebase/app';

import { FirebaseConfig } from 'src/core/configs';
import { FIREBASE_APP, FIREBASE_CONFIG } from './firebase.constants';
import { FirestoreService, StorageService } from './services';

export const createApp = async (config: FirebaseConfig) => {
  return initializeApp(config, config.appName);
};

@Module({})
export class FirebaseModule implements OnApplicationShutdown {
  async onApplicationShutdown() {
    for (const app of getApps()) {
      const name = app.name;
      deleteApp(app)
        .then(function () {
          console.log('App ' + name + ' deleted successfully');
        })
        .catch(function (error) {
          console.log('Error deleting app ' + name + ':', error);
        });
    }
  }

  static forRoot(config: FirebaseConfig): DynamicModule {
    return {
      module: FirebaseModule,
      global: true,
      providers: [
        // AuthService,
        FirestoreService,
        StorageService,
        {
          provide: FIREBASE_CONFIG,
          useValue: config,
        },
        {
          provide: FIREBASE_APP,
          inject: [FIREBASE_CONFIG],
          useFactory: async (config: FirebaseConfig) => createApp(config),
        },
      ],
      exports: [/**AuthService */ FirestoreService, StorageService],
    };
  }

  static forRootAsync(configProvider: Provider<FirebaseConfig>): DynamicModule {
    return {
      module: FirebaseModule,
      global: true,
      imports: [ConfigModule],

      providers: [
        // AuthService,
        FirestoreService,
        StorageService,
        {
          provide: FIREBASE_CONFIG,
          ...configProvider,
        } as Provider<FirebaseConfig>,

        {
          provide: FIREBASE_APP,
          inject: [FIREBASE_CONFIG],
          useFactory: async (config: FirebaseConfig) => createApp(config),
        },
      ],

      exports: [/**AuthService */ FirestoreService, StorageService],
    };
  }
}
