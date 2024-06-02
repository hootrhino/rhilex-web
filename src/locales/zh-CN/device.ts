export default {
  /**
   * button
   */
  'device.button.camera': '查看视频',
  'device.button.snmp': 'SNMP 对象列表',
  'device.button.sheet': '点位表配置',
  'device.button.nonPolling': '停止刷新',
  'device.button.polling': '开始刷新',
  'device.button.import.sheet': '导入点位表',
  'device.button.export.sheet': '导出点位表',
  'device.button.update.bulk': '批量更新',
  'device.button.remove.bulk': '批量删除',
  'device.button.control': '设备控制台',
  'device.button.configWebhook': '快速接入网关',
  'device.button.clearWebhook': '清除所有配置',
  'device.button.scan': '扫描设备',
  'device.button.refresh': '刷新',
  'device.button.export.oid': '导出对象列表',
  'device.button.import.oid': '导入对象列表',
  'device.button.new.object': '添加对象',
  'device.button.new.sheet': '添加点位',

  /**
   * title
   */
  'device.title.group': '设备分组',
  'device.title.list': '设备列表',
  'device.title.detail': '设备详情',
  'device.title.detail.smartHome': '{name} 设备详情',
  'device.title.new': '新建设备',
  'device.title.update': '编辑设备',
  'device.title.base': '基本配置',
  'device.title.modal.error.device': '设备异常信息',
  'device.title.modal.error.sheet': '点位异常信息',
  'device.title.modal.error.oid': '对象异常信息',
  'device.title.sheet': '点位表配置',
  'device.title.oid': 'SNMP 对象列表',
  'device.title.subDevice': '{name} - 子设备列表',
  'device.title.sheetList': '{name} - 点位表配置',
  'device.title.oidList': '设备 {name} - SNMP 对象列表',
  'device.title.smartHome.detail.base': '设备基本信息',
  'device.title.smartHome.detail.status': '设备状态信息',

  /**
   * modal
   */
  'device.modal.title.remove': '确定要删除此设备？',
  'device.modal.title.remove.batchOid': '批量删除对象',
  'device.modal.title.remove.oid': '确定要删除此对象？',
  'device.modal.title.remove.sheet': '确定要删除此点位？',
  'device.modal.title.remove.batchSheet': '批量删除点位',
  'device.modal.title.camera': '查看视频',
  'device.modal.title.group.new': '新建设备分组',
  'device.modal.title.group.edit': '编辑分组',
  'device.modal.title.group.remove': '确定要删除此分组？',
  'device.modal.title.upload.confirm': '导入点位表',
  'device.modal.title.upload.confirm.oid': '导入对象列表',

  'device.modal.content.group.remove':
    '分组中包含 {count} 个子项目，删除后将被移入默认分组中，请谨慎处理。',
  'device.modal.content.restart': '重启过程会短暂（5-10秒）断开资源连接，请谨慎操作',
  'device.modal.content.camera.loading': '视频正在加载...',
  'device.modal.content.camera':
    '此模式下流媒体被中转到第三方地址，当前{inputAddr}已经成功推送到{outputAddr}，请在对应的平台上查看或者播放。',
  'device.modal.content.remove.batchOid': '此操作会一次性删除多个对象，请谨慎操作',
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
  'device.form.title.group.smartHome': '智能家居配置',
  'device.form.title.group.bacnet': 'BACnet 配置',
  'device.form.title.group.tencent': '腾讯云物联网平台接入配置',

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
  'device.form.title.port': '端口',
  'device.form.title.name': '名称',
  'device.form.title.type': '类型',
  'device.form.title.gid': '设备分组',
  'device.form.title.state': '状态',
  'device.form.title.retryTime': '最大容错次数',
  'device.form.title.autoRequest': '启动轮询',
  'device.form.title.enableOptimize': '批量采集',
  'device.form.title.maxRegNum': '最大点位数',
  'device.form.title.host.plc': 'PLC 地址',
  'device.form.title.host.tcp': '服务地址',
  'device.form.title.model': '设备型号',
  'device.form.title.model.plc': 'PLC 型号',
  'device.form.title.rack': '架位',
  'device.form.title.slot': '槽位',
  'device.form.title.url': '请求地址',
  'device.form.title.inputMode': '输入模式',
  'device.form.title.inputAddr': '视频采集源',
  'device.form.title.outputMode': '输出模式',
  'device.form.title.outputEncode': '输出编码',
  'device.form.title.outputAddr': '输出地址',
  'device.form.title.playAddr': '外部播放地址',
  'device.form.title.autoScan': '自动扫描',
  'device.form.title.enableGroup': '并发采集',
  'device.form.title.target.device': '目标设备',
  'device.form.title.target.port': '目标端口',
  'device.form.title.transport': '传输协议',
  'device.form.title.community': '社区名称',
  'device.form.title.version': '协议版本',
  'device.form.title.webHookPort': '监听端口',

  // group
  'device.form.title.group.name': '分组名称',

  // modbus
  'device.form.title.slaverId': '从设备地址',
  'device.form.title.tag': '标签',
  'device.form.title.alias': '别名',
  'device.form.title.func': 'Modbus 功能',
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

  // smartHome
  'device.form.title.id': '设备 ID',
  'device.form.title.ip': '设备 IP 地址',
  'device.form.title.mac': '设备 MAC 地址',
  'device.form.title.gen': '设备硬件版本号',
  'device.form.title.fwId': '设备固件版本 ID',
  'device.form.title.ver': '设备固件版本号',
  'device.form.title.app': '设备应用程序名称',
  'device.form.title.authEn': '开启认证功能',
  'device.form.title.authDomain': '设备认证域',
  'device.form.title.restartRequired': '重启设备',
  'device.form.title.time': '设备当前时间',
  'device.form.title.unixtime': '设备 Unix 时间戳',
  'device.form.title.uptime': '设备运行时间',
  'device.form.title.ramSize': 'RAM 总大小',
  'device.form.title.ramFree': '可用 RAM 大小',
  'device.form.title.fsSize': '文件系统总大小',
  'device.form.title.fsFree': '文件系统可用大小',
  'device.form.title.cfgRev': '配置版本号',
  'device.form.title.kvsRev': '键值存储版本号',
  'device.form.title.scheduleRev': '计划任务版本号',
  'device.form.title.webhookRev': 'Webhook 版本号',
  'device.form.title.cidr': '网络',

  // bacnet
  'device.form.title.mode.broadcast': '广播模式',
  'device.form.title.localPort': '本地端口',
  'device.form.title.vendorId': '厂商 ID',
  'device.form.title.objectType': '对象类型',
  'device.form.title.objectId': '对象 ID',

  // tencent
  'device.form.title.productId': '产品 ID',
  'device.form.title.deviceName': '设备名称',
  'device.form.title.devicePsk': '设备秘钥',
  'device.form.title.clientId': '客户端 ID',

  /**
   * tooltip
   */
  'device.tooltip.outputMode':
    '注意：因为传输格式原因，Jpeg Stream 模式下仅保存了图像信息，没有原始声音',
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
  'device.form.placeholder.alias': '请输入别名',
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
  'device.form.placeholder.bacnet.vendorId': '请输入厂商 ID',
  'device.form.placeholder.id': '请输入设备 ID',
  'device.form.placeholder.bacnet.objectType': '请选择对象类型',
  'device.form.placeholder.bacnet.objectId': '请输入对象 ID',

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
  'device.message.success.config': '配置成功',
  'device.message.success.clear': '清除成功',
  'device.message.error.new': '创建成功，但目前无法正常运行。请根据错误信息 {msg} 及时修改配置参数',
  'device.unit.byte': '字节',
  'device.bigEndian': '大端',
  'device.littleEndian': '小端',

  /**
   * device type
   */
  'device.type.uart': '通用串口网关',
  'device.type.modbus': '通用 Modbus 采集网关',
  'device.type.snmp': '通用 SNMP 协议采集网关',
  'device.type.plc': '通用西门子 S7 系列 PLC 采集网关',
  'device.type.http': '通用 HTTP 协议数据采集网关',
  'device.type.camera': '通用摄像机流处理网关',
  'device.type.smartHome': '全屋智能家居中心控制网关',
  'device.type.bacnet': '通用 Bacnet IP 采集网关',
  'device.type.tencent': '腾讯云物联网平台网关接入',

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
   * inputMode
   */
  'device.camera.inputMode.rtsp': '远程 RTSP 流地址',
  'device.camera.inputMode.local': '本地相机设备',

  /**
   * outputMode
   */
  'device.camera.outputMode.jpeg': '本地 Jpeg 流服务器',
  'device.camera.outputMode.stream': '远程流媒体服务器',

  /**
   * outputEncode
   */
  'device.camera.outputEncode': '{type} 编码',
};
