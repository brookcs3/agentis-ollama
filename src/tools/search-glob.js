// src/tools/search-glob.ts
import { glob } from 'glob';
import { stat } from 'fs/promises';
import z from 'zod';

const SearchGlobTool = {
  name: 'search-glob',

  userFacingName() {
    return 'Search';
  },

  async description() {
    return `Search for files using a glob pattern. Returns matching file paths sorted by modification time.`;
  },

  inputSchema: z.strictObject({
    pattern: z.string().describe('Glob pattern like "**/*.ts" or "src/**/*.js"'),
    path: z
      .string()
      .optional()
      .describe('Directory to search in. Defaults to the current working directory.')
  }),

  async run({ pattern, path = process.cwd() }) {
    const matches = await glob(pattern, { cwd: path, nodir: true });
    const withTimes = await Promise.all(
      matches.map(async file => ({
        file,
        mtime: (await stat(`${path}/${file}`)).mtimeMs
      }))
    );
    return withTimes
      .sort((a, b) => b.mtime - a.mtime)
      .map(entry => entry.file);
  }
};

export default SearchGlobTool;
