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
  'message.success.upload': 'Uploaded successfully',
  'message.success.remove': 'Deleted successfully',
  'message.success.start': '启动成功',
  'message.success.stop': '停止成功',
  'message.success.update': 'Updated successfully',
  'message.success.new': '新建成功',
  'message.success.login': 'Login Successfully',
  'message.success.scan': 'Scanned successfully',
  'message.success.restart': 'Restarted successfully',
  'message.success.reboot': 'Rebooted successfully',
  /**
   * placeholder
   */
  'placeholder.input': 'Please enter a {text}',
  'placeholder.select': 'Please select a {text}',
  'placeholder.desc': 'Please enter a description',
  /**
   * table
   */
  'table.index': 'NO.',
  'table.desc': 'Description',
  'table.option': 'Action',
  /**
   * login
   */
  'login.title': 'Login Page',
  /**
   * page
   */
  'page.404.subTitle': 'Sorry, the page you visited does not exist',
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
  'menu.schema': 'Data Schema',
  'menu.dataCenter': 'Data Repository',
  'menu.inend': 'Input Resource',
  'menu.source.list': 'Resource List',
  'menu.source.new': 'New Resource',
  'menu.source.update': 'Edit Resource',
  'menu.outend': 'Output Resource',
  'menu.appStack': 'Micro Application',
  'menu.appStack.list': 'Application List',
  'menu.appStack.new': 'New Application',
  'menu.appStack.update': 'Edit Application',
  'menu.plugin': 'Plugin',
  'menu.plugin.list': 'Plugin List',
  'menu.system': 'System Settings',
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
