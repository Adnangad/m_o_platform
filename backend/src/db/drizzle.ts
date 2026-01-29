import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';

config();

export const db = drizzle(process.env.DATABASE_URL!);