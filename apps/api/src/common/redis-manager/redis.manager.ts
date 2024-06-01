import Redis, { Cluster } from 'ioredis';
import { Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { RedisConfigService } from 'src/config/redis/redis.config.service';

@Injectable()
export class RedisManager implements OnModuleInit {
  private redisClient: Cluster = new Redis.Cluster([]);

  constructor(private redisConfigService: RedisConfigService) {
    // this.redisClient = new Redis.Cluster([
    //   {
    //     host: config.get('REDIS_HOST'),
    //     port: config.get('REDIS_PORT'),
    //   },
    // ]);
    // this.monitor();
  }

  onModuleInit() {
    this.redisClient = new Redis.Cluster([
      {
        host: this.redisConfigService.host,
        port: this.redisConfigService.port,
      },
    ]);
    this.monitor();
  }

  async monitor() {
    if (this.redisClient) {
      this.redisClient.on('connect', () => {
        console.log('redis connect');
      });

      this.redisClient.on('close', (a: any) => {
        console.log('redis close');
        console.log(a);
      });

      this.redisClient.on('ready', () => {
        console.log('redis ready');
      });

      this.redisClient.on('end', (a: any) => {
        console.log('redis end');
        console.log(a);
      });

      this.redisClient.on('wait', (a: any) => {
        console.log('redis wait');
        console.log(a);
      });

      this.redisClient.on('reconnecting', (argument: any) => {
        console.log('redis reconnecting');
        console.log(argument);
      });

      this.redisClient.on('error', (error: any) => {
        console.log('redis error');
        console.log(error);
      });
    }
  }

  async checkRedisClient() {
    return this.redisClient;
  }

  // key count 증가
  async incr(key: string) {
    return this.redisClient.incr(key);
  }

  // 현재 key count 조회
  async get(key: string) {
    return this.redisClient.get(key);
  }

  // set key value
  async set(key: string, value: number) {
    return await this.redisClient.set(key, value);
  }

  // async lock(key: string, value: string, expire: number) {
  //   const result = await this.redisClient.multi();

  //   return this.redisClient.set(key, value, 'EX', expire, 'NX');
  // }
}
