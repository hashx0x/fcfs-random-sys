import { Module } from '@nestjs/common';
import { FcfsEventController } from './controller/fcfs-event.controller';
import { FcfsEventService } from './service/fcfs-event.service';
import { RedisModule } from 'src/libs/redis-manager/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [FcfsEventController],
  providers: [FcfsEventService],
})
export class FcfsEventModule {}
