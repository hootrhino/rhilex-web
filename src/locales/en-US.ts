import button from './en-US/button';
import component from './en-US/component';
import status from './en-US/status';
// pages
import appStack from './en-US/appStack';
import dashboard from './en-US/dashboard';
import dataCenter from './en-US/dataCenter';
import device from './en-US/device';
import extend from './en-US/extend';
import inend from './en-US/inend';
import notifyLog from './en-US/notifyLog';
import outend from './en-US/outend';
import plugin from './en-US/plugin';
import portMgt from './en-US/portMgt';
import ruleConfig from './en-US/ruleConfig';
import schemaMgt from './en-US/schemaMgt';
import system from './en-US/system';

export default {
  /**
   * message
   */
  'message.success.upload': '上传成功',
  'message.success.remove': '删除成功',
  'message.success.start': '启动成功',
  'message.success.stop': '停止成功',
  'message.success.update': '更新成功',
  'message.success.new': '新建成功',
  'message.success.login': '登录成功',
  'message.success.scan': '扫描成功',
  'message.success.restart': '重启成功',
  /**
   * placeholder
   */
  'placeholder.input': '请输入{text}',
  'placeholder.select': '请选择{text}',
  'placeholder.desc': '请输入备注',
  /**
   * table
   */
  'table.index': 'Sequence Number',
  'table.desc': 'Description',
  'table.option': 'Action',
  /**
   * login
   */
  'login.title': 'Login Page',
  /**
   * page
   */
  'page.404.subTitle': 'Sorry, the page you visited does not exist.',
  'page.copyright': 'RHILEX TEAM 2023-2033. All rights reserved.',
  /**
   * form
   */
  'form.title.username': 'Username',
  'form.title.password': 'Password',
  'form.placeholder.username': '请输入用户名',
  'form.placeholder.password': '请输入密码',
  'form.rules.name': '请输入4-64个字符，支持中文、字母、数字或下划线',
  'form.rules.port': '端口的值应在 0 到 65535 之间',
  'form.rules.address': '起始地址的值应在 0 到 65535 之间',
  'form.rules.ip': 'IP 地址格式不正确',
  'form.rules.netmask': '子网掩码格式不正确',
  'form.rules.gateway': '网关格式不正确',
  'form.rules.cidr': 'CIDR 格式不正确',
  'form.rules.default': '格式不正确',
  'form.rules.timeout': '读写超时必须在 30-1000ms 之间',
  /**
   * modal
   */
  'modal.title.confirm': '确定执行此操作吗？',
  'modal.title.forget': '忘记密码？',
  'modal.content.forget': '如果忘记密码，请按照当前设备的手册进行重置。',
  'modal.content.logout': '确定要退出登录吗？',
  /**
   * menu
   */
  'menu.dashboard': 'Dashboard',
  'menu.device': 'Device Access',
  'menu.device.list': 'Device List',
  'menu.device.new': 'New Device',
  'menu.device.update': 'Edit Device',
  'menu.device.sheet': 'Register Sheet Configuration',
  'menu.device.objectList': 'SNMP OID Sheet',
  'menu.device.subDevice': 'Subdevice List',
  'menu.schema': 'Schema Model',
  'menu.dataCenter': 'Data Center',
  'menu.inend': 'Inend Resources',
  'menu.source.list': 'Resource List',
  'menu.source.new': 'New Resource',
  'menu.source.update': 'Edit Resource',
  'menu.outend': 'Outend Resources',
  'menu.appStack': 'Application',
  'menu.appStack.list': 'Application List',
  'menu.appStack.new': 'New Application',
  'menu.appStack.update': 'Edit Application',
  'menu.plugin': 'Plugin Management',
  'menu.plugin.list': 'Plugin List',
  'menu.port': 'Hardware Interface Settings',
  'menu.system': 'System Management',
  'menu.notifyLog': 'Site Log',
  'menu.rule.list': 'Rule Configuration',
  'menu.rule.new': 'New Rule Configuration',
  'menu.rule.update': 'Edit Rule Configuration',
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
  ...outend,
  ...inend,
  ...dataCenter,
};
