export {};

declare global {
  declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

  type RecordKey = React.Key | React.Key[];

  type OptionItem = {
    label: string;
    value: string;
  };
}
