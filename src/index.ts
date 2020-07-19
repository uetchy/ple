import merge from 'deepmerge';
import { readFileSync, writeFileSync } from 'fs';
import plist from 'plist';

function dotToObject(key: string, value: any) {
  return key
    .split('.')
    .reverse()
    .reduce((sum, key) => ({ [key]: sum }), value);
}

export function loadPlist(plistPath: string): plist.PlistValue {
  return plist.parse(readFileSync(plistPath, 'utf8'));
}

export function writePlist(plistPath: string, data: any): void {
  writeFileSync(plistPath, plist.build(data));
}

export function rewritePlist(
  plistPath: string,
  key: string,
  value: string,
): unknown {
  const data = loadPlist(plistPath);
  const newData = merge(data as any, dotToObject(key, value));
  writePlist(plistPath, newData);
  return newData;
}
