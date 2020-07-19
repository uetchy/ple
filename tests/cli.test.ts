import execa from 'execa';
import { join } from 'path';

const pkg = require('../package.json');
const bin = join(__dirname, '..', pkg.bin);

it('run', async () => {
  const { stdout } = await execa(bin, ['--help']);
  expect(stdout).toContain('Usage:');
});
