import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateDatabaseConfig } from './database.config';
import { DatabaseConfigService } from './database.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateDatabaseConfig,
    }),
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseConfigModule {}
