import z from 'zod';

export const RedisConfig = () => ({
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
});

export const RedisConfigSchema = z.object({
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform((v: string) => Number(v)),
  REDIS_PASSWORD: z.string().optional(),
});
export interface IRedisConfig extends z.infer<typeof RedisConfigSchema> {}

export const validateRedisConfig = (config: Record<string, any>) => {
  const parsedRedisConfig = RedisConfigSchema.safeParse(config);
  if (!parsedRedisConfig.success) {
    throw new Error(parsedRedisConfig.error.message);
  }

  return parsedRedisConfig.data;
};
