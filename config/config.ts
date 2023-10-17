import { defineConfig } from '@umijs/max';
import zhCN from 'antd/locale/zh_CN';
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
  initialState: {},
  tailwindcss: {},
  title: defaultSettings.title as string,
  layout: defaultSettings,
  antd: {
    configProvider: {
      theme: { token: theme },
      locale: zhCN,
    },
  },
  request: {},
  headScripts: [
    // 解决首次加载时白屏的问题
    { src: '/loading.js', async: true },
  ],
  copy: ['./loading.js'],
  presets: ['umi-presets-pro'],
  openAPI,
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
  favicons: ['/favicon1.png'],
});
