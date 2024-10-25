import * as migration_20241025_123433_initial from './20241025_123433_initial';

export const migrations = [
  {
    up: migration_20241025_123433_initial.up,
    down: migration_20241025_123433_initial.down,
    name: '20241025_123433_initial'
  },
];
