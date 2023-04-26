import type { RequestConfig } from '@umijs/max';
import { message,notification } from '@/components/PopupHack';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

type BizErrorInfo = {
  errorCode: number | string;
  errorMessage: string;
  errorShowType: ErrorShowType;
};

const codeMessage = {
  400: '请求参数错误',
  401: '您的登录已失效，请重新登录',
  403: '权限验证不通过',
  404: '找不到该接口',
  405: '请求方法不被允许',
  406: '请求的资源特性不满足请求头条件',
  407: '需要在代理服务器进行身份验证',
  408: '请求超时',
  409: '请求状态冲突',
  410: '请求的资源已被永久删除',
  411: '请求被拒绝，需要定义内容长度',
  412: '服务器无法满足请求头条件',
  413: '请求提交的数据大小超出范围',
  414: '请求的 URI 长度超出范围',
  415: '请求提交的数据格式不支持',
  416: '请求的数据范围不可用',
  417: '服务器无法满足 Expect 标头期望值',
  422: '请求语义错误',
  426: '服务器拒绝使用当前协议执行请求',
  429: '请求过于频繁',
  431: '请求头字段太大',
  451: '请求了非法资源',
  500: '接口链路调用发生错误',
  501: '服务器不支持该请求方法',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: '服务器不支持请求中所使用的 HTTP 协议版本',
  506: '服务器配置错误',
  507: '服务器配置错误',
  508: '服务器在处理请求时检测到无限循环',
  510: '客户端需要对请求扩展',
  511: '客户端需要进行身份验证',
};

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else {
        // 发送请求时出了点问题
        message.error(error.message || '请求错误，请重试');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    // (config: RequestOptions) => {
    //   // 拦截请求配置，进行个性化处理。
    //   const url = config?.url?.concat('?token = 123');
    //   return { ...config, url };
    // },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data, status, config } = response;

      const shouldThrowError =
        !(data instanceof Promise) && ![200, 'ok'].includes(data['code'] || status);

      if (shouldThrowError) {
        const error: any = new Error();
        const bizErrorInfo: BizErrorInfo = {
          errorCode: data['code'] || status || -9999,
          errorMessage: data['msg'] || codeMessage[status] || '请求错误，请重试',
          errorShowType: config['errorShowType'],
        };
        error.name = 'BizError';
        error.info = bizErrorInfo;
        throw error;
      }
      return response;
    },
  ],
};
