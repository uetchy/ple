#!/usr/bin/env node

import cac from 'cac';
import epicfail, { fail } from 'epicfail';
import { rewritePlist, readPlist } from '.';

epicfail();

const cli = cac();

function log(obj: any, json: boolean = false) {
  console.log(json ? JSON.stringify(obj, null, 2) : obj);
}

cli
  .command('<plistPath> [key] [value]')
  .option('json', 'boolean', { default: false })
  .action((plistPath, key, value, { json }) => {
    if (value) {
      rewritePlist(plistPath, key, value);
    } else {
      log(readPlist(plistPath, key), json);
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
