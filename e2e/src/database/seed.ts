import { SeedData } from '../../../src/database/seed';
import { pool } from './pool';

/**
 * Seed the database with some data
 * @param  data The data to seed the database with
 */
export async function seed(data: SeedData) {
  const pgPool = pool();

  await pgPool.query(data.sql, await data.binds());
}
