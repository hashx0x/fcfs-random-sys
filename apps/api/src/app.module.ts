import { Module } from '@nestjs/common';
import { FcfsEventModule } from './fcfs-event/fcfs-event.module';
import { ConfigModule } from '@nestjs/config';
import { validateAppConfig } from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateAppConfig,
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   username: 'kodi',
    //   password: 'kodipostgre',
    //   database: 'kodi-local-postgre',
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    // }),

    FcfsEventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
