import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from './database.config';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService<IDatabaseConfig>) {}

  get host() {
    return this.configService.get('DB_HOST');
  }
  get port() {
    return this.configService.get('DB_PORT');
  }

  get username() {
    return this.configService.get('DB_USER');
  }

  get password() {
    return this.configService.get('DB_PASSWORD');
  }

  get name() {
    return this.configService.get('DB_NAME');
  }
}
