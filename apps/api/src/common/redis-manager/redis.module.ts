import { Module } from '@nestjs/common';
import { RedisManager } from './redis.manager';
import * as Redis from 'ioredis';
import { RedisConfigModule } from 'src/config/redis/redis.config.module';

@Module({
  imports: [RedisConfigModule],
  providers: [RedisManager],
  exports: [RedisManager],
})
export class RedisModule {
  // static forRoot(options: { host: string; port: number }) {
  //   const redisClient = new Redis.Cluster([options]);
  //   return {
  //     module: RedisModule,
  //     providers: [
  //       {
  //         provide: RedisManager,
  //         useValue: redisClient,
  //       },
  //     ],
  //     exports: [RedisManager],
  //   };
  // }
  // static forRootAsync(options: { host: string; port: number }) {
  //   const redisClient = new Redis.Cluster([options]);
  //   return {
  //     module: RedisModule,
  //     providers: [
  //       {
  //         provide: RedisManager,
  //         useValue: redisClient,
  //       },
  //     ],
  //     exports: [RedisManager],
  //   };
  // }
}
