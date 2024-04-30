export default {
  /**
   * button
   */
  'device.button.restartDevice': '重启设备',
  'device.button.camera': '查看视频',
  'device.button.snmp': 'SNMP 对象列表',
  'device.button.sheet': '点位表配置',
  'device.button.nonPolling': '停止刷新',
  'device.button.polling': '开始刷新',
  'device.button.import.sheet': '导入点位表',
  'device.button.export.sheet': '导出点位表',
  'device.button.update.batch': '批量更新',
  'device.button.remove.batch': '批量删除',
  'device.button.control': '设备控制台',
  'device.button.configWebhook': '快速接入网关',
  'device.button.clearWebhook': '清除所有配置',
  'device.button.scan': '扫描设备',
  'device.button.reload': '刷新',
  'device.button.export.oid': '导出对象列表',
  'device.button.new.object': '添加对象',

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
  'device.title.device': '设备',
  'device.title.subDevice': '设备 {name} - 子设备列表',

  /**
   * modal
   */
  'device.modal.title.remove': '确定要删除此设备？',
  'device.modal.title.remove.oid': '批量删除对象',
  'device.modal.title.remove.sheet': '确定要删除此点位？',
  'device.modal.title.remove.batchSheet': '批量删除点位',
  'device.modal.title.camera': '查看视频',
  'device.modal.title.restart': '确定执行此操作吗？',
  'device.modal.title.group.new': '新建分组',
  'device.modal.title.group.edit': '编辑分组',
  'device.modal.title.group.remove': '确定要删除此分组？',
  'device.modal.title.upload': '你应当确保上传的点位表必须遵守一定表头格式，例如：',

  'device.modal.content.group.remove':
    '分组中包含 {count} 个子项目，删除后将被移入默认分组中，请谨慎处理。',
  'device.modal.content.restart': '重启过程会短暂（5-10秒）断开资源连接，需谨慎操作',
  'device.modal.content.camera': '视频正在加载...',
  'device.modal.content.upload': '文件格式不正确可能会导致上传失败，你确定要上传',
  'device.modal.content.remove.batchOid': '此操作会一次性删除多个对象，需谨慎操作',

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
  'device.form.title.timeout.request': '请求超时',
  'device.form.title.timeout.connect': '连接超时',
  'device.form.title.timeout.idle': '心跳超时',
  'device.form.title.timeout.scan': '扫描超时',

  // frequency
  'device.form.title.frequency.coll': '采集频率',
  'device.form.title.frequency.scan': '扫描频率',
  'device.form.title.frequency.request': '请求频率',

  // other
  'device.form.title.mode': '工作模式',
  'device.form.title.portUuid': '系统串口',
  'device.form.title.host': '服务地址',
  'device.form.title.port': '端口',
  'device.form.title.name': '设备名称',
  'device.form.title.type': '设备类型',
  'device.form.title.gid': '设备分组',
  'device.form.title.state': '设备状态',
  'device.form.title.retryTime': '重试次数',
  'device.form.title.autoRequest': '启动轮询',
  'device.form.title.enableOptimize': '批量采集',
  'device.form.title.maxRegNum': '最大点位数',
  'device.form.title.host.plc': 'PLC 地址',
  'device.form.title.host.tcp': '服务地址',
  'device.form.title.model': '型号',
  'device.form.title.rack': '机架号',
  'device.form.title.slot': '插槽号',
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
  'device.form.title.tag': '数据标签',
  'device.form.title.alias': '数据别名',
  'device.form.title.func': 'Modbus 功能',
  'device.form.title.dataType': '数据类型（字节序）',
  'device.form.title.address': '起始地址',
  'device.form.title.quantity': '读取数量',
  'device.form.title.weight': '权重系数',
  'device.form.title.frequency': '采集频率',
  'device.form.title.value': '最新值',
  'device.form.title.status': '点位状态',
  'device.form.title.lastFetchTime': '采集时间',

  // plc
  'device.form.title.siemensAddress': '地址',

  // snmp
  'device.form.title.oid': '对象标识符',

  /**
   * tooltip
   */
  'device.tooltip.outputMode':
    '注意：因为传输格式原因，Jpeg Stream 模式下仅保存了图像信息，没有原始声音',
  'device.tooltip.group.edit': '重命名分组',
  'device.tooltip.group.remove': '删除分组',
  'device.tooltip.copy': '以当前行为模板新建一行数据',

  /**
   * placeholder
   */
  'device.form.placeholder.group.name': '请输入分组名称',
  'device.form.placeholder.tag': '请输入数据标签',
  'device.form.placeholder.alias': '请输入数据别名',
  'device.form.placeholder.func': '请选择 Modbus 功能',
  'device.form.placeholder.dataType': '请选择数据类型和字节序',
  'device.form.placeholder.address': '请输入起始地址',
  'device.form.placeholder.quantity': '请输入读取数量',
  'device.form.placeholder.weight': '请输入权重系数',
  'device.form.placeholder.frequency': '请输入采集频率',
  'device.form.placeholder.siemensAddress': '请输入地址',
  'device.form.placeholder.oid': '请输入对象标识符',

  /**
   * rules
   */
  'device.form.rules.address': '起始地址范围在 0-65535 之间',
  'device.form.rules.quantity': '读取数量范围在 1-256 之间',
  'device.form.rules.weight': '权重系数必须在 -0.0001 到 100000 范围内',

  /**
   * others
   */
  'device.tips.scroll': '横向滚动查看更多',
  'device.message.success.config': '配置成功',
  'device.message.success.clear': '清除成功',
  'device.message.error.new': '创建成功，但是暂时无法正常工作，请及时调整配置参数。错误信息：',
};
