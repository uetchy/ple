import merge from "deepmerge";
import { readFile, readFileSync } from "fs";
import plist from "simple-plist";

function objectFromDottedKey(key: string, value: any) {
  return key
    .split(".")
    .reverse()
    .reduce((v, key) => ({ [key]: v }), value);
}

function readValueByDottedKey(key: string, obj: any): any {
  return key.split(".").reduce((sum, key) => {
    return sum[key];
  }, obj);
}

function removeValueByDottedKey(obj: any, key: string) {
  const keys = key.split(".");
  keys.reduce((sum, key, i) => {
    if (keys.length - 1 === i) {
      delete sum[key];
      return;
    }
    return sum[key];
  }, obj);
  return obj;
}

function isBplist(data: string | Buffer): boolean {
  return data.slice(0, 6).toString() === "bplist";
}

function parsePlist<T = unknown>(data: string | Buffer): T {
  return plist.parse(data);
}

export function writePlist(
  plistPath: string,
  data: any,
  binary: boolean = false
): void {
  (binary ? plist.writeBinaryFileSync : plist.writeFileSync)(plistPath, data);
}

export function readPlist(plistPath: string, key?: string): any {
  const raw = readFileSync(plistPath);
  const data = parsePlist(raw);
  if (!key) return data;
  return readValueByDottedKey(key, data);
}

export function rewritePlist(
  plistPath: string,
  key: string,
  value?: string
): unknown {
  const raw = readFileSync(plistPath);
  const isBinary = isBplist(raw);
  const data = parsePlist(raw);
  const newData =
    value === undefined
      ? removeValueByDottedKey(data as any, key)
      : merge(data as any, objectFromDottedKey(key, tryParseNumber(value)));
  writePlist(plistPath, newData, isBinary);
  return newData;
}

function tryParseNumber(numStr: string): string | number {
  const maybeNumber = Number(numStr);
  if (!Number.isNaN(maybeNumber)) {
    return maybeNumber;
  }

  return numStr;
}
