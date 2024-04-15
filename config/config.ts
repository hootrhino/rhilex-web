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
  favicons: [
    'data:image/svg+xml;charset=utf-8;base64,PHN2ZyBpZD0nX+WbvuWxgl8yJyBkYXRhLW5hbWU9J+WbvuWxgiAyJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNDIuMzYgMjcuMDEnPjxkZWZzPjxzdHlsZT4gLmNscy0xIHsgZmlsbDogIzAwMDsgfSA8L3N0eWxlPjwvZGVmcz48ZyBpZD0nX+WbvuWxgl8yLTInIGRhdGEtbmFtZT0nIOWbvuWxgiAyJz48ZyBpZD0nX+WbvuWxgl8xLTInIGRhdGEtbmFtZT0nIOWbvuWxgiAxLTInPjxnPjxwYXRoIGQ9J00yMC4yNCwuMDJjMi4yNywwLDQuNDksLjMzLDYuNjgsLjk5LC43NCwuMjIsMS41LC41MiwyLjI5LC44OCwuMzUsLjE1LC44NiwuNDQsMS41MiwuODgsMS4wNSwuNjksMS44NCwxLjQyLDIuMzQsMi4yMSwuNjYsLjk4LDEsMS45OCwxLDIuOTh2LjYzYzAsMS42NS0uNzgsMy4yLTIuMzQsNC42OC0xLjQyLDEuMjItMy4yLDIuMTgtNS4zNCwyLjg1LS40NCwuMTQtLjY0LC40Ny0uNDMsLjc1LDEuMzksMS44NSwzLjM1LDQuNDgsNS44OSw3Ljg5LC40NCwuNTgsLjc5LDEuMDUsMS4wNiwxLjQxLC4yOCwuMzctLjE2LC44LS44MSwuOGgtNC42OWMtLjM1LDAtLjY2LS4xMi0uODEtLjMxLS4yOC0uMzYtLjc1LTEuMDMtMS40My0yLjAxLTEuMDktMS41Ny0yLjc3LTMuOS01LjA0LTctLjIzLS4zNC0uMzctLjU1LS40MS0uNjNINS44NnMtLjEsMC0uMTgsLjA0djkuOTFIMFYwTTUuNjgsNS4zM3Y2Ljc0YzAsLjI0LC40MiwuNDMsLjk0LC40M2gxMy44N2MyLjY1LDAsNC44OS0uNDIsNi43Mi0xLjI3LDEuNDItLjc0LDIuMTQtMS41OSwyLjE0LTIuNTd2LS4yNWMwLTEuMzItMS4zMi0yLjMxLTMuOTctMi45Ny0xLjQ3LS4zNi0zLjAzLS41NC00LjctLjU0SDYuNjJjLS41MiwwLS45NCwuMTktLjk0LC40M2gwWicvPjxwYXRoIGQ9J000Ni45OCwuMDJoNS42MlYxMC4zNWMwLC4zMSwuNCwuNTcsLjksLjU3aDIwLjljLjUsMCwuOS0uMjUsLjktLjU3Vi4wMmg1LjY4VjI2Ljk5aC01LjY4VjE1Ljg4YzAtLjMxLS40LS41Ny0uOS0uNTdoLTIwLjljLS41LDAtLjksLjI1LS45LC41N3YxMS4xMWgtNS42OFYuMDJoLjA2WicvPjxwYXRoIGQ9J00xMzAuNCwuMDJoLjA2VjIxLjQ5YzAsLjMxLC40LC41NywuOSwuNTdoMjcuMDNjLjUsMCwuOSwuMjUsLjksLjU3djMuOGMwLC4zMS0uNCwuNTctLjksLjU3aC0zMy4zNWMtLjE1LDAtLjI3LS4wOC0uMjctLjE3Vi4xOWMwLS4wOSwuMTEtLjE2LC4yNS0uMTZoNS4zOFonLz48cGF0aCBkPSdNMjE0Ljk4LC4wMnMuNDksLjQ1LDEuMzUsMS4zNmMxLjY4LDEuNzksNC4xOCw0LjQ3LDcuNSw4LjAzLC4zMSwuMjksLjg4LC45LDEuNywxLjgxaC4wNmMxLjAyLTEuMDgsMy4wMy0zLjI0LDYuMDQtNi40OCwuNzEtLjc1LDIuMTEtMi4yMyw0LjE5LTQuNDMsLjE2LS4xNywuNDYtLjI4LC43OC0uMjhoNC44NmMuNywwLDEuMTMsLjQ4LC43NywuODZsLTYuOSw3LjFjLS45NCwuOTgtMi44MSwyLjkzLTUuNjIsNS44Ni0uMDQsLjA1LS4xMiwuMTQtLjIzLC4yNiwxLjI5LDEuMzUsMy45Myw0LjA4LDcuOTEsOC4xOCwuNjUsLjY5LDEuODgsMS45NywzLjY4LDMuODUsLjM2LC4zOC0uMDcsLjg2LS43NywuODZoLTUuMjZzLTEuMDgtMS4wOS0zLjExLTMuMjhjLTEuMzMtMS40Mi0zLjM0LTMuNTYtNi4wNC02LjQxLS4wOC0uMDUtLjE4LS4xNi0uMjktLjMzLS4wOCwuMS0xLjg0LDEuOTgtNS4yNyw1LjY0LS44OSwuOTQtMi4yMSwyLjMtMy45NSw0LjExLS4xNiwuMTctLjQ2LC4yOC0uNzcsLjI4aC00LjcxYy0uNywwLTEuMTQtLjQ3LS43OC0uODUsMS40LTEuNDcsMy42NS0zLjgsNi43NS03LC44Mi0uODMsMi40NC0yLjUxLDQuODYtNS4wMXYtLjA0Yy0xLjItMS4yNC0zLjU4LTMuNzItNy4xNi03LjQ0bC0uMTctLjE3Yy0uMzYtLjM0LTIuMTctMi4yMS01LjQzLTUuNi0uMzYtLjM4LC4wNy0uODYsLjc3LS44Nmg1LjI2bC0uMDItLjAyWicvPjxnPjxyZWN0IHg9JzE2Ny41MycgeT0nMjEuOTgnIHdpZHRoPScyOC4wNicgaGVpZ2h0PSc1LjAxJyByeD0nLjcyJyByeT0nLjcyJy8+PHJlY3QgeD0nMTY3LjUzJyB5PScxMScgd2lkdGg9JzIzLjYyJyBoZWlnaHQ9JzUuMDEnIHJ4PScuNzInIHJ5PScuNzInLz48cmVjdCB4PScxNjcuNTMnIHk9Jy4wMicgd2lkdGg9JzI4LjA2JyBoZWlnaHQ9JzUuMDEnIHJ4PScuNzInIHJ5PScuNzInLz48L2c+PHJlY3QgeD0nOTguOTQnIHk9Jy4wMicgd2lkdGg9JzUuNjInIGhlaWdodD0nMjYuOTcnIHJ4PScuNzQnIHJ5PScuNzQnLz48L2c+PC9nPjwvZz48L3N2Zz4g',
  ],
  esbuildMinifyIIFE: true,
  inlineLimit: 100000, // 配置图片文件是否走 base64 编译的阈值 100k
  // jsMinifier: 'uglifyJs', // 配置构建时压缩 JavaScript 的工具
  codeSplitting: { jsStrategy: 'granularChunks' }, // 代码拆分
  // chainWebpack: (config) => {
  //   config.module
  //     .rule('woff2')
  //     .test(/\.(woff|woff2)$/)
  //     .use('file-loader')
  //     .loader('file-loader');
  // },
});
