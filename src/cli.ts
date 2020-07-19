#!/usr/bin/env node

import cac from 'cac';
import epicfail from 'epicfail';
import { rewritePlist } from '.';

epicfail({ showStackTrace: false });

const cli = cac();

cli.command('<plistPath> <key> <value>').action((plistPath, key, value) => {
  rewritePlist(plistPath, key, value);
});
cli.help();

cli.parse();
