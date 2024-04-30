import button from './zh-TW/button';
import component from './zh-TW/component';
import status from './zh-TW/status';
// pages
import appStack from './zh-TW/appStack';
import dashboard from './zh-TW/dashboard';
import device from './zh-TW/device';
import extend from './zh-TW/extend';
import inend from './zh-TW/inend';
import notifyLog from './zh-TW/notifyLog';
import outend from './zh-TW/outend';
import plugin from './zh-TW/plugin';
import portMgt from './zh-TW/portMgt';
import ruleConfig from './zh-TW/ruleConfig';
import schemaMgt from './zh-TW/schemaMgt';
import system from './zh-TW/system';

export default {
  /**
   * message
   */
  'message.success.upload': '上傳成功',
  'message.success.remove': '刪除成功',
  'message.success.start': '啟動成功',
  'message.success.stop': '停止成功',
  'message.success.update': '更新成功',
  'message.success.new': '新建成功',
  'message.success.login': '登入成功',
  'message.success.scan': '掃描成功',
  'message.success.restart': '重新啟動成功',
  'message.error.request': '請求錯誤，請重試',
  'message.error.timeout': '客戶端請求超時',
  /**
   * placeholder
   */
  'placeholder.input': '請輸入',
  'placeholder.select': '請選擇',
  'placeholder.desc': '請輸入備註',
  /**
   * table
   */
  'table.index': '序號',
  'table.desc': '備註',
  'table.option': '操作',
  /**
   * login & logout
   */
  'login.title': '登入頁',
  'login.username.label': '用戶名',
  'login.username.placeholder': '請輸入用戶名',
  'login.password.label': '密碼',
  'login.password.placeholder': '請輸入密碼',
  'login.modal.title': '忘記密碼？',
  'login.modal.content': '如果忘記密碼，請按照當前設備的手冊進行重置。',
  'logout.modal.title': '提示',
  'logout.modal.content': '確定要退出登入嗎？',
  /**
   * page
   */
  'page.404.subTitle': '對不起，你訪問的頁面不存在',
  'page.copyright': 'RHILEX TEAM 2023-2033。所有權利保留。',
  /**
   * form
   */
  'form.rules.name': '请输入4-64个字符，支持中文、字母、数字或下划线',
  'form.rules.port': '端口的值应在 0 到 65535 之间',
  'form.rules.address': '起始地址的值应在 0 到 65535 之间',
  'form.rules.ip': 'IP 地址格式不正确',
  'form.rules.netmask': '子网掩码格式不正确',
  'form.rules.gateway': '网关格式不正确',
  'form.rules.cidr': 'CIDR 格式不正确',
  'form.rules.default': '格式不正确',
  /**
   * modal
   */
  'modal.title.confirm': '確定執行此操作嗎？',
  /**
   * menu
   */
  'menu.dashboard': '系統首頁',
  'menu.device': '設備接入',
  'menu.device.list': '設備列表',
  'menu.device.new': '新建設備',
  'menu.device.update': '編輯設備',
  'menu.device.sheet': '点位表配置',
  'menu.device.objectList': 'SNMP 對象列表',
  'menu.device.subDevice': '子設備列表',
  'menu.schema': '數據模型',
  'menu.inend': '南向資源',
  'menu.source.list': '資源列表',
  'menu.source.new': '新建資源',
  'menu.source.update': '編輯資源',
  'menu.outend': '北向資源',
  'menu.appStack': '輕量應用',
  'menu.appStack.list': '應用列表',
  'menu.appStack.new': '新建應用',
  'menu.appStack.update': '編輯應用',
  'menu.plugin': '插件管理',
  'menu.plugin.list': '插件列表',
  'menu.port': '端口設置',
  'menu.system': '系統管理',
  'menu.notifyLog': '站內日誌',
  'menu.rule.list': '規則配置',
  'menu.rule.new': '新建規則配置',
  'menu.rule.update': '編輯規則配置',
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
};
