import button from './zh-CN/button';
import component from './zh-CN/component';
import status from './zh-CN/status';
// pages
import appStack from './zh-CN/appStack';
import dashboard from './zh-CN/dashboard';
import device from './zh-CN/device';
import extend from './zh-CN/extend';
import inends from './zh-CN/inends';
import notifyLog from './zh-CN/notifyLog';
import outends from './zh-CN/outends';
import plugin from './zh-CN/plugin';
import portMgt from './zh-CN/portMgt';
import ruleConfig from './zh-CN/ruleConfig';
import schemaMgt from './zh-CN/schemaMgt';
import system from './zh-CN/system';

export default {
  'message.success.upload': '上传成功',
  'message.success.remove': '删除成功',
  'message.success.start': '启动成功',
  'message.success.stop': '停止成功',
  'message.success.update': '更新成功',
  'message.success.new': '新建成功',
  'message.success.login': '登录成功',
  'message.success.scan': '扫描成功',
  'message.success.restart': '重启成功',
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
  'page.404.subTitle': '抱歉，你访问的页面不存在',
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
  ...system,
  ...ruleConfig,
  ...outends,
  ...inends,
};
