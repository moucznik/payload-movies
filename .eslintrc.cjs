module.exports = {
  extends: ['next', 'plugin:@lexical/reccomended'],
  root: true,
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
}
