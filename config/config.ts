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
  initialState: {
    loading: '@/loading',
  },
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
  presets: ['umi-presets-pro'],
  openAPI,
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
  favicons: ['/favicon.png'],
  inlineLimit: 100000, // 配置图片文件是否走 base64 编译的阈值 100k
  jsMinifier: 'uglifyJs', // 配置构建时压缩 JavaScript 的工具
  codeSplitting: { jsStrategy: 'granularChunks' }, // 代码拆分
  chainWebpack: (config) => {
    config.module
      .rule('woff2')
      .test(/\.(woff|woff2)$/)
      .use('file-loader')
      .loader('file-loader');
  },
});
