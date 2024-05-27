import { Test, TestingModule } from '@nestjs/testing';
import { FcfsEventController } from '../src/fcfs-event/controller/fcfs-event.controller';

describe('EventProductController', () => {
  let controller: FcfsEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FcfsEventController],
    }).compile();

    controller = module.get<FcfsEventController>(FcfsEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
