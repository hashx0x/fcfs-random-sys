import { Test, TestingModule } from '@nestjs/testing';
import { FcfsEventService } from './fcfs-event.service';

describe('EventProductService', () => {
  let service: FcfsEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FcfsEventService],
    }).compile();

    service = module.get<FcfsEventService>(FcfsEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
