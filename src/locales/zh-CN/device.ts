export default {
  /**
   * button
   */
  'device.button.snmp': 'SNMP 对象列表',
  'device.button.sheet': '点位表配置',
  'device.button.registers': '查看寄存器组',
  'device.button.nonPolling': '停止刷新',
  'device.button.polling': '开始刷新',
  'device.button.import.sheet': '导入点位表',
  'device.button.export.sheet': '导出点位表',
  'device.button.update.bulk': '批量更新',
  'device.button.remove.bulk': '批量删除',
  'device.button.new.sheet': '添加点位',

  /**
   * title
   */
  'device.title.group': '设备分组',
  'device.title.list': '设备列表',
  'device.title.detail': '设备详情',
  'device.title.new': '新建设备',
  'device.title.update': '编辑设备',
  'device.title.base': '基本配置',
  'device.title.modal.error.device': '设备异常信息',
  'device.title.modal.error.sheet': '点位异常信息',
  'device.title.sheet': '点位表配置',
  'device.title.sheetList': '{name} - 点位表配置',
  'device.title.registers': '寄存器组详情',

  /**
   * modal
   */
  'device.modal.title.remove': '确定要删除此设备？',
  'device.modal.title.remove.batchOid': '批量删除对象',
  'device.modal.title.remove.oid': '确定要删除此对象？',
  'device.modal.title.remove.sheet': '确定要删除此点位？',
  'device.modal.title.remove.batchSheet': '批量删除点位',
  'device.modal.title.group.new': '新建设备分组',
  'device.modal.title.group.edit': '编辑分组',
  'device.modal.title.group.remove': '确定要删除此分组？',
  'device.modal.title.upload.confirm': '导入点位表',

  'device.modal.content.group.remove':
    '请确认该分组下无任何设备挂载后再执行删除操作。若分组下有设备，则不允许删除',
  'device.modal.content.restart': '重启过程会短暂（5-10秒）断开资源连接，请谨慎操作',
  'device.modal.content.remove.batchSheet': '此操作会一次性删除多个点位，请谨慎操作',

  /**
   * form
   */

  // formList
  'device.form.title.group.port': '串口配置',
  'device.form.title.group.tcp': 'TCP 配置',
  'device.form.title.group.common': '通用配置',
  'device.form.title.group.http': 'HTTP 配置',
  'device.form.title.group.snmp': 'SNMP 配置',
  'device.form.title.group.bacnet': 'BACnet 配置',
  'device.form.title.group.tencent': '腾讯云物联网平台接入配置',
  'device.form.title.group.uartRW': '读写配置',

  // timeout
  'device.form.title.timeout.request': '请求超时',
  'device.form.title.timeout.connect': '连接超时',
  'device.form.title.timeout.idle': '心跳超时',
  'device.form.title.timeout.scan': '扫描超时',
  'device.form.title.timeout.uart': '读写超时',

  // frequency
  'device.form.title.frequency': '采集频率',
  'device.form.title.frequency.scan': '扫描频率',
  'device.form.title.frequency.request': '请求频率',

  // other
  'device.form.title.mode': '工作模式',
  'device.form.title.portUuid': '系统串口',
  'device.form.title.host': '服务地址',
  'device.form.title.gid': '设备分组',
  'device.form.title.retryTime': '最大容错次数',
  'device.form.title.autoRequest': '启动轮询',
  'device.form.title.enableOptimize': '优化采集',
  'device.form.title.enableBatchRequest': '批量采集',
  'device.form.title.maxRegNum': '最大点位数',
  'device.form.title.host.plc': 'PLC 地址',
  'device.form.title.host.tcp': '服务地址',
  'device.form.title.model': '设备型号',
  'device.form.title.model.plc': 'PLC 型号',
  'device.form.title.rack': '架位',
  'device.form.title.slot': '槽位',
  'device.form.title.url': '请求地址',
  'device.form.title.autoScan': '自动扫描',
  'device.form.title.enableGroup': '并发采集',
  'device.form.title.target.device': '目标设备',
  'device.form.title.target.port': '目标端口',
  'device.form.title.transport': '传输协议',
  'device.form.title.community': '社区名称',
  'device.form.title.version': '协议版本',

  // group
  'device.form.title.group.name': '分组名称',

  // modbus
  'device.form.title.slaverId': '从设备地址',
  'device.form.title.tag': '标签',
  'device.form.title.func': '功能码',
  'device.form.title.dataType': '数据类型（字节序）',
  'device.form.title.address': '起始地址',
  'device.form.title.quantity': '读取数量',
  'device.form.title.weight': '权重系数',
  'device.form.title.value': '最新值',
  'device.form.title.status': '点位状态',
  'device.form.title.lastFetchTime': '采集时间',

  // plc
  'device.form.title.siemensAddress': '地址',

  // snmp
  'device.form.title.oid': '对象标识符',

  // bacnet
  'device.form.title.id': '设备 ID',
  'device.form.title.cidr': '网络',
  'device.form.title.mode.broadcast': '广播模式',
  'device.form.title.localPort': '本地端口',
  'device.form.title.vendorId': '厂商 ID',
  'device.form.title.objectType': '对象类型',
  'device.form.title.objectId': '对象 ID',

  // tencent
  'device.form.title.productId': '产品 ID',
  'device.form.title.deviceName': '设备名称',
  'device.form.title.devicePsk': '设备秘钥',

  // uart rw
  'device.form.title.rwConfig.autoRequest': '自动读取',
  'device.form.title.readFormat': '读取格式',
  'device.form.title.timeSlice': '超时时间',

  // MBus
  'device.form.title.dataLength': '数据长度',
  'device.form.title.manufacturer': '制造商',

  /**
   * tooltip
   */
  'device.tooltip.group.edit': '重命名分组',
  'device.tooltip.group.remove': '删除分组',
  'device.tooltip.copy': '以当前行为模板新建一行数据',
  'device.tooltip.uartTimeout':
    '此值表示串口读取完整数据包的最佳周期。请谨慎设置，避免随意更改。在修改前，请确保理解此参数的具体含义。如需调整，建议设置值在 30-1000ms 之间',

  /**
   * placeholder
   */
  'device.form.placeholder.group.name': '请输入分组名称',
  'device.form.placeholder.slaverId': '请输入从设备地址',
  'device.form.placeholder.tag': '请输入标签',
  'device.form.placeholder.func': '请选择 Modbus 功能',
  'device.form.placeholder.dataType': '请选择数据类型和字节序',
  'device.form.placeholder.address': '请输入起始地址',
  'device.form.placeholder.quantity': '请输入读取数量',
  'device.form.placeholder.weight': '请输入权重系数',
  'device.form.placeholder.frequency': '请输入采集频率',
  'device.form.placeholder.siemensAddress': '请输入地址',
  'device.form.placeholder.oid': '请输入对象标识符',
  'device.form.placeholder.uartTimeout': '请输入读写超时',
  'device.form.placeholder.cidr': '请选择网络',
  'device.form.placeholder.vendorId': '请输入厂商 ID',
  'device.form.placeholder.id': '请输入设备 ID',
  'device.form.placeholder.objectType': '请选择对象类型',
  'device.form.placeholder.objectId': '请输入对象 ID',
  'device.form.placeholder.dataLength': '请输入数据长度',
  'device.form.placeholder.manufacturer': '请输入制造商',

  /**
   * rules
   */
  'device.form.rules.quantity': '读取数量范围在 1-256 之间',
  'device.form.rules.weight': '权重系数必须在 -0.0001 到 100000 范围内',
  'device.form.rules.slaverId': '从设备地址 在 1-255 之间',
  'device.form.rules.id': '请输入有效的设备 ID，范围为 0-4194302',
  'device.form.rules.bacnet.objectId': '请输入有效的对象 ID，范围为 0-4194303',

  /**
   * others
   */
  'device.tips.scroll': '横向滚动查看更多',
  'device.message.error.new': '创建成功，但目前无法正常运行。请根据错误信息 {msg} 及时修改配置参数',
  'device.unit.byte': '字节',
  'device.bigEndian': '大端',
  'device.littleEndian': '小端',

  /**
   * device type
   */
  'device.type.uart': '通用串口控制网关',
  'device.type.modbus.master': '通用 Modbus 主机网关',
  'device.type.modbus.slaver': '通用 Modbus 从机网关',
  'device.type.snmp': '通用 SNMP 协议采集网关',
  'device.type.plc': '通用西门子 S7 系列 PLC 采集网关',
  'device.type.http': '通用 HTTP 协议数据采集网关',
  'device.type.bacnet.ip': '通用 BACnet IP 主机网关',
  'device.type.bacnet.router': '通用 BACnet IP 从机网关',
  'device.type.tencent': '腾讯云物联网平台网关接入',
  'device.type.uartRW': '通用串口读写网关',
  'device.type.mbus': '通用 M-Bus 数据采集网关',

  /**
   * modbus function
   */
  'device.modbus.func1': '01 读线圈状态',
  'device.modbus.func2': '02 读离散输入状态',
  'device.modbus.func3': '03 读保持寄存器',
  'device.modbus.func4': '04 读输入寄存器',

  /**
   * plc model
   */
  'device.plc.model': '西门子 {model} 系列 PLC',

  /**
   * ReadFormat
   */
  'device.readFormat.raw': '原始字节',
  'device.readFormat.hex': '十六进制',
  'device.readFormat.utf8': 'UTF8 字符串',

  /**
   * Tab
   */
  'device.tab.coils': '线圈寄存器',
  'device.tab.discrete': '离散寄存器',
  'device.tab.holding': '保持寄存器',
  'device.tab.input': '输入寄存器',

  /**
   * MBus Type
   */
  'device.mbus.type.heatMeter': '热量表',
  'device.mbus.type.waterMeter': '水表',
  'device.mbus.type.gasMeter': '燃气表',
  'device.mbus.type.elecMeter': '电表',
  'device.mbus.type.transparent': '透传设备',
  'device.mbus.type.protocol': '协议转换器',
};
