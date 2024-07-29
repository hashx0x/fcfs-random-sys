import { Module } from '@nestjs/common';
import { RedisManager } from './redis.manager';
import * as Redis from 'ioredis';
import { RedisConfigModule } from 'src/config/redis/redis.config.module';
import { REDIS_CLIENT, REDIS_MANAGER } from './redis.symbol';
import { RedisConfigService } from 'src/config/redis/redis.config.service';

@Module({
  imports: [RedisConfigModule],
  providers: [
    {
      inject: [RedisConfigService],
      provide: REDIS_CLIENT,
      useFactory: (configService: RedisConfigService) => {
        return new Redis.Cluster([
          {
            host: configService.host,
            port: configService.port,
          },
        ]);
      },
    },
    {
      provide: REDIS_MANAGER,
      useClass: RedisManager,
    },
  ],
  exports: [REDIS_CLIENT, REDIS_MANAGER],
})
export class RedisModule {}
