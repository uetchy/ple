#!/usr/bin/env node

import cac from 'cac';
import epicfail, { fail } from 'epicfail';
import { rewritePlist, readPlist } from '.';

epicfail();

const cli = cac();

cli.command('<plistPath> <key> [value]').action((plistPath, key, value) => {
  if (value) {
    rewritePlist(plistPath, key, value);
  } else {
    console.log(readPlist(plistPath, key));
  }
});
cli.help();

try {
  cli.parse();
} catch (err) {
  if (['CACError'].includes(err.name) || err?.code?.startsWith('ENOENT')) {
    fail(err, { soft: true });
  }
  throw err;
}
