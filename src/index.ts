import merge from 'deepmerge';
import { readFileSync, writeFileSync } from 'fs';
import plist from 'plist';

function objectFromDottedProps(key: string, value: any) {
  return key
    .split('.')
    .reverse()
    .reduce((sum, key) => ({ [key]: sum }), value);
}

function readDottedProps(key: string, obj: any): any {
  const keys = key.split('.');
  return keys.reduce((sum, key) => {
    return sum[key];
  }, obj);
}

export function loadPlist(plistPath: string): plist.PlistValue {
  return plist.parse(readFileSync(plistPath, 'utf8'));
}

export function writePlist(plistPath: string, data: any): void {
  writeFileSync(plistPath, plist.build(data));
}

export function readPlist(plistPath: string, key?: string): any {
  const data = loadPlist(plistPath);
  if (!key) return data;
  return readDottedProps(key, data);
}

export function rewritePlist(
  plistPath: string,
  key: string,
  value: string,
): unknown {
  const data = loadPlist(plistPath);
  const newData = merge(data as any, objectFromDottedProps(key, value));
  writePlist(plistPath, newData);
  return newData;
}
