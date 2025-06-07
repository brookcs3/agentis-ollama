// search-files.js
import { glob } from 'glob';
import { stat } from 'fs/promises';

const SearchGlobTool = {
  async run({ pattern, path = process.cwd() }) {
    const matches = await glob(pattern, { cwd: path, nodir: true });
    const detailed = await Promise.all(
      matches.map(async file => ({
        file,
        mtime: (await stat(`${path}/${file}`)).mtimeMs
      }))
    );
    return detailed
      .sort((a, b) => b.mtime - a.mtime)
      .map(entry => entry.file);
  }
};

export default SearchGlobTool;
