#!/usr/bin/env node

import cac from "cac";
import { epicfail } from "epicfail";
import { readPlist, rewritePlist } from ".";

epicfail(require.main?.filename!, {
  assertExpected: (err: any) =>
    err.name === "CACError" || (err as any)?.code?.startsWith("ENOENT"),
});

const cli = cac();

function log(obj: any, json: boolean = false) {
  console.log(json ? JSON.stringify(obj, null, 2) : obj);
}

cli
  .command("<plistPath> [key] [value]")
  .option("-j, --json", "JSON output", { default: false })
  .option("-d, --delete-key", "Delete key from the plist", { default: false })
  .action((plistPath, key, value, { json, deleteKey }) => {
    if (value) {
      rewritePlist(plistPath, key, value);
    } else {
      if (deleteKey) {
        rewritePlist(plistPath, key, undefined);
      } else {
        log(readPlist(plistPath, key), json);
      }
    }
  })
  .example("ple Info.plist")
  .example("ple Info.plist --json")
  .example("ple Info.plist bundleid")
  .example("ple Info.plist 'Frame MainWindow' '483 223'")
  .example("ple Info.plist app.version -d");
cli.help();
cli.parse();
