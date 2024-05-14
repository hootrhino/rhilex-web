export default {
  /**
   * button
   */
  'device.button.camera': '查看视频', // TODO 已隐藏，暂时不需要翻译
  'device.button.snmp': 'SNMP OIDs',
  'device.button.sheet': 'sheet Configuration',
  'device.button.nonPolling': 'Stop Refresh',
  'device.button.polling': 'Start Refresh',
  'device.button.import.sheet': 'Import Sheet',
  'device.button.export.sheet': 'Export Sheet',
  'device.button.update.bulk': 'Bulk Update',
  'device.button.remove.bulk': 'Bulk Delete',
  'device.button.control': 'Device Console',
  'device.button.configWebhook': 'Setting Webhook',
  'device.button.clearWebhook': 'Clear Webhook',
  'device.button.scan': 'Scan Device',
  'device.button.refresh': 'Refresh',
  'device.button.export.oid': 'Export OIDs',
  'device.button.import.oid': 'Import OIDs',
  'device.button.new.object': 'Add OID',
  'device.button.new.sheet': 'Add point',

  /**
   * title
   */
  'device.title.group': 'Device Group',
  'device.title.list': 'Device List',
  'device.title.detail': 'Device Detail',
  'device.title.detail.smartHome': '{name} Device Detail',
  'device.title.new': 'New Device',
  'device.title.update': 'Edit Device',
  'device.title.base': 'Basic configuration',
  'device.title.modal.error.device': 'Device exception information',
  'device.title.modal.error.sheet': 'Point exception information',
  'device.title.modal.error.oid': 'OID exception information',
  'device.title.sheet': 'Point sheet configuration',
  'device.title.oid': 'SNMP OIDs',
  'device.title.subDevice': 'Device {name} - Subdevice list',
  'device.title.sheetList': 'Device {name} - Point sheet configuration',
  'device.title.oidList': 'Device {name} - SNMP OIDs',
  'device.title.smartHome.detail.base': 'Basic device information',
  'device.title.smartHome.detail.status': 'Device status information',

  /**
   * modal
   */
  'device.modal.title.remove': 'Are you sure to delete this device?',
  'device.modal.title.remove.batchOid': 'Bulk delete OIDs',
  'device.modal.title.remove.oid': 'Are you sure to delete this OID?',
  'device.modal.title.remove.sheet': 'Are you sure to delete this point?',
  'device.modal.title.remove.batchSheet': 'Bulk Delete Points',
  'device.modal.title.camera': '查看视频', // TODO 已隐藏，暂时不需要翻译
  'device.modal.title.group.new': 'New device group',
  'device.modal.title.group.edit': 'Edit Group',
  'device.modal.title.group.remove': 'Are you sure to delete this group',
  'device.modal.title.upload.confirm': 'Import Sheet',
  'device.modal.title.upload.confirm.oid': 'Import OIDs',
  'device.modal.title.upload':
    'You should ensure that the uploaded point sheet adheres to a specific header format, for example:',

  'device.modal.content.group.remove':
    'The group contains {count} sub-items. After deletion, they will be moved to the default group;please proceed with caution',
  'device.modal.content.restart':
    'The restart process will temporarily disconnect resource connections for 5-10 seconds; please proceed with caution',
  'device.modal.content.camera.loading': '视频正在加载...', // TODO 已隐藏，暂时不需要翻译
  'device.modal.content.camera':
    '此模式下流媒体被中转到第三方地址，当前{inputAddr}已经成功推送到{outputAddr}，请在对应的平台上查看或者播放。', // TODO 已隐藏，暂时不需要翻译
  'device.modal.content.upload':
    'Incorrect file format may result in upload failure. Are you sure you want to upload?',
  'device.modal.content.remove.batchOid':
    'This operation will delete multiple OIDs at once. Please proceed with caution',
  'device.modal.content.remove.batchSheet':
    'This operation will delete multiple points at once. Please proceed with caution',

  /**
   * form
   */

  // formList
  'device.form.title.group.port': 'UART configuration',
  'device.form.title.group.tcp': 'TCP configuration',
  'device.form.title.group.common': 'Common configuration',
  'device.form.title.group.http': 'HTTP configuration',
  'device.form.title.group.snmp': 'SNMP configuration',

  // timeout
  'device.form.title.timeout.request': 'Request Timeout',
  'device.form.title.timeout.connect': 'Connection Timeout',
  'device.form.title.timeout.idle': 'Heartbeat Timeout',
  'device.form.title.timeout.scan': 'Scanning Timeout',
  'device.form.title.timeout.uart': 'RW Timeout',

  // frequency
  'device.form.title.frequency': 'Execution Frequency',
  'device.form.title.frequency.scan': 'Execution Frequency',
  'device.form.title.frequency.request': 'Execution Frequency',

  // other
  'device.form.title.mode': 'Mode',
  'device.form.title.portUuid': 'Serial Port',
  'device.form.title.host': 'Host',
  'device.form.title.port': 'Port',
  'device.form.title.name': 'Name',
  'device.form.title.type': 'Type',
  'device.form.title.gid': 'Device Group',
  'device.form.title.state': 'Status',
  'device.form.title.retryTime': 'Max Fault Count',
  'device.form.title.autoRequest': 'Enable Auto Request',
  'device.form.title.enableOptimize': 'Enable Batch Fetch',
  'device.form.title.maxRegNum': 'Max Points',
  'device.form.title.host.plc': 'PLC Address',
  'device.form.title.host.tcp': 'Host',
  'device.form.title.model': 'Device Model',
  'device.form.title.model.plc': 'PLC Model',
  'device.form.title.rack': 'Rack',
  'device.form.title.slot': 'Slot',
  'device.form.title.url': 'Request URL',
  'device.form.title.inputMode': 'Input Mode',
  // TODO 已隐藏，暂时不需要翻译 --begin
  'device.form.title.inputAddr': '视频采集源',
  'device.form.title.outputMode': 'Output Mode',
  'device.form.title.outputEncode': '输出编码',
  'device.form.title.outputAddr': '输出地址',
  'device.form.title.playAddr': '外部播放地址',
  // TODO 已隐藏，暂时不需要翻译 --end
  'device.form.title.autoScan': 'Enable Auto Scan',
  'device.form.title.enableGroup': 'enable Concurrent Fetch',
  'device.form.title.target.device': 'Target Device',
  'device.form.title.target.port': 'Target Port',
  'device.form.title.transport': 'Transport Protocol',
  'device.form.title.community': 'Community',
  'device.form.title.version': 'Version',
  'device.form.title.webHookPort': 'Port',

  // group
  'device.form.title.group.name': 'Group Name',

  // modbus
  'device.form.title.slaverId': 'Slave IP Address',
  'device.form.title.tag': 'Tag',
  'device.form.title.alias': 'Alias',
  'device.form.title.func': 'Modbus Function',
  'device.form.title.dataType': 'Data Type(Endianness)',
  'device.form.title.address': 'Address Range',
  'device.form.title.quantity': 'Quantity',
  'device.form.title.weight': 'Weight',
  'device.form.title.value': 'Value',
  'device.form.title.status': 'Status',
  'device.form.title.lastFetchTime': 'Last Fetch Time',

  // plc
  'device.form.title.siemensAddress': 'Address',

  // snmp
  'device.form.title.oid': 'OID',

  // smartHome
  'device.form.title.id': 'Device ID',
  'device.form.title.ip': 'Device IP Address',
  'device.form.title.mac': 'Device MAC Address',
  'device.form.title.gen': 'Device Hardware Version',
  'device.form.title.fwId': 'Device Firmware ID',
  'device.form.title.ver': 'Device Firmware Version',
  'device.form.title.app': 'Device Application Name',
  'device.form.title.authEn': 'Enable Auth',
  'device.form.title.authDomain': 'Device Auth Domain',
  'device.form.title.restartRequired': 'Enable Restart',
  'device.form.title.time': 'System Time Setting',
  'device.form.title.unixtime': 'Device Unix Timestamp',
  'device.form.title.uptime': 'Device Up Start Time',
  'device.form.title.ramSize': 'Total RAM',
  'device.form.title.ramFree': 'Available RAM',
  'device.form.title.fsSize': 'Total Space',
  'device.form.title.fsFree': 'Available Space',
  'device.form.title.cfgRev': 'Version Setting',
  'device.form.title.kvsRev': 'Key Value Storage Version',
  'device.form.title.scheduleRev': 'Schedule Job Version',
  'device.form.title.webhookRev': 'Webhook Version',

  /**
   * tooltip
   */
  'device.tooltip.outputMode':
    '注意：因为传输格式原因，Jpeg Stream 模式下仅保存了图像信息，没有原始声音', // TODO 已隐藏，暂时不需要翻译
  'device.tooltip.group.edit': 'Rename group',
  'device.tooltip.group.remove': 'Delete group',
  'device.tooltip.copy': 'Create a new row based on the current row as a templat',
  'device.tooltip.uartTimeout':
    'The value represents the optimal period for reading complete packets over the serial port. Please do not modify this parameter without careful consideration. Before making any changes, ensure you understand the significance of this parameter. If modifications are necessary, it is recommended to set the value within the range of 30-1000ms',

  /**
   * placeholder
   */
  'device.form.placeholder.group.name': 'Please enter a group name',
  'device.form.placeholder.slaverId': 'Please enter a slaver Id',
  'device.form.placeholder.tag': 'Please enter a tag',
  'device.form.placeholder.alias': 'Please enter an alias',
  'device.form.placeholder.func': 'Please select a modbus function',
  'device.form.placeholder.dataType': 'Please select a data type and endianness',
  'device.form.placeholder.address': 'Please enter an address',
  'device.form.placeholder.quantity': 'Please enter a quantity',
  'device.form.placeholder.weight': 'Please enter a weight',
  'device.form.placeholder.frequency': 'Please enter a frequency',
  'device.form.placeholder.siemensAddress': 'Please enter an address',
  'device.form.placeholder.oid': 'Please enter an OID',
  'device.form.placeholder.uartTimeout': 'Please enter a timeout',
  'device.form.placeholder.cidr': 'Please enter a CIDR',

  /**
   * rules
   */
  'device.form.rules.quantity': 'The quantity ranges between 1 and 256',
  'device.form.rules.weight': 'The weight must be within the range of -0.0001 to 100,000',
  'device.form.rules.slaverId': 'The slaver address must be between 1 and 255',

  /**
   * others
   */
  'device.tips.scroll': 'Scroll horizontally to see more',
  'device.message.success.config': 'Configured successfully',
  'device.message.success.clear': 'Cleared successfully',
  'device.message.error.new':
    'Successfully created, but currently unable to operate normally. Please modify the configuration parameters promptly according to the error message {msg}',
  'device.unit.byte': 'Byte',
  'device.bigEndian': 'Big-Endian',
  'device.littleEndian': 'Little-Endian',

  /**
   * device type
   */
  'device.type.uart': 'Generic Serial Port Gateway',
  'device.type.modbus': 'Generic Modbus Gateway',
  'device.type.snmp': 'Generic SNMP Gateway',
  'device.type.plc': 'Generic Siemens S7 PLC Gateway',
  'device.type.http': 'Generic HTTP Gatewa',
  'device.type.camera': '通用摄像机流处理网关', // TODO 已隐藏，暂时不需要翻译
  'device.type.smartHome': 'Smart Home Gateway',

  /**
   * modbus function
   */
  'device.modbus.func1': '01 Reading coil',
  'device.modbus.func2': '02 Read Discrete Input',
  'device.modbus.func3': '03 Read Holding Register',
  'device.modbus.func4': '04 Read Input Register',

  /**
   * plc model
   */
  'device.plc.model': 'Siemens {model} PLC',

  // TODO 暂时不需要翻译 --begin
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
  'device.camera.outputEncode': '{type} Encode',
  // TODO 暂时不需要翻译 --end
};
