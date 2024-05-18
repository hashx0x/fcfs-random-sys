import { Body, Controller, Post } from '@nestjs/common';
import { FcfsEventService } from './fcfs-event.service';
import { PickRandomDto } from './fcfs-event.controller.dto';

@Controller('event-product')
export class FcfsEventController {
  constructor(private eventProductService: FcfsEventService) {}

  // pick random product
  @Post('pick-random')
  async pickRandomProduct(@Body() data: PickRandomDto) {
    // return this.eventProductService.pickRandomProduct(data);
  }
}
