import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IRedisConfig } from './redis.config';

@Injectable()
export class RedisConfigService {
  constructor(private configService: ConfigService<IRedisConfig>) {}

  get host() {
    return this.configService.get('REDIS_HOST');
  }
  get port() {
    return this.configService.get('REDIS_PORT');
  }

  get password() {
    return this.configService.get('REDIS_PASSWORD');
  }
}
