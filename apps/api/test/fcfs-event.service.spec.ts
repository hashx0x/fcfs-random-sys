import { Test, TestingModule } from '@nestjs/testing';
import { FcfsEventService } from '../src/core/fcfs-event/service/fcfs-event.service';
import { ConfigModule } from '@nestjs/config';
import { RedisManager } from 'src/libs/redis/redis.manager';
import { RedisModule } from 'src/libs/redis/redis.module';
import { validateAppConfig } from 'src/config/config';
import { Cluster } from 'ioredis';
import { REDIS_CLIENT, REDIS_MANAGER } from 'src/libs/redis/redis.symbol';

describe('FcfsEventService', () => {
  let service: FcfsEventService;
  let redisManager: RedisManager;
  let redisClient: Cluster;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          validate: validateAppConfig,
          isGlobal: true,
        }),
        RedisModule,
      ],
      providers: [FcfsEventService],
    }).compile();

    service = module.get<FcfsEventService>(FcfsEventService);
    redisManager = module.get<RedisManager>(REDIS_MANAGER);
    redisClient = module.get<Cluster>(REDIS_CLIENT);
  });

  afterAll(async () => {
    redisClient.removeAllListeners();
    redisClient.quit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle concurrency and not exceed limit', async () => {
    const testKey = 'testEvent';

    // 초기화
    const result = await redisManager.set(testKey, 0);
    console.log('result', result);

    const promises: any[] = [];
    const limit = 10000;

    // 10001번 동시에 pickRandomProduct 함수를 호출하여 경계값을 테스트
    for (let i = 0; i <= limit; i++) {
      promises.push(service.pickRandomProduct('testEvent'));
    }

    const results = await Promise.all(promises);

    // 10001번째 호출 결과가 10000을 초과하는지 확인
    expect(Number(results[limit].count)).toBeGreaterThan(10000);

    // 카운트가 정확히 10001임을 확인
    expect(Number(await redisManager.get(testKey))).toBe(limit + 1);
  });
});
