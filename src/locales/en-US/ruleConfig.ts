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
  'ruleConfig.inend.link.ali': '阿里云:',
  'ruleConfig.inend.link.tencent': '腾讯云:',
  'ruleConfig.inend.link.w3c': 'W3C 规范:',
};
