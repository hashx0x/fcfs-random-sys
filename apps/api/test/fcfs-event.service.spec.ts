import { Test, TestingModule } from '@nestjs/testing';
import { FcfsEventService } from '../src/fcfs-event/service/fcfs-event.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisManager } from 'src/common/redis-manager/redis.manager';
import { RedisModule } from 'src/common/redis-manager/redis.module';
import { validateAppConfig } from 'src/config/config';

// RedisManager를 위한 간단한 모킹
class MockRedisManager {
  public count = 0;

  async incr(key: string): Promise<number> {
    this.count++;
    return this.count;
  }

  async get(key: string): Promise<number> {
    return this.count;
  }
}

describe('FcfsEventService', () => {
  let service: FcfsEventService;
  let mockRedisManager: MockRedisManager;
  let redisManager: RedisManager;

  beforeEach(async () => {
    mockRedisManager = new MockRedisManager();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          validate: validateAppConfig,
          isGlobal: true,
        }),
        RedisModule,
      ],

      providers: [
        FcfsEventService,
        // {
        //   provide: RedisManager,
        //   useValue: mockRedisManager,
        // },
        ConfigService,
      ],
    }).compile();

    service = module.get<FcfsEventService>(FcfsEventService);
    redisManager = module.get<RedisManager>(RedisManager);

    // await redisManager.setRedisClient();
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });

  it('should handle concurrency and not exceed limit', async () => {
    const testKey = 'testEvent';

    // 초기화
    await redisManager.set(testKey, 0);

    const promises: any[] = [];
    const limit = 10000;

    // 10001번 동시에 pickRandomProduct 함수를 호출하여 경계값을 테스트
    for (let i = 0; i <= limit; i++) {
      promises.push(service.pickRandomProduct('testEvent'));
    }

    const results = await Promise.all(promises);

    // 10001번째 호출 결과가 10000을 초과하는지 확인
    console.log('results[limit].count', results[limit].count);
    expect(Number(results[limit].count)).toBeGreaterThan(10000);

    console.log('!!!!count', await service.getSaledCount('testEvent'));

    // 카운트가 정확히 10001임을 확인
    expect(Number(await redisManager.get(testKey))).toBe(limit + 1);
  });
});
