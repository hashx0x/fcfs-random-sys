import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisManager } from '../../libs/redis-manager/redis.manager';
import { v4 } from 'uuid';

@Injectable()
export class FcfsEventService {
  private readonly;
  constructor(
    private redisManager: RedisManager,
    config: ConfigService,
  ) {}

  // TODO: Param에 user 정보 추가,
  async pickRandomProduct(randomEventId: string) {
    // TODO: add logic that validate receipt

    // 한정수량 상품 카운트 증가
    const count = await this.redisManager.incr(randomEventId);

    if (count > 10000) return { count };

    const requestId = v4();

    // TODO: add logic that publish message

    return {
      requestId,
      count,
    };
  }
  async getSaledCount(randomEventId: string) {
    return await this.redisManager.get(randomEventId);
  }
}
