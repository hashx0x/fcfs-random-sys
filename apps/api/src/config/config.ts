import { z } from 'nestjs-zod/z';

export interface RedisConfig {
  REDIS_HOST: string;
  REDIS_PORT: number;
}

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

export const AppConfigSchema = z.object({
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform((v) => Number(v)),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string().transform((v) => Number(v)),
});

export const validateAppConfig = (config: Record<string, any>) => {
  const parsedAppConfig = AppConfigSchema.safeParse(config);

  if (!parsedAppConfig.success) {
    throw new Error(parsedAppConfig.error.message);
  }

  return parsedAppConfig.data;
};
