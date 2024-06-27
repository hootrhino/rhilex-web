import button from './zh-TW/button';
import component from './zh-TW/component';
import status from './zh-TW/status';
// pages
import appStack from './zh-TW/appStack';
import com from './zh-TW/com';
import dashboard from './zh-TW/dashboard';
import DataRepository from './zh-TW/DataRepository';
import device from './zh-TW/device';
import extend from './zh-TW/extend';
import inend from './zh-TW/inend';
import notification from './zh-TW/notification';
import outend from './zh-TW/outend';
import plugin from './zh-TW/plugin';
import ruleConfig from './zh-TW/ruleConfig';
import schemaMgt from './zh-TW/schema';
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
  'message.success.reboot': '重新啟動成功',
  /**
   * placeholder
   */
  'placeholder.input': '請輸入{text}',
  'placeholder.select': '請選擇{text}',
  'placeholder.desc': '請輸入備註',
  /**
   * table
   */
  'table.index': '序號',
  'table.desc': '備註',
  'table.option': '操作',
  /**
   * login
   */
  'login.title': '登入頁',
  /**
   * page
   */
  'page.404.subTitle': '對不起，你訪問的頁面不存在',
  'page.copyright': 'RHILEX TEAM 2023-2033。所有權利保留。',
  /**
   * form
   */
  'form.title.username': '用户名',
  'form.title.password': '密碼',
  'form.placeholder.username': '請輸入用户名',
  'form.placeholder.password': '請輸入密碼',
  'form.rules.name': '請輸入4-64個字符，支持中文、字母、數字或下劃線',
  'form.rules.port': '端口的值應在 0 到 65535 之間',
  'form.rules.address': '起始地址的值應在 0 到 65535 之間',
  'form.rules.vendorId': '廠商 ID 應在 0 到 65535 之間',
  'form.rules.ip': 'IP 地址格式不正確',
  'form.rules.netmask': '子網掩碼格式不正確',
  'form.rules.gateway': '網關格式不正確',
  'form.rules.default': '格式不正確',
  'form.rules.uartTimeout': '讀寫超時必須在 30-1000ms 之間',
  /**
   * modal
   */
  'modal.title.confirm': '確定執行此操作嗎？',
  'modal.title.forget': '忘記密碼？',
  'modal.content.forget': '如果忘記密碼，請按照當前設備的手冊進行重置。',
  'modal.content.logout': '確定要退出登錄嗎？',
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
  'menu.dataRepository': '資料中心',
  'menu.inend': '南向資源',
  'menu.source.list': '資源列表',
  'menu.source.new': '新建資源',
  'menu.source.update': '編輯資源',
  'menu.outend': '北向資源',
  'menu.appStack': '輕量應用',
  'menu.appStack.list': '應用列表',
  'menu.appStack.new': '新建應用',
  'menu.appStack.update': '編輯應用',
  'menu.plugin': '增強插件',
  'menu.plugin.list': '插件列表',
  'menu.system': '系統設定',
  'menu.notification': '內部通知',
  'menu.rule.list': '規則配置',
  'menu.rule.new': '新建規則配置',
  'menu.rule.update': '編輯規則配置',
  'menu.cm': '通訊模組',
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
