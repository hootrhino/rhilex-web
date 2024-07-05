import button from './zh-CN/button';
import component from './zh-CN/component';
import status from './zh-CN/status';
// pages
import appStack from './zh-CN/appStack';
import com from './zh-CN/com';
import dashboard from './zh-CN/dashboard';
import DataRepository from './zh-CN/DataRepository';
import device from './zh-CN/device';
import extend from './zh-CN/extend';
import inend from './zh-CN/inend';
import notification from './zh-CN/notification';
import outend from './zh-CN/outend';
import plugin from './zh-CN/plugin';
import ruleConfig from './zh-CN/ruleConfig';
import schemaMgt from './zh-CN/schema';
import system from './zh-CN/system';

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
  'message.success.reboot': '重启成功',
  /**
   * placeholder
   */
  'placeholder.input': '请输入{text}',
  'placeholder.select': '请选择{text}',
  'placeholder.desc': '请输入备注',
  /**
   * table
   */
  'table.index': '序号',
  'table.desc': '备注',
  'table.option': '操作',
  /**
   * login
   */
  'login.title': '登录页',
  /**
   * page
   */
  'page.404.subTitle': '抱歉，你访问的页面不存在',
  /**
   * form
   */
  'form.title.username': '用户名',
  'form.title.password': '密码',
  'form.placeholder.username': '请输入用户名',
  'form.placeholder.password': '请输入密码',
  'form.rules.name': '请输入4-64个字符，支持中文、字母、数字或下划线',
  'form.rules.port': '端口的值应在 0 到 65535 之间',
  'form.rules.address': '起始地址的值应在 0 到 65535 之间',
  'form.rules.vendorId': '厂商 ID 应在 0 到 65535 之间',
  'form.rules.ip': 'IP 地址格式不正确',
  'form.rules.netmask': '子网掩码格式不正确',
  'form.rules.gateway': '网关格式不正确',
  'form.rules.default': '格式不正确',
  'form.rules.uartTimeout': '读写超时必须在 30-1000ms 之间',
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
  'menu.dashboard': '系统首页',
  'menu.device': '设备接入',
  'menu.device.list': '设备列表',
  'menu.device.new': '新建设备',
  'menu.device.update': '编辑设备',
  'menu.device.sheet': '点位表配置',
  'menu.device.objectList': 'SNMP 对象列表',
  'menu.device.subDevice': '子设备列表',
  'menu.schema': '数据模型',
  'menu.dataRepository': '数据中心',
  'menu.inend': '南向资源',
  'menu.source.list': '资源列表',
  'menu.source.new': '新建资源',
  'menu.source.update': '编辑资源',
  'menu.outend': '北向资源',
  'menu.appStack': '轻量应用',
  'menu.appStack.list': '应用列表',
  'menu.appStack.new': '新建应用',
  'menu.appStack.update': '编辑应用',
  'menu.plugin': '增强插件',
  'menu.plugin.list': '插件列表',
  'menu.system': '系统设置',
  'menu.notification': '内部通知',
  'menu.rule.list': '规则配置',
  'menu.rule.new': '新建规则配置',
  'menu.rule.update': '编辑规则配置',
  'menu.cm': '通信模组',
  ...component,
  ...button,
  ...status,
  ...dashboard,
  ...device,
  ...notification,
  ...appStack,
  ...extend,
  ...plugin,
  ...schemaMgt,
  ...system,
  ...ruleConfig,
  ...outend,
  ...inend,
  ...DataRepository,
  ...com,
};
