export default {
  /**
   * button
   */
  'device.button.restartDevice': '重啓設備',
  'device.button.camera': '查看視頻',
  'device.button.snmp': 'SNMP 對象列表',
  'device.button.sheet': '點位表配置',
  'device.button.nonPolling': '停止刷新',
  'device.button.polling': '開始刷新',
  'device.button.import.sheet': '導入點位表',
  'device.button.export.sheet': '導出點位表',
  'device.button.update.batch': '批量更新',
  'device.button.remove.batch': '批量刪除',
  'device.button.control': '設備控制枱',
  'device.button.configWebhook': '快速接入網關',
  'device.button.clearWebhook': '清除所有配置',
  'device.button.scan': '掃描設備',
  'device.button.reload': '刷新',
  'device.button.export.oid': '導出對象列表',
  'device.button.new.object': '添加對象',

  /**
   * title
   */
  'device.title.group': '設備分組',
  'device.title.list': '設備列表',
  'device.title.detail': '設備詳情',
  'device.title.new': '新建設備',
  'device.title.update': '編輯設備',
  'device.title.base': '基本配置',
  'device.title.modal.error.device': '設備異常信息',
  'device.title.modal.error.sheet': '點位異常信息',
  'device.title.sheet': '點位表配置',
  'device.title.device': '設備',
  'device.title.subDevice': '設備 {name} - 子設備列表',

  /**
   * modal
   */
  'device.modal.title.remove': '確定要刪除此設備？',
  'device.modal.title.remove.oid': '批量刪除對象',
  'device.modal.title.remove.sheet': '確定要刪除此點位？',
  'device.modal.title.remove.batchSheet': '批量刪除點位',
  'device.modal.title.camera': '查看視頻',
  'device.modal.title.group.new': '新建分組',
  'device.modal.title.group.edit': '編輯分組',
  'device.modal.title.group.remove': '確定要刪除此分組？',
  'device.modal.title.upload': '你應當確保上傳的點位表必須遵守一定表頭格式，例如：',

  'device.modal.content.group.remove':
    '分組中包含 {count} 個子項目，刪除後將被移入默認分組中，請謹慎處理。',
  'device.modal.content.restart': '重啓過程會短暫（5-10秒）斷開資源連接，需謹慎操作',
  'device.modal.content.camera.loading': '視頻正在加載...',
  'device.modal.content.camera':
    '此模式下流媒体被中转到第三方地址，当前{inputAddr}已经成功推送到{outputAddr}，请在对应的平台上查看或者播放。',
  'device.modal.content.upload': '文件格式不正確可能會導致上傳失敗，你確定要上傳',
  'device.modal.content.remove.batchOid': '此操作會一次性刪除多個對象，需謹慎操作',

  /**
   * form
   */

  // formList
  'device.form.title.group.port': '串口配置',
  'device.form.title.group.tcp': 'TCP 配置',
  'device.form.title.group.common': '通用配置',
  'device.form.title.group.http': 'HTTP 配置',
  'device.form.title.group.snmp': 'SNMP 配置',

  // timeout
  'device.form.title.timeout.request': '請求超時',
  'device.form.title.timeout.connect': '連接超時',
  'device.form.title.timeout.idle': '心跳超時',
  'device.form.title.timeout.scan': '掃描超時',

  // frequency
  'device.form.title.frequency.coll': '採集頻率',
  'device.form.title.frequency.scan': '掃描頻率',
  'device.form.title.frequency.request': '請求頻率',

  // other
  'device.form.title.mode': '工作模式',
  'device.form.title.portUuid': '系統串口',
  'device.form.title.host': '服務地址',
  'device.form.title.port': '端口',
  'device.form.title.name': '設備名稱',
  'device.form.title.type': '設備類型',
  'device.form.title.gid': '設備分組',
  'device.form.title.state': '設備狀態',
  'device.form.title.retryTime': '重試次數',
  'device.form.title.autoRequest': '啓動輪詢',
  'device.form.title.enableOptimize': '批量採集',
  'device.form.title.maxRegNum': '最大點位數',
  'device.form.title.host.plc': 'PLC 地址',
  'device.form.title.host.tcp': '服務地址',
  'device.form.title.model': '型號',
  'device.form.title.rack': '機架號',
  'device.form.title.slot': '插槽號',
  'device.form.title.url': '請求地址',
  'device.form.title.inputMode': '輸入模式',
  'device.form.title.inputAddr': '視頻採集源',
  'device.form.title.outputMode': '輸出模式',
  'device.form.title.outputEncode': '輸出編碼',
  'device.form.title.outputAddr': '輸出地址',
  'device.form.title.playAddr': '外部播放地址',
  'device.form.title.autoScan': '自動掃描',
  'device.form.title.enableGroup': '併發採集',
  'device.form.title.target.device': '目標設備',
  'device.form.title.target.port': '目標端口',
  'device.form.title.transport': '傳輸協議',
  'device.form.title.community': '社區名稱',
  'device.form.title.version': '協議版本',
  'device.form.title.webHookPort': '監聽端口',

  // group
  'device.form.title.group.name': '分組名稱',

  // modbus
  'device.form.title.slaverId': '從設備地址',
  'device.form.title.tag': '數據標籤',
  'device.form.title.alias': '數據別名',
  'device.form.title.func': 'Modbus 功能',
  'device.form.title.dataType': '數據類型（字節序）',
  'device.form.title.address': '起始地址',
  'device.form.title.quantity': '讀取數量',
  'device.form.title.weight': '權重係數',
  'device.form.title.frequency': '採集頻率',
  'device.form.title.value': '最新值',
  'device.form.title.status': '點位狀態',
  'device.form.title.lastFetchTime': '採集時間',

  // plc
  'device.form.title.siemensAddress': '地址',

  // snmp
  'device.form.title.oid': '對象標識符',

  /**
   * tooltip
   */
  'device.tooltip.outputMode':
    '注意：因為傳輸格式原因，Jpeg Stream 模式下僅保存了圖像信息，沒有原始聲音',
  'device.tooltip.group.edit': '重命名分組',
  'device.tooltip.group.remove': '刪除分組',
  'device.tooltip.copy': '以當前行為模板新建一行數據',

  /**
   * placeholder
   */
  'device.form.placeholder.group.name': '請輸入分組名稱',
  'device.form.placeholder.tag': '請輸入數據標籤',
  'device.form.placeholder.alias': '請輸入數據別名',
  'device.form.placeholder.func': '請選擇 Modbus 功能',
  'device.form.placeholder.dataType': '請選擇數據類型和字節序',
  'device.form.placeholder.address': '請輸入起始地址',
  'device.form.placeholder.quantity': '請輸入讀取數量',
  'device.form.placeholder.weight': '請輸入權重係數',
  'device.form.placeholder.frequency': '請輸入採集頻率',
  'device.form.placeholder.siemensAddress': '請輸入地址',
  'device.form.placeholder.oid': '請輸入對象標識符',

  /**
   * rules
   */
  'device.form.rules.address': '起始地址範圍在 0-65535 之間',
  'device.form.rules.quantity': '讀取數量範圍在 1-256 之間',
  'device.form.rules.weight': '權重係數必須在 -0.0001 到 100000 範圍內',

  /**
   * others
   */
  'device.tips.scroll': '橫向滾動查看更多',
  'device.message.success.config': '配置成功',
  'device.message.success.clear': '清除成功',
  'device.message.error.new': '創建成功，但是暫時無法正常工作，請及時調整配置參數。錯誤信息：{msg}',
};
