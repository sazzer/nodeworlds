import { After, Before } from 'cucumber';
import { clearDatabase } from './clear';
import { closePool, createPool } from './pool';

Before(async () => {
    createPool();
    await clearDatabase();
});

After(closePool);
