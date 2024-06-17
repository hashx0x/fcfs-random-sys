import { z } from 'nestjs-zod/z';
import { DatabaseConfigSchema } from './database/database.config';
import { RedisConfigSchema } from './redis/redis.config';

export const AppConfigSchema = z.object({
  ...DatabaseConfigSchema.shape,
  ...RedisConfigSchema.shape,
});

export const validateAppConfig = (config: Record<string, any>) => {
  const parsedAppConfig = AppConfigSchema.safeParse(config);

  if (!parsedAppConfig.success) {
    throw new Error(parsedAppConfig.error.message);
  }

  return parsedAppConfig.data;
};

//TODO: 추후 config load 방법 결정
// export const AppConfig = () => {
//   const appConfig = {
//     redis: {
//       host: process.env.REDIS_HOST || 'localhost',
//       port: Number(process.env.REDIS_PORT) || 6379,
//     },
//   };

//   return appConfig;
// };
