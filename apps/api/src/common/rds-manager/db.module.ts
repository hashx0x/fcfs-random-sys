import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule } from 'src/config/database/database.config.module';
import { DatabaseConfigService } from 'src/config/database/database.config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: (configService: DatabaseConfigService) => ({
        type: 'postgres',
        host: configService.host,
        port: configService.port,
        username: configService.username,
        password: configService.password,
        database: configService.name,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {
  static forFeature(entities: any[]): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forFeature(entities)],
      exports: [TypeOrmModule],
    };
  }
}
