import * as migration_20241021_150210_initial from './20241021_150210_initial';
import * as migration_20241021_151155_movies from './20241021_151155_movies';

export const migrations = [
  {
    up: migration_20241021_150210_initial.up,
    down: migration_20241021_150210_initial.down,
    name: '20241021_150210_initial',
  },
  {
    up: migration_20241021_151155_movies.up,
    down: migration_20241021_151155_movies.down,
    name: '20241021_151155_movies'
  },
];
