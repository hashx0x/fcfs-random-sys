import { Test, TestingModule } from '@nestjs/testing';
import { FcfsEventService } from '../src/fcfs-event/service/fcfs-event.service';
import { ConfigService } from '@nestjs/config';
import { RedisManager } from 'src/libs/redis-manager/redis.manager';

// RedisManager를 위한 간단한 모킹
class MockRedisManager {
  public count = 0;

  async incr(key: string): Promise<number> {
    this.count++;
    return this.count;
  }
}

describe('FcfsEventService', () => {
  let service: FcfsEventService;
  let mockRedisManager: MockRedisManager;

  beforeEach(async () => {
    mockRedisManager = new MockRedisManager();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FcfsEventService,
        {
          provide: RedisManager,
          useValue: mockRedisManager,
        },
        ConfigService,
      ],
    }).compile();

    service = module.get<FcfsEventService>(FcfsEventService);
  });

  it('should handle concurrency and not exceed limit', async () => {
    const promises: any[] = [];
    const limit = 10000;

    // 10001번 동시에 pickRandomProduct 함수를 호출하여 경계값을 테스트
    for (let i = 0; i <= limit; i++) {
      promises.push(service.pickRandomProduct('testEvent'));
    }

    const results = await Promise.all(promises);

    // 10001번째 호출 결과가 10000을 초과하는지 확인
    expect(results[limit].count).toBeGreaterThan(10000);

    // 카운트가 정확히 10001임을 확인
    expect(mockRedisManager.count).toBe(limit + 1);
  });
});
