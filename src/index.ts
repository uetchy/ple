import merge from "deepmerge";
import plist from "simple-plist";

function objectFromDottedProps(key: string, value: any) {
  return key
    .split(".")
    .reverse()
    .reduce((sum, key) => ({ [key]: sum }), value);
}

function readDottedProps(key: string, obj: any): any {
  return key.split(".").reduce((sum, key) => {
    return sum[key];
  }, obj);
}

function loadPlist(plistPath: string) {
  return plist.readFileSync(plistPath);
}

export function writePlist(plistPath: string, data: any): void {
  plist.writeFileSync(plistPath, data);
}

export function readPlist(plistPath: string, key?: string): any {
  const data = loadPlist(plistPath);
  if (!key) return data;
  return readDottedProps(key, data);
}

export function rewritePlist(
  plistPath: string,
  key: string,
  value: string
): unknown {
  const data = loadPlist(plistPath);
  const newData = merge(data as any, objectFromDottedProps(key, value));
  writePlist(plistPath, newData);
  return newData;
}
