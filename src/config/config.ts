import dotenv from 'dotenv';
import path from 'path';
import logger from '../logger/winston.js';
import { z } from 'zod';

const env = process.env.NODE_ENV?.trim() || 'development';

const env_path = path.resolve(process.cwd(), `.env.${env}`);

dotenv.config({
  path: env_path
});

logger.info(`Env File .env.${env}`);

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'testing', 'production']).default('development'),
  PORT: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !Number.isNaN(val), {
      message: 'PORT must be a number'
    }),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required')
});

type envType = z.infer<typeof envSchema>;

const config: envType = envSchema.parse(process.env);

export default config;
