import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EndpointModule } from './endpoint/endpoint.module';
import { ProductModule } from './product/product.module';
import { EventProductModule } from './event-product/event-product.module';

@Module({
  imports: [EndpointModule, ProductModule, EventProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
