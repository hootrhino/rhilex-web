export default {
  /**
   * table
   */
  'ruleConfig.table.title.status': '状态',

  /**
   * form
   */
  'ruleConfig.form.title.name': '名称',
  'ruleConfig.form.title.actions': '规则回调',
  'ruleConfig.form.title.sourceType': '数据来源',
  'ruleConfig.form.title.fromSource': '输入资源',
  'ruleConfig.form.title.testData': '输入数据',
  'ruleConfig.form.title.output': '输出结果',

  'ruleConfig.form.placeholder.name': '请输入名称',
  'ruleConfig.form.placeholder.testData': '请输入数据',

  /**
   * title
   */
  'ruleConfig.title': '规则配置',
  'ruleConfig.title.new': '新建规则',
  'ruleConfig.title.edit': '编辑规则',
  'ruleConfig.title.detail': '规则详情',
  'ruleConfig.title.log': '规则日志',
  'ruleConfig.title.test': '测试脚本',
  'ruleConfig.title.device': '设备',
  'ruleConfig.title.source': '资源',
  'ruleConfig.title.deviceConfig': '设备 {title} - 规则配置',
  'ruleConfig.title.sourceConfig': '资源 {title} - 规则配置',
  'ruleConfig.title.tpl': '输出数据的结构及其示例',

  /**
   * others
   */
  'ruleConfig.popconfirm.title.remove': '确定要删除此规则？',
  'ruleConfig.popconfirm.title.reset': '重置可能会丢失数据，确定要重置吗？',
  'ruleConfig.message.mqtt':
    'Mqtt 消息来自 Publish 方，本规则仅负责转发原始数据，不进行任何修改。因此，回调函数的参数即为原始 Mqtt 消息。开发者需自行确定消息的具体格式',
  'ruleConfig.message.iothub':
    '由于不同的 IoTHub 可能采用各自独特的数据格式，本规则的作用仅限于原始数据的转发，不涉及任何数据修改。因此，回调函数接收的参数将是最初的 IoTHub 协议 JSON。有关消息的具体格式，请参考相应云服务提供商提供的文档',

  /**
   * inends
   */
  'ruleConfig.inend.event.connected': '设备上线事件',
  'ruleConfig.inend.event.disconnected': '设备离线事件',
  'ruleConfig.inend.event.up': '资源上线事件',
  'ruleConfig.inend.event.down': '资源离线事件',
  'ruleConfig.inend.link.ali': '阿里云：',
  'ruleConfig.inend.link.tencent': '腾讯云：',
  'ruleConfig.inend.link.w3c': 'W3C 规范：',

  /**
   * device ds
   */
  'ruleConfig.ds.device.in': '输入参数',
  'ruleConfig.ds.device.out': '输出值',
  'ruleConfig.ds.device.tag': '标签',
  'ruleConfig.ds.device.function': '功能码',
  'ruleConfig.ds.device.slaverId': '从机 ID',
  'ruleConfig.ds.device.address': '地址',
  'ruleConfig.ds.device.quantity': '数量',
  'ruleConfig.ds.device.value': '值',
  'ruleConfig.ds.device.type': '数据类型',
  'ruleConfig.ds.device.frequency': '频率',
  'ruleConfig.ds.device.start': '起始位置',
  'ruleConfig.ds.device.size': '大小',
  'ruleConfig.ds.device.width': '单帧宽度',
  'ruleConfig.ds.device.height': '单帧高度',
  'ruleConfig.ds.device.extra': '目标检测',
  'ruleConfig.ds.device.event': '事件',
  'ruleConfig.ds.device.mac': '设备 MAC',
  'ruleConfig.ds.device.ip': '设备 IP',
  'ruleConfig.ds.device.data': '数据',
  'ruleConfig.ds.device.oid': '表示 SNMP 对象标志符',
  'ruleConfig.ds.device.alias': '别名',

  /**
   * inend ds
   */
  'ruleConfig.ds.inend.from': '数据来源',
  'ruleConfig.ds.inend.data': '数据体',
  'ruleConfig.ds.inend.type': '事件类型',
  'ruleConfig.ds.inend.event': '事件名称',
  'ruleConfig.ds.inend.ts': '时间戳',
  'ruleConfig.ds.inend.deviceUuid': '设备 ID',
  'ruleConfig.ds.inend.deviceName': '设备名称',
  'ruleConfig.ds.inend.sourceUuid': '资源 ID',
  'ruleConfig.ds.inend.sourceName': '资源名称',
};
