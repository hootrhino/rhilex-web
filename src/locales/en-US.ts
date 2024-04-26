import button from './en-US/button';
import component from './en-US/component';
import status from './en-US/status';
// pages
import appStack from './en-US/appStack';
import dashboard from './en-US/dashboard';
import device from './en-US/device';
import extend from './en-US/extend';
import inends from './en-US/inends';
import notifyLog from './en-US/notifyLog';
import outends from './en-US/outends';
import plugin from './en-US/plugin';
import portMgt from './en-US/portMgt';
import ruleConfig from './en-US/ruleConfig';
import schemaMgt from './en-US/schemaMgt';
import system from './en-US/system';

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
  'message.error.request': '请求错误，请重试',
  'message.error.timeout': '客户端请求超时',
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
  'page.copyright': 'RHILEX TEAM 2023-2033. All rights reserved.',
  'form.rules.name': '请输入4-64个字符，支持中文、字母、数字或下划线',
  'form.rules.port': '端口的值应在 0 到 65535 之间',
  'form.rules.address': '起始地址的值应在 0 到 65535 之间',
  'form.rules.ip': 'IP 地址格式不正确',
  'form.rules.netmask': '子网掩码格式不正确',
  'form.rules.gateway': '网关格式不正确',
  'form.rules.cidr': 'CIDR 格式不正确',
  'form.rules.default': '格式不正确',
  'menu.dashboard': '系统首页',
  'menu.device': '设备接入',
  'menu.device.list': '设备列表',
  'menu.device.new': '新建设备',
  'menu.device.update': '编辑设备',
  'menu.device.sheet': '点位表配置',
  'menu.device.objectList': 'SNMP 对象列表',
  'menu.device.subDevice': '子设备列表',
  'menu.schema': '数据模型',
  'menu.inends': '南向资源',
  'menu.source.list': '资源列表',
  'menu.source.new': '新建资源',
  'menu.source.update': '编辑资源',
  'menu.outends': '北向资源',
  'menu.appStack': '轻量应用',
  'menu.appStack.list': '应用列表',
  'menu.appStack.new': '新建应用',
  'menu.appStack.update': '编辑应用',
  'menu.plugin': '插件管理',
  'menu.plugin.list': '插件列表',
  'menu.port': '端口设置',
  'menu.system': '系统管理',
  'menu.notifyLog': '站内日志',
  'menu.rule.list': '规则配置',
  'menu.rule.new': '新建规则配置',
  'menu.rule.update': '编辑规则配置',
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
