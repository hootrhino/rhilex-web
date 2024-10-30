export default {
  /**
   * button
   */
  'device.button.snmp': 'SNMP 對象列表',
  'device.button.sheet': '點位表配置',
  'device.button.registers': '查看暫存器組',
  'device.button.nonPolling': '停止刷新',
  'device.button.polling': '開始刷新',
  'device.button.import.sheet': '導入點位表',
  'device.button.export.sheet': '導出點位表',
  'device.button.update.bulk': '批量更新',
  'device.button.remove.bulk': '批量刪除',
  'device.button.new.sheet': '添加點位',

  /**
   * title
   */
  'device.title.group': '設備分組',
  'device.title.list': '設備列表',
  'device.title.detail': '設備詳情',
  'device.title.new': '新建設備',
  'device.title.update': '編輯設備',
  'device.title.base': '基本配置',
  'device.title.modal.error.device': '設備異常訊息',
  'device.title.modal.error.sheet': '點位異常訊息',
  'device.title.sheet': '點位表配置',
  'device.title.oid': '對象列表',
  'device.title.sheetList': '{name} - 點位表配置',
  'device.title.snmpOidList': '{name} - 對象列表',
  'device.title.registers': '暫存器組詳情',

  /**
   * modal
   */
  'device.modal.title.remove': '確定要刪除此設備？',
  'device.modal.title.remove.batchOid': '批量刪除對象',
  'device.modal.title.remove.oid': '確定要刪除此對象？',
  'device.modal.title.remove.sheet': '確定要刪除此點位？',
  'device.modal.title.remove.batchSheet': '批量刪除點位',
  'device.modal.title.group.new': '新建設備分組',
  'device.modal.title.group.edit': '編輯分組',
  'device.modal.title.group.remove': '確定要刪除此分組？',
  'device.modal.title.upload.confirm': '導入點位表',

  'device.modal.content.group.remove':
    '請確認該分組下無任何設備掛載後再執行刪除操作。若分組下有設備，則不允許刪除',
  'device.modal.content.remove.batchSheet': '此操作會一次性刪除多個點位，請謹慎操作',

  /**
   * form
   */

  // formList
  'device.form.title.group.port': '串口配置',
  'device.form.title.group.common': '通用配置',
  'device.form.title.group': '{type} 配置',
  'device.form.title.group.tencent': '騰訊雲物聯網平台接入配置',
  'device.form.title.group.uartRW': '讀寫配置',

  // timeout
  'device.form.title.timeout.request': '請求超時',
  'device.form.title.timeout.connect': '連接超時',
  'device.form.title.timeout.idle': '心跳超時',
  'device.form.title.timeout.scan': '掃描超時',

  // frequency
  'device.form.title.frequency': '採集頻率',
  'device.form.title.frequency.scan': '掃描頻率',
  'device.form.title.frequency.request': '請求頻率',

  // other
  'device.form.title.mode': '工作模式',
  'device.form.title.uart': '系統串口',
  'device.form.title.host': '服務地址',
  'device.form.title.gid': '設備分組',
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
  'device.form.title.autoScan': '自動掃描',
  'device.form.title.enableGroup': '併發採集',
  'device.form.title.target.device': '目標設備',
  'device.form.title.target.port': '目標端口',
  'device.form.title.transport': '傳輸協議',
  'device.form.title.community': '社區名稱',
  'device.form.title.version': '協議版本',

  // group
  'device.form.title.group.name': '分組名稱',

  // modbus
  'device.form.title.slaverId': '從設備地址',
  'device.form.title.tag': '標籤',
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

  // bacnet
  'device.form.title.id': '設備 ID',
  'device.form.title.cidr': '網路',
  'device.form.title.mode.broadcast': '廣播模式',
  'device.form.title.localPort': '本地埠',
  'device.form.title.vendorId': '廠商 ID',
  'device.form.title.objectType': '對象類型',
  'device.form.title.objectId': '對象 ID',

  // tencent
  'device.form.title.productId': '產品 ID',
  'device.form.title.deviceName': '設備名稱',
  'device.form.title.devicePsk': '設備秘鑰',

  // uart
  'device.form.title.rwConfig.autoRequest': '自動讀取',
  'device.form.title.readFormat': '讀取格式',
  'device.form.title.timeSlice': '超時時間',

  // MBus
  'device.form.title.dataLength': '數據長度',
  'device.form.title.manufacturer': '製造商',

  // ithings
  'device.form.title.serverEndpoint': '服務接入地址',

  // user protocol
  'device.form.title.command': '自訂指令',

  /**
   * tooltip
   */
  'device.tooltip.group.edit': '重命名分組',
  'device.tooltip.group.remove': '刪除分組',
  'device.tooltip.copy': '以當前行為模板新建一行數據',

  /**
   * placeholder
   */
  'device.form.placeholder.group.name': '請輸入分組名稱',
  'device.form.placeholder.slaverId': '請輸入從設備地址',
  'device.form.placeholder.tag': '請輸入標籤',
  'device.form.placeholder.func': '請選擇 Modbus 功能',
  'device.form.placeholder.dataType': '請選擇數據類型和字節序',
  'device.form.placeholder.address': '請輸入起始地址',
  'device.form.placeholder.quantity': '請輸入讀取數量',
  'device.form.placeholder.weight': '請輸入權重係數',
  'device.form.placeholder.frequency': '請輸入採集頻率',
  'device.form.placeholder.siemensAddress': '請輸入地址',
  'device.form.placeholder.oid': '請輸入對象標識符',
  'device.form.placeholder.cidr': '請選擇網路',
  'device.form.placeholder.vendorId': '請輸入廠商 ID',
  'device.form.placeholder.id': '請輸入設備 ID',
  'device.form.placeholder.objectType': '請選擇對象類型',
  'device.form.placeholder.objectId': '請輸入對象 ID',
  'device.form.placeholder.dataLength': '請輸入數據長度',
  'device.form.placeholder.manufacturer': '請輸入製造商',
  'device.form.placeholder.command': '請輸入指令',

  /**
   * rules
   */
  'device.form.rules.quantity': '讀取數量範圍在 1-256 之間',
  'device.form.rules.weight': '權重係數必須在 -0.0001 到 100000 範圍內',
  'device.form.rules.slaverId': '從設備地址 在 1-255 之間',
  'device.form.rules.id': '請輸入有效的設備 ID，範圍为 0-4194302',
  'device.form.rules.meterId.len': '請輸入有效的 12 位設備 ID',
  'device.form.rules.meterId.number': '設備 ID 只能包含數字，請輸入有效的 12 位設備 ID',
  'device.form.rules.bacnet.objectId': '請輸入有效的對象 ID，範圍为 0-4194303',
  'device.form.rules.command': '請輸入不超過 64 個字符的指令',

  /**
   * others
   */
  'device.tips.scroll': '橫向滾動查看更多',
  'device.message.error.new': '創建成功，但目前無法正常運作。請根據錯誤訊息 {msg} 及時修改配置參數',
  'device.unit.byte': '字節',
  'device.bigEndian': '大端',
  'device.littleEndian': '小端',
  'device.message.onlyOneEdit': '只能同時編輯一行',

  /**
   * Device type
   */
  'device.type.modbus.master': '通用 Modbus 協議數據採集主機網關',
  'device.type.modbus.slaver': '通用 Modbus 協議數據採集從機網關',
  'device.type.plc': 'SIEMENS SIMATIC S7 協議數據採集主機網關',
  'device.type.bacnet.ip': '通用 BACnet IP 協議數據採集主機網關',
  'device.type.bacnet.router': '通用 BACnet IP 協議數據採集從機網關',
  'device.type.tencent': '騰訊雲端物聯網平台',
  'device.type.ithings': '聯犀物聯網平台',
  'device.type.uartRW': '通用串口讀寫網關',
  'device.type.national': '國標 {protocol} 協議數據採集網關',
  'device.type.user': '通用自訂協議數據採集網關',
  'device.type.common': '通用 {type} 協議數據採集網關',

  /**
   * Modbus function
   */
  'device.modbus.func1': '01 讀線圈狀態',
  'device.modbus.func2': '02 讀離散輸入狀態',
  'device.modbus.func3': '03 讀保持寄存器',
  'device.modbus.func4': '04 讀輸入寄存器',

  /**
   * PLC model
   */
  'device.plc.model': '西門子 {model} 系列 PLC',

  /**
   * ReadFormat
   */
  'device.readFormat.raw': '原始位元組',
  'device.readFormat.hex': '十六進位',
  'device.readFormat.utf8': 'UTF8 字串',

  /**
   * Tab
   */
  'device.tab.coil': '线圈寄存器',
  'device.tab.discrete': '離散寄存器',
  'device.tab.holding': '保持寄存器',
  'device.tab.input': '輸入寄存器',

  /**
   * MBus Type
   */
  'device.mbus.type.heatMeter': '熱量表',
  'device.mbus.type.waterMeter': '水表',
  'device.mbus.type.gasMeter': '煤氣表',
  'device.mbus.type.elecMeter': '電表',
  'device.mbus.type.transparent': '透傳設備',
  'device.mbus.type.protocol': '協議轉換器',

  /**
   * BACnet objectType
   */
  'device.bacnet.objectType.ai': 'AI 類比輸入',

  /**
   * SZY2062016_MASTER MeterType
   */
  'device.meterType.command': '命令',
  'device.meterType.rainfall': '雨量參數',
  'device.meterType.waterLevel': '水位參數',
  'device.meterType.flowRate': '流量（水量）參數',
  'device.meterType.flowSpeed': '流速參數',
  'device.meterType.gatePosition': '閘位參數',
  'device.meterType.power': '功率參數',
  'device.meterType.airPressure': '氣壓參數',
  'device.meterType.windSpeed': '風速參數',
  'device.meterType.waterTemp': '水溫參數',
  'device.meterType.waterQuality': '水質參數',
  'device.meterType.soilMoisture': '土壤含水率參數',
  'device.meterType.evaporation': '蒸發量參數',
  'device.meterType.alarmStatus': '報警或狀態參數',
  'device.meterType.comprehensive': '綜合參數',
  'device.meterType.waterPressure': '水壓参数',
};
