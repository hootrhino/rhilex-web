export default {
  /**
   * button
   */
  'device.button.camera': '查看視頻',
  'device.button.snmp': 'SNMP 對象列表',
  'device.button.sheet': '點位表配置',
  'device.button.registers': '查看暫存器組',
  'device.button.nonPolling': '停止刷新',
  'device.button.polling': '開始刷新',
  'device.button.import.sheet': '導入點位表',
  'device.button.export.sheet': '導出點位表',
  'device.button.update.bulk': '批量更新',
  'device.button.remove.bulk': '批量刪除',
  'device.button.control': '設備控制枱',
  'device.button.configWebhook': '快速接入網關',
  'device.button.clearWebhook': '清除所有配置',
  'device.button.scan': '掃描設備',
  'device.button.refresh': '刷新',
  'device.button.export.oid': '導出對象列表',
  'device.button.import.oid': '導入對象列表',
  'device.button.new.object': '添加對象',
  'device.button.new.sheet': '添加點位',

  /**
   * title
   */
  'device.title.group': '設備分組',
  'device.title.list': '設備列表',
  'device.title.detail': '設備詳情',
  // 'device.title.detail.smartHome': '{name} 設備詳情',
  'device.title.new': '新建設備',
  'device.title.update': '編輯設備',
  'device.title.base': '基本配置',
  'device.title.modal.error.device': '設備異常訊息',
  'device.title.modal.error.sheet': '點位異常訊息',
  'device.title.modal.error.oid': '對象異常訊息',
  'device.title.sheet': '點位表配置',
  'device.title.oid': 'SNMP 對象列表',
  'device.title.subDevice': '{name} - 子設備列表',
  'device.title.sheetList': '{name} - 點位表配置',
  'device.title.oidList': '設備 {name} - SNMP 對象列表',
  'device.title.smartHome.detail.base': '設備基本訊息',
  'device.title.smartHome.detail.status': '設備狀態訊息',
  'device.title.registers': '暫存器組詳情',

  /**
   * modal
   */
  'device.modal.title.remove': '確定要刪除此設備？',
  'device.modal.title.remove.batchOid': '批量刪除對象',
  'device.modal.title.remove.oid': '確定要刪除此對象？',
  'device.modal.title.remove.sheet': '確定要刪除此點位？',
  'device.modal.title.remove.batchSheet': '批量刪除點位',
  'device.modal.title.camera': '查看視頻',
  'device.modal.title.group.new': '新建設備分組',
  'device.modal.title.group.edit': '編輯分組',
  'device.modal.title.group.remove': '確定要刪除此分組？',
  'device.modal.title.upload.confirm': '導入點位表',
  'device.modal.title.upload.confirm.oid': '導入對象列表',

  'device.modal.content.group.remove':
    '請確認該分組下無任何設備掛載後再執行刪除操作。若分組下有設備，則不允許刪除',
  'device.modal.content.restart': '重啓過程會短暫（5-10秒）斷開資源連接，請謹慎操作',
  'device.modal.content.camera.loading': '視頻正在加載...',
  'device.modal.content.camera':
    '此模式下流媒体被中转到第三方地址，当前{inputAddr}已经成功推送到{outputAddr}，请在对应的平台上查看或者播放。',
  'device.modal.content.remove.batchOid': '此操作會一次性刪除多個對象，請謹慎操作',
  'device.modal.content.remove.batchSheet': '此操作會一次性刪除多個點位，請謹慎操作',

  /**
   * form
   */

  // formList
  'device.form.title.group.port': '串口配置',
  'device.form.title.group.tcp': 'TCP 配置',
  'device.form.title.group.common': '通用配置',
  'device.form.title.group.http': 'HTTP 配置',
  'device.form.title.group.snmp': 'SNMP 配置',
  'device.form.title.group.smartHome': '智慧家庭配置',
  'device.form.title.group.bacnet': 'BACnet 配置',
  'device.form.title.group.tencent': '騰訊雲物聯網平台接入配置',
  'device.form.title.group.uartRW': '讀寫配置',

  // timeout
  'device.form.title.timeout.request': '請求超時',
  'device.form.title.timeout.connect': '連接超時',
  'device.form.title.timeout.idle': '心跳超時',
  'device.form.title.timeout.scan': '掃描超時',
  'device.form.title.timeout.uart': '讀寫超時',

  // frequency
  'device.form.title.frequency': '採集頻率',
  'device.form.title.frequency.scan': '掃描頻率',
  'device.form.title.frequency.request': '請求頻率',

  // other
  'device.form.title.mode': '工作模式',
  'device.form.title.portUuid': '系統串口',
  'device.form.title.host': '服務地址',
  'device.form.title.port': '端口',
  'device.form.title.name': '名稱',
  'device.form.title.type': '類型',
  'device.form.title.gid': '設備分組',
  'device.form.title.state': '狀態',
  'device.form.title.retryTime': '最大容錯次數',
  'device.form.title.autoRequest': '啓動輪詢',
  'device.form.title.enableOptimize': '優化採集',
  'device.form.title.enableBatchRequest': '批量採集',
  'device.form.title.maxRegNum': '最大點位數',
  'device.form.title.host.plc': 'PLC 地址',
  'device.form.title.host.tcp': '服務地址',
  'device.form.title.model': '設備型號',
  'device.form.title.model.plc': 'PLC 型號',
  'device.form.title.rack': '架位',
  'device.form.title.slot': '槽位',
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
  'device.form.title.tag': '標籤',
  'device.form.title.alias': '別名',
  'device.form.title.func': '功能碼',
  'device.form.title.dataType': '數據類型（字節序）',
  'device.form.title.address': '起始地址',
  'device.form.title.quantity': '讀取數量',
  'device.form.title.weight': '權重係數',
  'device.form.title.value': '最新值',
  'device.form.title.status': '點位狀態',
  'device.form.title.lastFetchTime': '採集時間',

  // plc
  'device.form.title.siemensAddress': '地址',

  // snmp
  'device.form.title.oid': '對象標識符',

  // smartHome
  'device.form.title.id': '設備 ID',
  'device.form.title.ip': '設備 IP 地址',
  'device.form.title.mac': '設備 MAC 地址',
  'device.form.title.gen': '設備硬件版本號',
  'device.form.title.fwId': '設備固件版本 ID',
  'device.form.title.ver': '設備固件版本號',
  'device.form.title.app': '設備應用程序名稱',
  'device.form.title.authEn': '開啓認證功能',
  'device.form.title.authDomain': '設備認證域',
  'device.form.title.restartRequired': '重啓設備',
  'device.form.title.time': '設備當前時間',
  'device.form.title.unixtime': '設備 Unix 時間戳',
  'device.form.title.uptime': '設備運行時間',
  'device.form.title.ramSize': 'RAM 總大小',
  'device.form.title.ramFree': '可用 RAM 大小',
  'device.form.title.fsSize': '文件系統總大小',
  'device.form.title.fsFree': '文件系統可用大小',
  'device.form.title.cfgRev': '配置版本號',
  'device.form.title.kvsRev': '鍵值存儲版本號',
  'device.form.title.scheduleRev': '計劃任務版本號',
  'device.form.title.webhookRev': 'Webhook 版本號',
  'device.form.title.cidr': '網路',

  // bacnet
  'device.form.title.mode.broadcast': '廣播模式',
  'device.form.title.localPort': '本地埠',
  'device.form.title.vendorId': '廠商 ID',
  'device.form.title.objectType': '對象類型',
  'device.form.title.objectId': '對象 ID',

  // tencent
  'device.form.title.productId': '產品 ID',
  'device.form.title.deviceName': '設備名稱',
  'device.form.title.devicePsk': '設備秘鑰',
  'device.form.title.clientId': '客戶端 ID',

  // uart rw
  'device.form.title.rwConfig.autoRequest': '自動讀取',
  'device.form.title.readFormat': '讀取格式',
  'device.form.title.timeSlice': '超時時間',

  /**
   * tooltip
   */
  'device.tooltip.outputMode':
    '注意：因為傳輸格式原因，Jpeg Stream 模式下僅保存了圖像訊息，沒有原始聲音',
  'device.tooltip.group.edit': '重命名分組',
  'device.tooltip.group.remove': '刪除分組',
  'device.tooltip.copy': '以當前行為模板新建一行數據',
  'device.tooltip.uartTimeout':
    '此值表示串口讀取完整資料包的最佳週期。請謹慎設置，避免隨意更改。在修改之前，請確保理解此參數的具體含義。如需調整，建議設定值在 30-1000ms 之間',

  /**
   * placeholder
   */
  'device.form.placeholder.group.name': '請輸入分組名稱',
  'device.form.placeholder.slaverId': '請輸入從設備地址',
  'device.form.placeholder.tag': '請輸入標籤',
  'device.form.placeholder.alias': '請輸入別名',
  'device.form.placeholder.func': '請選擇 Modbus 功能',
  'device.form.placeholder.dataType': '請選擇數據類型和字節序',
  'device.form.placeholder.address': '請輸入起始地址',
  'device.form.placeholder.quantity': '請輸入讀取數量',
  'device.form.placeholder.weight': '請輸入權重係數',
  'device.form.placeholder.frequency': '請輸入採集頻率',
  'device.form.placeholder.siemensAddress': '請輸入地址',
  'device.form.placeholder.oid': '請輸入對象標識符',
  'device.form.placeholder.uartTimeout': '請輸入讀寫超時',
  'device.form.placeholder.cidr': '請選擇網路',
  'device.form.placeholder.vendorId': '請輸入廠商 ID',
  'device.form.placeholder.id': '請輸入設備 ID',
  'device.form.placeholder.objectType': '請選擇對象類型',
  'device.form.placeholder.objectId': '請輸入對象 ID',

  /**
   * rules
   */
  'device.form.rules.quantity': '讀取數量範圍在 1-256 之間',
  'device.form.rules.weight': '權重係數必須在 -0.0001 到 100000 範圍內',
  'device.form.rules.slaverId': '從設備地址 在 1-255 之間',
  'device.form.rules.id': '請輸入有效的設備 ID，範圍为 0-4194302',
  'device.form.rules.bacnet.objectId': '請輸入有效的對象 ID，範圍为 0-4194303',

  /**
   * others
   */
  'device.tips.scroll': '橫向滾動查看更多',
  'device.message.success.config': '配置成功',
  'device.message.success.clear': '清除成功',
  'device.message.error.new': '創建成功，但目前無法正常運作。請根據錯誤訊息 {msg} 及時修改配置參數',
  'device.unit.byte': '字節',
  'device.bigEndian': '大端',
  'device.littleEndian': '小端',

  /**
   * device type
   */
  'device.type.uart': '通用串口控制網關',
  'device.type.modbus.master': '通用 Modbus 主機網關',
  'device.type.modbus.slaver': '通用 Modbus 從機網關',
  'device.type.snmp': '通用 SNMP 協議採集網關',
  'device.type.plc': '通用西門子 S7 系列 PLC 採集網關',
  'device.type.http': '通用 HTTP 協議數據採集網關',
  'device.type.camera': '通用攝像機流處理網關',
  'device.type.smartHome': '全屋智能家居中心控制網關',
  'device.type.bacnet.ip': '通用 Bacnet IP 採集網關',
  'device.type.bacnet.router': '通用 Bacnet 路由網關',
  'device.type.tencent': '騰訊雲端物聯網平台網關接入',
  'device.type.uartRW': '通用串口讀寫網關',

  /**
   * modbus function
   */
  'device.modbus.func1': '01 讀線圈狀態',
  'device.modbus.func2': '02 讀離散輸入狀態',
  'device.modbus.func3': '03 讀保持寄存器',
  'device.modbus.func4': '04 讀輸入寄存器',

  /**
   * plc model
   */
  'device.plc.model': '西門子 {model} 系列 PLC',

  /**
   * inputMode
   */
  'device.camera.inputMode.rtsp': '遠程 RTSP 流地址',
  'device.camera.inputMode.local': '本地相機設備',

  /**
   * outputMode
   */
  'device.camera.outputMode.jpeg': '本地 Jpeg 流服務器',
  'device.camera.outputMode.stream': '遠程流媒體服務器',

  /**
   * outputEncode
   */
  'device.camera.outputEncode': '{type} 編碼',

  /**
   * ReadFormat
   */
  'device.readFormat.raw': '原始位元組',
  'device.readFormat.hex': '十六進位',
  'device.readFormat.utf8': 'UTF8 字串',

  /**
   * Tab
   */
  'device.tab.coils': '线圈寄存器',
  'device.tab.discrete': '離散寄存器',
  'device.tab.holding': '保持寄存器',
  'device.tab.input': '輸入寄存器',
};
