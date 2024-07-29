import { Module } from '@nestjs/common';
import { FcfsEventController } from './controller/fcfs-event.controller';
import { FcfsEventService } from './service/fcfs-event.service';
import { RedisModule } from 'src/libs/redis/redis.module';
import { DatabaseModule } from 'src/libs/rds/db.module';

@Module({
  imports: [RedisModule, DatabaseModule],
  controllers: [FcfsEventController],
  providers: [FcfsEventService],
})
export class FcfsEventModule {}
