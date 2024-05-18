import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FcfsEventModule } from './fcfs-event/event-product.module';

@Module({
  imports: [FcfsEventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
