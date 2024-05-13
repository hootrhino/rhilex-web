export default {
  /**
   * table
   */
  'ruleConfig.table.title.status': 'Status',

  /**
   * form
   */
  'ruleConfig.form.title.name': 'Name',
  'ruleConfig.form.title.actions': '规则回调',
  'ruleConfig.form.title.sourceType': 'Data Sources',
  'ruleConfig.form.title.fromSource': 'Input resources',
  'ruleConfig.form.title.testData': 'Input devices',
  'ruleConfig.form.title.output': 'Output',

  'ruleConfig.form.placeholder.name': 'Please enter a name',
  'ruleConfig.form.placeholder.testData': 'Please enter test data',

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
  'ruleConfig.popconfirm.title.reset':
    'Resetting may result in data loss. Are you sure you want to continue?',
  'ruleConfig.message.mqtt':
    'MQTT messages originate from the Publish side, and this rule is solely responsible for forwarding the raw data without making any modifications. Therefore, the parameter of the callback function is the original MQTT message. Developers need to determine the specific format of the message themselves',
  'ruleConfig.message.iothub':
    'Since different IoTHubs may use their own unique data formats, the purpose of this rule is limited to the forwarding of raw data without any modifications. Therefore, the parameter received by the callback function will be the original IoTHub protocol JSON. For the specific format of the messages, please refer to the documentation provided by the respective cloud service provider。',

  /**
   * inends
   */
  'ruleConfig.inend.event.connected': 'Device Online Event',
  'ruleConfig.inend.event.disconnected': 'Device Offline Event',
  'ruleConfig.inend.event.up': 'Resource Online Event',
  'ruleConfig.inend.event.down': 'Resource Offline Event',
  'ruleConfig.inend.link.ali': 'Ali Cloud:',
  'ruleConfig.inend.link.tencent': 'Tencent Cloud:',
  'ruleConfig.inend.link.w3c': 'W3C specifications:',

  /**
   * device ds
   */
  'ruleConfig.ds.device.in': 'Input',
  'ruleConfig.ds.device.out': 'Output',
  'ruleConfig.ds.device.tag': 'Tag',
  'ruleConfig.ds.device.function': 'Function code',
  'ruleConfig.ds.device.slaverId': '从机 ID',
  'ruleConfig.ds.device.address': 'Address',
  'ruleConfig.ds.device.quantity': 'Quantity',
  'ruleConfig.ds.device.value': 'Value',
  'ruleConfig.ds.device.type': 'Data type',
  'ruleConfig.ds.device.frequency': 'Frequency',
  'ruleConfig.ds.device.start': '起始位置',
  'ruleConfig.ds.device.size': 'Size',
  'ruleConfig.ds.device.width': '单帧宽度',
  'ruleConfig.ds.device.height': '单帧高度',
  'ruleConfig.ds.device.extra': '视频融合数据',
  'ruleConfig.ds.device.event': 'Event',
  'ruleConfig.ds.device.mac': 'Device MAC',
  'ruleConfig.ds.device.ip': 'Device IP',
  'ruleConfig.ds.device.data': 'Data',
  'ruleConfig.ds.device.oid': 'Represents an SNMP object identifier',
  'ruleConfig.ds.device.alias': 'Alias',

  /**
   * inend ds
   */
  'ruleConfig.ds.inend.from': 'Data Sources',
  'ruleConfig.ds.inend.data': 'Data body',
  'ruleConfig.ds.inend.type': 'Event type',
  'ruleConfig.ds.inend.event': 'Event name',
  'ruleConfig.ds.inend.ts': 'Timestamp',
  'ruleConfig.ds.inend.deviceUuid': 'Device ID',
  'ruleConfig.ds.inend.deviceName': 'Device name',
  'ruleConfig.ds.inend.sourceUuid': 'Resource ID',
  'ruleConfig.ds.inend.sourceName': 'Resource name',
};
