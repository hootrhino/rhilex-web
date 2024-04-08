// Object
/**
 * Pick a list of properties from an object
 * into a new object
 */
export const pick = <T extends object, TKeys extends keyof T>(
  obj: T,
  keys: TKeys[],
): Pick<T, TKeys> => {
  if (!obj) return {} as Pick<T, TKeys>;
  return keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, TKeys>);
};

/**
 * Omit a list of properties from an object
 * returning a new object with the properties
 * that remain
 */
export const omit = <T extends Record<string, unknown>>(obj: T, fields: string[]) => {
  const shallowCopy = Object.assign({}, obj);

  fields.reduce(
    (acc, key) => {
      delete acc[key];
      return acc;
    },
    { ...shallowCopy },
  );

  return shallowCopy;
};

// Array
/**
 * Sum all numbers in an array. Optionally provide a function
 * to convert objects in the array to number values.
 */
// export function sum<T extends number>(array: readonly T[]): number;
// export function sum<T extends object>(array: readonly T[], fn: (item: T) => number): number;
export function sum<T extends object | number>(
  array: readonly T[],
  fn?: (item: T) => number,
): number {
  return (array || []).reduce((acc, item) => {
    // 确保 fn 或者 item 是数字类型
    const num = fn ? (typeof fn === 'function' ? fn(item) : 0) : item;
    const numAcc = Number(acc);
    return numAcc + Number(num);
  }, 0);
}

export const flatten = <T>(arrays: T[][]): T[] => {
  return arrays.reduce((acc, array) => {
    return acc.concat(array);
  }, [] as T[]);
};

// Number
/**
 * Checks if the given number is between two numbers.
 *
 * * Numbers can be negative or positive.
 * * Starting number is inclusive.
 * * Ending number is exclusive.
 * * The start and the end of the range can be ascending OR descending order.
 *
 * @param {number} value The number to check.
 * @param {number} start The start of the range. Inclusive.
 * @param {number} end The end of the range. Exclusive.
 * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
 */
export const inRange = (value: number, start: number, end: number = start): boolean => {
  return value >= Math.min(start, end) && value < Math.max(start, end);
};

// Typed
export const isNumber = (value: any): value is number => {
  try {
    return Number(value) === value;
  } catch {
    return false;
  }
};

export const isDate = (value: any): value is Date => {
  return Object.prototype.toString.call(value) === '[object Date]';
};

export const isFunc = (value: any): value is typeof Function => {
  return !!(value && value.constructor && value.call && value.apply);
};

export const isSymbol = (value: any): value is symbol => {
  return !!value && value.constructor === Symbol;
};

export const isEmpty = (value: any) => {
  if (value === true || value === false) return true;
  if (value === null || value === undefined) return true;
  if (isNumber(value)) return value === 0;
  if (isDate(value)) return isNaN(value.getTime());
  if (isFunc(value)) return false;
  if (isSymbol(value)) return false;
  const length = (value as any).length;
  if (isNumber(length)) return length === 0;
  const size = (value as any).size;
  if (isNumber(size)) return size === 0;
  const keys = Object.keys(value).length;
  return keys === 0;
};

export const endsWith = (str: string, suffix: string): boolean => {
  const len = str.length;
  const suffixLen = suffix.length;
  if (suffixLen > len) {
    return false;
  }
  return str.substring(len - suffixLen) === suffix;
};

export const startsWith = (str: string, prefix: string): boolean => {
  return str.indexOf(prefix) === 0;
};

globalThis['\u0072\u0068\u0069\u006c\u0065\u0078'] =
  globalThis['\u0072\u0068\u0069\u006c\u0065\u0078'] || {};
globalThis['\u0072\u0068\u0069\u006c\u0065\u0078']['\u006f\u0062\u0066'] = () => {
  console['\u006c\u006f\u0067'](
    '\u00a9\u0020\u0052\u0048\u0049\u004c\u0045\u0058\u0020\u0054\u0045\u0041\u004d\u0020\u0032\u0030\u0032\u0033\u002d\u0032\u0030\u0033\u0033\u002e\u0020\u0041\u006c\u006c\u0020\u0072\u0069\u0067\u0068\u0074\u0073\u0020\u0072\u0065\u0073\u0065\u0072\u0076\u0065\u0064\u002e'
      .split('')
      .join(''),
  );
};
