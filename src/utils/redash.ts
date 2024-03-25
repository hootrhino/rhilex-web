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
  array: readonly any[],
  fn?: (item: T) => number,
): number {
  return (array || []).reduce((acc, item) => acc + (fn ? fn(item) : item), 0);
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
 * @param {number} number The number to check.
 * @param {number} start The start of the range. Inclusive.
 * @param {number} end The end of the range. Exclusive.
 * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
 */
// export function inRange(number: number, start: number, end: number): boolean;
// export const inRange = (value: number, start: number, end?: number): boolean => {
//   const isTypeSafe =
//     typeof value === 'number' &&
//     typeof start === 'number' &&
//     (typeof end === 'undefined' || typeof end === 'number');

//   if (!isTypeSafe) {
//     return false;
//   }

//   if (typeof end === 'undefined') {
//     end = start;
//     start = 0;
//   }

//   return value >= Math.min(start, end) && value < Math.max(start, end);
// }
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

// export const endsWith = (source: string, target: string, pos?: number) => {
//   const { length } = source;
//   pos = pos === undefined ? length : +pos;
//   if (pos < 0 || pos !== pos) {
//     pos = 0;
//   } else if (pos > length) {
//     pos = length;
//   }
//   const end = pos;
//   pos -= target.length;
//   return pos >= 0 && source.slice(pos, end) === target;
// };

// export const startsWith = (source: string, target: string, pos = 0) => {
//   const { length } = source;
//   pos = pos === null ? 0 : pos;
//   if (pos < 0) {
//     pos = 0;
//   } else if (pos > length) {
//     pos = length;
//   }
//   target = `${target}`;
//   return source.slice(pos, pos + target.length) === target;
// };
export const startsWith = (str: string, prefix: string): boolean => {
  return str.indexOf(prefix) === 0;
};
