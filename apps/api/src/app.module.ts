import { Module } from '@nestjs/common';
import { FcfsEventModule } from './fcfs-event/fcfs-event.module';
import { ConfigModule } from '@nestjs/config';
import { validateAppConfig } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateAppConfig,
      isGlobal: true,
    }),
    FcfsEventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
