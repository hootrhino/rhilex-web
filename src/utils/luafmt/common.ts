import { Main_CharacterForEscape } from "./constant";

/**
 * 公共函数/方法
 */
export const parseFloat = (str: string | symbol, radix?: number) => {
  if (!str) return 0;
  var parts = str.toString().split('.');
  if (parts.length > 1 && radix) {
    return parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix, parts[1].length);
  }
  return parseInt(parts[0], radix);
}

export const assert = (a: any, b?: string) => {
  if (!a) {
    throw b ?? new Error('failed');
  }
};

// 将字符串转成一个散列值(hash值)
export const hash2String = (key: string): number => {
  let hash = 0;
  let i = key.length;

  while (i--) {
    hash += key.charCodeAt(i);
    hash += hash << 10;
    hash ^= hash >> 6;
  }
  hash += hash << 3;
  hash ^= hash >> 11;
  hash += hash << 15;

  return hash;
};

export const CharacterForEscape = new Proxy(Main_CharacterForEscape, {
  get(a, b) { return parseFloat(b) }
})
