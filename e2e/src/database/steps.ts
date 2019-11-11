import { After, Before } from 'cucumber';
import { closePool, createPool } from './pool';

Before(createPool);
After(closePool);
