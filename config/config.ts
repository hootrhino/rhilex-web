import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import openAPI from './openAPI';
import proxy from './proxy';
import routes from './routes';
import theme from './theme';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  hash: true,
  routes,
  ignoreMomentLocale: true,
  proxy: proxy[(REACT_APP_ENV as keyof typeof proxy) || 'dev'],
  fastRefresh: true,
  model: {},
  tailwindcss: {},
  request: {},
  initialState: {
    loading: '@/loading',
  },
  title: defaultSettings.title as string,
  layout: defaultSettings,
  antd: {
    configProvider: {
      theme: { token: theme },
    },
  },
  locale: {
    antd: true,
    title: true,
  },
  presets: ['umi-presets-pro'],
  openAPI,
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
  favicons: ['/favicon.svg'],
  esbuildMinifyIIFE: true,
  codeSplitting: { jsStrategy: 'granularChunks' }, // 代码拆分
});
