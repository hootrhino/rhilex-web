import { defineConfig } from '@umijs/max';
import zhCN from 'antd/locale/zh_CN';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import theme from './theme';
import openAPI from './openAPI';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  hash: true,
  routes,
  // theme: {
  //   // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
  //   // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
  //   'root-entry-name': 'variable，',
  // },
  ignoreMomentLocale: true,
  proxy: proxy[(REACT_APP_ENV as keyof typeof proxy) || 'dev'],
  fastRefresh: true,
  model: {},
  /**
   * 一个全局的初始数据流，可以用它在插件之间共享数据
   * @description 可以用来存放一些全局的数据，比如用户信息，或者一些全局的状态，全局初始状态在整个 Umi 项目的最开始创建。
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},
  title: defaultSettings.title as string,
  layout: defaultSettings,
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  antd: {
    configProvider: {
      theme: { token: theme },
      locale: zhCN,
    },
  },
  /**
   * @name 网络请求配置
   * @description 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  access: {},
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
  favicons: ['/favicon.ico'],
});
