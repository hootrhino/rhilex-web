import button from './zh-CN/button';
import component from './zh-CN/component';
import status from './zh-CN/status';
// pages
import appStack from './zh-CN/appStack';
import dashboard from './zh-CN/dashboard';
import device from './zh-CN/device';
import extend from './zh-CN/extend';
import notifyLog from './zh-CN/notifyLog';
import plugin from './zh-CN/plugin';
import portMgt from './zh-CN/portMgt';
import schemaMgt from './zh-CN/schemaMgt';

export default {
  'message.success.upload': '上传成功',
  'message.success.remove': '删除成功',
  'message.success.start': '启动成功',
  'message.success.stop': '停止成功',
  'message.success.update': '更新成功',
  'message.success.new': '新建成功',
  'message.success.login': '登录成功',
  'message.success.scan': '扫描成功',
  'placeholder.input': '请输入',
  'placeholder.select': '请选择',
  'placeholder.desc': '请输入备注',
  'table.index': '序号',
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
  ...plugin,
  ...portMgt,
  ...schemaMgt,
};
