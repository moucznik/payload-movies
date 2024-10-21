import * as migration_20241021_150210_initial from './20241021_150210_initial';

export const migrations = [
  {
    up: migration_20241021_150210_initial.up,
    down: migration_20241021_150210_initial.down,
    name: '20241021_150210_initial'
  },
];
