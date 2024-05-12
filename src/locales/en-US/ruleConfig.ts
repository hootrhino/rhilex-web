export default {
  /**
   * table
   */
  'ruleConfig.table.title.name': '名称',
  'ruleConfig.table.title.status': '状态',

  /**
   * form
   */
  'ruleConfig.form.title.name': '规则名称',
  'ruleConfig.form.title.actions': '规则回调',
  'ruleConfig.form.title.sourceType': '数据来源',
  'ruleConfig.form.title.fromSource': '输入资源',
  'ruleConfig.form.title.testData': '输入数据',
  'ruleConfig.form.title.output': '输出结果',

  'ruleConfig.form.placeholder.name': '请输入规则名称',
  'ruleConfig.form.placeholder.testData': '请输入数据',

  /**
   * title
   */
  'ruleConfig.title': 'Rule configuration',
  'ruleConfig.title.new': 'New rule',
  'ruleConfig.title.edit': 'Edit rule',
  'ruleConfig.title.detail': 'Rule detail',
  'ruleConfig.title.log': 'Rule log',
  'ruleConfig.title.test': 'Test script',
  'ruleConfig.title.device': 'Device',
  'ruleConfig.title.source': 'Resource',
  'ruleConfig.title.deviceConfig': 'Device {title} - rule configuration',
  'ruleConfig.title.sourceConfig': 'Resource {title} - rule configuration',
  'ruleConfig.title.tpl': 'Structure and examples of output data',

  /**
   * others
   */
  'ruleConfig.popconfirm.title.remove': 'Are you sure to delete this rule?',
  'ruleConfig.popconfirm.title.reset': '重置可能会丢失数据，确定要重置吗？',
  'ruleConfig.message.mqtt':
    'Mqtt 消息来自 Publish 方，而此处规则只做原始数据转发，不对数据做任何更改，因此回调函数的参数就是原始的 Mqtt Message，其具体格式需要开发者自行决定。',
  'ruleConfig.message.iothub':
    '不同的 IoTHub 有不同的数据格式，而此处规则只做原始数据转发，不对数据做任何更改，因此回调函数的参数就是原始的 IoTHub 协议 JSON，其具体格式可以参考对应的云服务商文档。',

  /**
   * inends
   */
  'ruleConfig.inend.event.connected': '设备上线事件',
  'ruleConfig.inend.event.disconnected': '设备离线事件',
  'ruleConfig.inend.event.up': '资源上线事件',
  'ruleConfig.inend.event.down': '资源离线事件',
  'ruleConfig.inend.link.ali': 'Ali Cloud:',
  'ruleConfig.inend.link.tencent': 'Tencent Cloud:',
  'ruleConfig.inend.link.w3c': 'W3C specifications:',

  /**
   * device ds
   */
  'ruleConfig.ds.device.in': '输入参数',
  'ruleConfig.ds.device.out': '输出值',
  'ruleConfig.ds.device.tag': 'Tag',
  'ruleConfig.ds.device.function': 'Function code',
  'ruleConfig.ds.device.slaverId': '从机 ID',
  'ruleConfig.ds.device.address': 'Address',
  'ruleConfig.ds.device.quantity': 'Quantity',
  'ruleConfig.ds.device.value': 'Value',
  'ruleConfig.ds.device.type': 'Data type',
  'ruleConfig.ds.device.frequency': 'Frequency',
  'ruleConfig.ds.device.start': '起始位置',
  'ruleConfig.ds.device.size': '大小',
  'ruleConfig.ds.device.width': '单帧宽度',
  'ruleConfig.ds.device.height': '单帧高度',
  'ruleConfig.ds.device.extra': '视频融合数据',
  'ruleConfig.ds.device.event': '事件',
  'ruleConfig.ds.device.mac': 'Device MAC',
  'ruleConfig.ds.device.ip': 'Device IP',
  'ruleConfig.ds.device.data': 'Data',
  'ruleConfig.ds.device.oid': '表示 SNMP 对象标志符',
  'ruleConfig.ds.device.alias': 'Alias',

  /**
   * inend ds
   */
  'ruleConfig.ds.inend.from': '数据来源',
  'ruleConfig.ds.inend.data': '数据体',
  'ruleConfig.ds.inend.type': 'Event type',
  'ruleConfig.ds.inend.event': 'Event name',
  'ruleConfig.ds.inend.ts': '时间戳',
  'ruleConfig.ds.inend.deviceUuid': 'Device ID',
  'ruleConfig.ds.inend.deviceName': 'Device name',
  'ruleConfig.ds.inend.sourceUuid': 'Resource ID',
  'ruleConfig.ds.inend.sourceName': 'Resource name',
};
