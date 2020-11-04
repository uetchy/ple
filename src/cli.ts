#!/usr/bin/env node

import cac from "cac";
import epicfail from "epicfail";
import { readPlist, rewritePlist } from ".";

epicfail({
  assertExpected: (err) =>
    err.name === "CACError" || (err as any)?.code?.startsWith("ENOENT"),
});

const cli = cac();

function log(obj: any, json: boolean = false) {
  console.log(json ? JSON.stringify(obj, null, 2) : obj);
}

cli
  .command("<plistPath> [key] [value]")
  .option("json", "boolean", { default: false })
  .action((plistPath, key, value, { json }) => {
    if (value) {
      rewritePlist(plistPath, key, value);
    } else {
      log(readPlist(plistPath, key), json);
    }
  });
cli.help();
cli.parse();
