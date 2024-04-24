import button from './en-US/button';
import component from './en-US/component';
import status from './en-US/status';
// pages
import appStack from './en-US/appStack';
import dashboard from './en-US/dashboard';
import device from './en-US/device';
import extend from './en-US/extend';
import notifyLog from './en-US/notifyLog';

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
  'tab.title': '登录页',
  'login.username.label': '用户名',
  'login.username.placeholder': '请输入用户名',
  'login.password.label': '密码',
  'login.password.placeholder': '请输入密码',
  'login.modal.title': '忘记密码？',
  'login.modal.content': '如果忘记密码，请按照当前设备的手册进行重置。',
  ...component,
  ...button,
  ...status,
  ...dashboard,
  ...device,
  ...notifyLog,
  ...appStack,
  ...extend,
};
