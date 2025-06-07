// src/tools/search-glob.ts
import { searchFiles } from '../utils/search-files.js';
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
    return searchFiles({ pattern, path });
  }
};

export default SearchGlobTool;
