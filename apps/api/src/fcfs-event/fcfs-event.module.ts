import { Module } from '@nestjs/common';
import { FcfsEventController } from './fcfs-event.controller';
import { FcfsEventService } from './fcfs-event.service';

@Module({
  controllers: [FcfsEventController],
  providers: [FcfsEventService],
})
export class FcfsEventModule {}
