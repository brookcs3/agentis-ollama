// Utility for searching files matching a glob pattern.
import { glob } from 'glob';
import { stat } from 'fs/promises';

/**
 * Search for files in `path` matching `pattern` and return them sorted by
 * modification time (newest first).
 */
export async function searchFiles({ pattern, path = process.cwd() }) {
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

export default { run: searchFiles };
