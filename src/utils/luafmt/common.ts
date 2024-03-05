/**
 * 公共函数/方法
 */

export const assert = (a: any, b?: string) => {
  if (!a) {
    throw b ?? new Error('failed');
  }
};
