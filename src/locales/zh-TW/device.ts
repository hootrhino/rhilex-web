export default {
  /**
   * button
   */
  'device.button.restartDevice': '重启设备',
  'device.button.schema.bind': '数据模型',
  'device.button.schema.unbind': '解绑数据模型',
  'device.button.camera': '查看视频',
  'device.button.snmp': 'SNMP 对象列表',
  'device.button.sheet': '点位表配置',

  /**
   * title
   */
  'device.title.group': '设备分组',
  'device.title.list': '设备列表',
  'device.title.modal.error': '设备异常信息',
  'device.title.modal.restart': '确定执行设备重启操作吗？',

  /**
   * message
   */
  'device.message.success.unbind': '解绑成功',
  'device.message.success.restart': '重启成功',

  /**
   * modal
   */
  'device.modal.title.remove': '确定要删除此设备？',
  'device.modal.title.camera': '查看视频',
  'device.modal.group.title.remove': '确定要删除此分组？',
  'device.modal.group.content.remove':
    '分组中包含 {count} 个子项目，删除后将被移入默认分组中，请谨慎处理。',
  'device.modal.group.title.new': '新建分组',
  'device.modal.group.title.edit': '编辑分组',
  'device.modal.content.restart': '重启过程会短暂（5-10秒）断开资源连接，需谨慎操作',
  'device.modal.content.camera': '视频正在加载...',

  /**
   * drawer
   */
  'device.drawer.title.detail': '设备详情',
  'device.drawer.descriptions.title': '基本配置',

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
  'device.form.title.schemaId': '数据模型',
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

  // group
  'device.form.group.title.name': '分组名称',

  /**
   * tooltip
   */
  'device.tooltip.outputMode':
    '注意：因为传输格式原因，Jpeg Stream 模式下仅保存了图像信息，没有原始声音',
  'device.tooltip.group.edit': '重命名分组',
  'device.tooltip.group.remove': '删除分组',

  /**
   * placeholder
   */
  'device.placeholder.group.name': '请输入分组名称',
};
