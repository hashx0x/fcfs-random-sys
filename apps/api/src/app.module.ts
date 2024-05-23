import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
