import { Inject, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { REDIS_MANAGER } from 'src/libs/redis/redis.symbol';
import { IRedisManager } from 'src/libs/redis/redis.manager.interface';

@Injectable()
export class FcfsEventService {
  constructor(@Inject(REDIS_MANAGER) private readonly redisManager: IRedisManager) {}

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
