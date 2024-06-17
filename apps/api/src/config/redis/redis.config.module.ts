import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisConfig, validateRedisConfig } from './redis.config';
import { RedisConfigService } from './redis.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      // load: [RedisConfig],
      validate: validateRedisConfig,
    }),
  ],
  providers: [RedisConfigService],
  exports: [RedisConfigService],
})
export class RedisConfigModule {}
