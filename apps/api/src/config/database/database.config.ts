import z from 'zod';

export const DatabaseConfigSchema = z.object({
  DB_NAME: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string().transform((v) => Number(v)),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
});

export interface IDatabaseConfig extends z.infer<typeof DatabaseConfigSchema> {}

export const validateDatabaseConfig = (config: Record<string, any>) => {
  const parsedDatabaseConfig = DatabaseConfigSchema.safeParse(config);

  if (!parsedDatabaseConfig.success) {
    throw new Error(parsedDatabaseConfig.error.message);
  }

  return parsedDatabaseConfig.data;
};
