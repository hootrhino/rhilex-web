import button from './zh-CN/button';
import component from './zh-CN/component';
import status from './zh-CN/status';
// pages
import appStack from './zh-CN/appStack';
import dashboard from './zh-CN/dashboard';
import device from './zh-CN/device';
import notifyLog from './zh-CN/notifyLog';

export default {
  'message.success.upload': '上传成功',
  'message.success.delete': '删除成功',
  'message.success.start': '启动成功',
  'message.success.stop': '停止成功',
  'message.success.update': '更新成功',
  'message.success.new': '新建成功',
  'message.success.login': '登录成功',
  'placeholder.input': '请输入',
  'placeholder.select': '请选择',
  'table.desc': '备注',
  'table.option': '操作',
  ...component,
  ...button,
  ...status,
  ...dashboard,
  ...device,
  ...notifyLog,
  ...appStack,
};
