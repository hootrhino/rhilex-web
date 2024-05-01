export default {
  /**
   * table
   */
  'ruleConfig.table.title.name': '名稱',
  'ruleConfig.table.title.status': '狀態',

  /**
   * form
   */
  'ruleConfig.form.title.name': '規則名稱',
  'ruleConfig.form.title.actions': '規則回調',
  'ruleConfig.form.title.sourceType': '數據來源',
  'ruleConfig.form.title.fromSource': '輸入資源',
  'ruleConfig.form.title.testData': '輸入數據',
  'ruleConfig.form.title.output': '輸出結果',

  'ruleConfig.form.placeholder.name': '請輸入規則名稱',
  'ruleConfig.form.placeholder.testData': '請輸入數據',

  /**
   * title
   */
  'ruleConfig.title': '規則配置',
  'ruleConfig.title.new': '新建規則',
  'ruleConfig.title.edit': '編輯規則',
  'ruleConfig.title.detail': '規則詳情',
  'ruleConfig.title.log': '規則日誌',
  'ruleConfig.title.test': '測試腳本',
  'ruleConfig.title.device': '設備',
  'ruleConfig.title.source': '資源',
  'ruleConfig.title.deviceConfig': '設備 {title} - 規則配置',
  'ruleConfig.title.sourceConfig': '資源 {title} - 規則配置',
  'ruleConfig.title.tpl': '輸出數據的結構及其示例',

  /**
   * others
   */
  'ruleConfig.popconfirm.title.remove': '確定要刪除此規則？',
  'ruleConfig.popconfirm.title.reset': '重置可能會丟失數據，確定要重置嗎？',
  'ruleConfig.message.mqtt':
    'Mqtt 消息來自 Publish 方，而此處規則只做原始數據轉發，不對數據做任何更改，因此回調函數的參數就是原始的 Mqtt Message，其具體格式需要開發者自行決定。',
  'ruleConfig.message.iothub':
    '不同的 IoTHub 有不同的數據格式，而此處規則只做原始數據轉發，不對數據做任何更改，因此回調函數的參數就是原始的 IoTHub 協議 JSON，其具體格式可以參考對應的雲服務商文檔。',

  /**
   * inends
   */
  'ruleConfig.inend.event.connected': '設備上線事件',
  'ruleConfig.inend.event.disconnected': '設備離線事件',
  'ruleConfig.inend.event.up': '資源上線事件',
  'ruleConfig.inend.event.down': '資源離線事件',
  'ruleConfig.inend.link.ali': '阿里雲：',
  'ruleConfig.inend.link.tencent': '騰訊雲：',
  'ruleConfig.inend.link.w3c': 'W3C 規範：',
};
