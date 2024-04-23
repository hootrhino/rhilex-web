import button from './zh-TW/button';
import component from './zh-TW/component';
import status from './zh-TW/status';
// pages
import appStack from './zh-TW/appStack';
import dashboard from './zh-TW/dashboard';
import device from './zh-TW/device';
import notifyLog from './zh-TW/notifyLog';

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
