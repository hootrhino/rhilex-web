export default {
  /**
   * CodeEditor
   */
  'component.tpl.data': 'Data pushed to {server} service',
  'component.tpl.data.arg': '{server} resource',
  'component.tpl.data.quick.modbus': 'Modbus data parsing and pushing to {server}',
  'component.tpl.device.write': 'Write data to the device',
  'component.tpl.device.read': 'Read data from the device',
  'component.tpl.device.ctrl': 'Send control instructions to the device',
  'component.tpl.time': 'Current time',
  'component.tpl.timeMs': 'Current universal timestamp',
  'component.tpl.tsUnix': 'Current Unix timestamp',
  'component.tpl.tsUnixNano': 'Current nanosecond timestamp',
  'component.tpl.ntp': 'NTP Time',
  'component.tpl.sleep': 'Sleep',
  'component.tpl.rhilexg1.set': 'Set the value of {target}',
  'component.tpl.rhilexg1.get': 'Get the value of {target}',
  'component.tpl.math.detail': 'Cut off floating point numbers',
  'component.tpl.jq.detail': 'JQ filter data',
  'component.tpl.rpc.detail': 'RPC call',
  'component.tpl.f5': 'Write a single coil',
  'component.tpl.f6': 'Write single holding register',
  'component.tpl.f15': 'Write multiple coils',
  'component.tpl.f16': 'Write multiple holding registe',
  'component.tpl.name': '{name} functions',
  'component.tpl.name.standard': 'Standard functions',
  'component.tpl.name.other': 'Other functions',
  'component.tpl.name.dataRepo': 'Data repository functions',
  'component.tpl.jsonT2J.detail': 'Convert LuaTable to JSON string',
  'component.tpl.jsonJ2T.detail': 'Convert JSON string to LuaTable',
  'component.tpl.query.detail': 'Local database query (with return value)',
  'component.tpl.execute.detail': 'Local database execution (no return value)',
  'component.tpl.kvSet.detail': 'Global cache set value',
  'component.tpl.kvGet.detail': 'Global cache get value',
  'component.tpl.kvDel.detail': 'Global cache delete value',
  'component.tpl.standard.debug': 'Print log',
  'component.tpl.usage': 'Function usage example',
  'component.tpl.standard.debug.usage2': 'Throw an exception',
  'component.tpl.rhilex.label':
    'When there is no network, the gateway’s LED will flash quickly 5 times',
  'component.tpl.rhilex.detail': '{name} network connection test',
  'component.tpl.inend': 'UUID parameter comes from the input',
  'component.tpl.outend': 'UUID parameter comes from the output',
  'component.tpl.device': 'UUID parameter comes from the Device',
  'component.tpl.save.detail': 'Data written to the data repository',
  'component.tpl.rfcom.name': 'Communication control functions',
  'component.tpl.rfcom.detail': 'Get the MAC address of the Bluetooth module',
  'component.tpl.rfcom.arg': 'Module Resources',

  /**
   * others
   */
  'component.title.notify': 'Notification',
  'component.title.customRule': 'Custom rule example',
  'component.title.defaultGroup': 'Default group',
  'component.title.builtInTpl': 'Built-in function',
  'component.title.customTpl': 'Custom templates',
  'component.title.quickTpl': 'Quick templates',
  'component.title.exampleChild': 'Basic form of functions',

  'component.link.httpHeaders': 'For more information, please refer to',
  'component.link.form': 'Go to the official documentation homepage for more help information',

  'component.button.user': 'User Settings',
  'component.button.logout': 'Logout',
  'component.button.more': 'Show More',
  'component.button.copy': 'Copy',
  'component.button.use': 'Use Now',
  'component.button.rule': 'Rule Example',
  'component.button.format': 'Code Format',
  'component.button.countdown': '{text}中（{countdown}s）',

  'component.tab.example': 'Rule Example',
  'component.tab.addRule': 'Custom Rule',

  'component.form.title.rule': 'Rule Name',
  'component.form.title.name': 'Template Name',
  'component.form.title.apply': 'Code',
  'component.form.title.var': 'Variable Settings',
  'component.form.placeholder.name': 'Please enter a name',
  'component.form.placeholder.varDesc': 'Please enter a description',
  'component.form.placeholder.varName': 'Please enter a name',
  'component.form.placeholder.varType': 'Please select a type',
  'component.form.placeholder.varValue': 'Please enter a value',
  'component.form.placeholder.varValue.select': 'Please select a value',

  'component.popconfirm.title.reset':
    'Resetting may result in data loss. Are you sure you want to continue?',

  'component.modal.title.page':
    'Exiting may result in data loss. Are you sure to return to the list?',
  'component.modal.title.settingVar': 'Variable settings',
  'component.modal.title.removeRule': 'Are you sure to delete this rule?',
  'component.modal.title.editRule': 'Edit rule',
  'component.modal.title.newRule': 'New rule',
  'component.modal.title.upload':
    'You should ensure that the uploaded point sheet adheres to a specific header format, for example:',
  'component.modal.content.upload':
    'Incorrect file format may result in upload failure. Are you sure you want to upload',

  'component.tooltip.newVar': 'New variable',
};
