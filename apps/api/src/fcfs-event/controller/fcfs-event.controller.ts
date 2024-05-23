import { Body, Controller, Post } from '@nestjs/common';
import { FcfsEventService } from '../service/fcfs-event.service';
import { PickRandomDto } from './fcfs-event.controller.dto';

@Controller('event-product')
export class FcfsEventController {
  constructor(private fcfsEventService: FcfsEventService) {}

  // pick random product
  @Post('pick-random')
  async pickRandomProduct(@Body() data: PickRandomDto) {
    // TODO: return this.fcfsEventService.pickRandomProduct(data);
  }
}
