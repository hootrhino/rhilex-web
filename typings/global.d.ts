export {};

declare global {
  declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

  interface Window {
    __POWERED_BY_QIANKUN__: boolean | undefined;
  }
}
