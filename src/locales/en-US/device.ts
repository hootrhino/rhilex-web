export default {
  /**
   * button
   */
  'device.button.snmp': 'SNMP OIDs',
  'device.button.sheet': 'Sheet Configuration',
  'device.button.registers': 'Registers Detail',
  'device.button.nonPolling': 'Stop Refresh',
  'device.button.polling': 'Start Refresh',
  'device.button.import.sheet': 'Import Sheet',
  'device.button.export.sheet': 'Export Sheet',
  'device.button.update.bulk': 'Bulk Update',
  'device.button.remove.bulk': 'Bulk Delete',
  'device.button.new.sheet': 'Add point',

  /**
   * title
   */
  'device.title.group': 'Device group',
  'device.title.list': 'Device list',
  'device.title.detail': 'Device details',
  'device.title.new': 'New device',
  'device.title.update': 'Edit device',
  'device.title.base': 'Basic configuration',
  'device.title.modal.error.device': 'Device exception information',
  'device.title.modal.error.sheet': 'Point exception information',
  'device.title.sheet': 'Point sheet configuration',
  'device.title.sheetList': '{name} - Point sheet configuration',
  'device.title.registers': 'Registers details',

  /**
   * modal
   */
  'device.modal.title.remove': 'Are you sure to delete this device?',
  'device.modal.title.remove.batchOid': 'Bulk delete OIDs',
  'device.modal.title.remove.oid': 'Are you sure to delete this OID?',
  'device.modal.title.remove.sheet': 'Are you sure to delete this point?',
  'device.modal.title.remove.batchSheet': 'Bulk Delete Points',
  'device.modal.title.group.new': 'New device group',
  'device.modal.title.group.edit': 'Edit Group',
  'device.modal.title.group.remove': 'Are you sure to delete this group',
  'device.modal.title.upload.confirm': 'Import Sheet',

  'device.modal.content.group.remove':
    'Please ensure no devices are mounted under this group before performing the deletion. If there are devices under the group, deletion is not permitted',
  'device.modal.content.restart':
    'The restart process will temporarily disconnect resource connections for 5-10 seconds; please proceed with caution',
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
  'device.form.title.group.bacnet': 'BACnet configuration',
  'device.form.title.group.tencent': 'Tencent IoT Hub access configuration',
  'device.form.title.group.uartRW': 'Read/Write configuration',

  // timeout
  'device.form.title.timeout.request': 'Request Timeout',
  'device.form.title.timeout.connect': 'Connection Timeout',
  'device.form.title.timeout.idle': 'Heartbeat Timeout',
  'device.form.title.timeout.scan': 'Scanning Timeout',
  'device.form.title.timeout.uart': 'Read/Write Timeout',

  // frequency
  'device.form.title.frequency': 'Execution Frequency',
  'device.form.title.frequency.scan': 'Execution Frequency',
  'device.form.title.frequency.request': 'Execution Frequency',

  // other
  'device.form.title.mode': 'Mode',
  'device.form.title.portUuid': 'Serial Port',
  'device.form.title.host': 'Host',
  'device.form.title.gid': 'Device Group',
  'device.form.title.retryTime': 'Max Fault Count',
  'device.form.title.autoRequest': 'Enable Auto Request',
  'device.form.title.enableOptimize': 'Enable Optimize Fetch',
  'device.form.title.enableBatchRequest': 'Enable Batch Fetch',
  'device.form.title.maxRegNum': 'Max Points',
  'device.form.title.host.plc': 'PLC Address',
  'device.form.title.host.tcp': 'Host',
  'device.form.title.model': 'Device Model',
  'device.form.title.model.plc': 'PLC Model',
  'device.form.title.rack': 'Rack',
  'device.form.title.slot': 'Slot',
  'device.form.title.url': 'Request URL',
  'device.form.title.autoScan': 'Enable Auto Scan',
  'device.form.title.enableGroup': 'enable Concurrent Fetch',
  'device.form.title.target.device': 'Target Device',
  'device.form.title.target.port': 'Target Port',
  'device.form.title.transport': 'Transport Protocol',
  'device.form.title.community': 'Community',
  'device.form.title.version': 'Version',

  // group
  'device.form.title.group.name': 'Group Name',

  // modbus
  'device.form.title.slaverId': 'Slave ID',
  'device.form.title.tag': 'Tag',
  'device.form.title.func': 'Function Code',
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

  // bacnet
  'device.form.title.id': 'Device ID',
  'device.form.title.mode.broadcast': 'Broadcast Mode',
  'device.form.title.localPort': 'Port',
  'device.form.title.vendorId': 'Vendor ID',
  'device.form.title.objectType': 'Object Type',
  'device.form.title.objectId': 'Object ID',
  'device.form.title.cidr': 'CIDR',

  // tencent
  'device.form.title.productId': 'Product ID',
  'device.form.title.deviceName': 'Device Name',
  'device.form.title.devicePsk': 'Device PSK',

  // uart rw
  'device.form.title.rwConfig.autoRequest': 'Enable Auto Request',
  'device.form.title.readFormat': 'Read Format',
  'device.form.title.timeSlice': 'Time Slice',

  // MBus
  'device.form.title.dataLength': 'Data Length',
  'device.form.title.manufacturer': 'Manufacturer',

  /**
   * tooltip
   */
  'device.tooltip.group.edit': 'Rename group',
  'device.tooltip.group.remove': 'Delete group',
  'device.tooltip.copy': 'Create a new row based on the current row as a templat',
  'device.tooltip.uartTimeout':
    'This value represents the optimal period for the serial port to read complete packets. Please set it with caution to avoid making random changes. Before making any modifications, ensure you understand the specific meaning of this parameter. If adjustments are needed, it is recommended to set the value within the range of 30-1000ms',

  /**
   * placeholder
   */
  'device.form.placeholder.group.name': 'Please enter a group name',
  'device.form.placeholder.slaverId': 'Please enter a slaver address',
  'device.form.placeholder.tag': 'Please enter a tag',
  'device.form.placeholder.func': 'Please select a modbus function',
  'device.form.placeholder.dataType': 'Please select a data type and endianness',
  'device.form.placeholder.address': 'Please enter an address',
  'device.form.placeholder.quantity': 'Please enter a quantity',
  'device.form.placeholder.weight': 'Please enter a weight',
  'device.form.placeholder.frequency': 'Please enter a frequency',
  'device.form.placeholder.siemensAddress': 'Please enter an address',
  'device.form.placeholder.oid': 'Please enter an OID',
  'device.form.placeholder.uartTimeout': 'Please enter a timeout',
  'device.form.placeholder.cidr': 'Please select a CIDR',
  'device.form.placeholder.vendorId': 'Please enter a vendor ID',
  'device.form.placeholder.id': 'Please enter a device ID',
  'device.form.placeholder.objectType': 'Please select an object type',
  'device.form.placeholder.objectId': 'Please enter an object ID',
  'device.form.placeholder.dataLength': 'Please enter a data length',
  'device.form.placeholder.manufacturer': 'Please enter a manufacturer',

  /**
   * rules
   */
  'device.form.rules.quantity': 'The quantity ranges between 1 and 256',
  'device.form.rules.weight': 'The weight must be within the range of -0.0001 to 100,000',
  'device.form.rules.slaverId': 'The slaver address must be between 1 and 255',
  'device.form.rules.id': 'Please enter a valid device ID, ranging from 0 to 4194302',
  'device.form.rules.bacnet.objectId': 'Please enter a valid object ID, ranging from 0 to 4194303',

  /**
   * others
   */
  'device.tips.scroll': 'Scroll horizontally to see more',
  'device.message.error.new':
    'Successfully created, but currently unable to operate normally. Please modify the configuration parameters promptly according to the error message {msg}',
  'device.unit.byte': 'Byte',
  'device.bigEndian': 'Big-Endian',
  'device.littleEndian': 'Little-Endian',

  /**
   * device type
   */
  'device.type.uart': 'Generic Serial Port Gateway',
  'device.type.modbus.master': 'Generic Modbus Master Gateway',
  'device.type.modbus.slaver': 'Generic Modbus Slaver Gateway',
  'device.type.snmp': 'Generic SNMP Gateway',
  'device.type.plc': 'Generic Siemens S7 PLC Gateway',
  'device.type.http': 'Generic HTTP Gatewa',
  'device.type.bacnet.ip': 'Generic BACnet IP Master Gateway',
  'device.type.bacnet.router': 'Generic BACnet IP Slaver Gateway',
  'device.type.tencent': 'Tencent IoT Hub Gateway Access',
  'device.type.uartRW': 'Generic Serial Read/Write Gateway',
  'device.type.mbus': 'Generic M-Bus Gateway',

  /**
   * modbus function
   */
  'device.modbus.func1': '01 Read Coils',
  'device.modbus.func2': '02 Read Discrete Inputs',
  'device.modbus.func3': '03 Read Holding Registers',
  'device.modbus.func4': '04 Read Input Registers',

  /**
   * plc model
   */
  'device.plc.model': 'Siemens {model} PLC',

  /**
   * ReadFormat
   */
  'device.readFormat.raw': 'RAW',
  'device.readFormat.hex': 'HEX',
  'device.readFormat.utf8': 'UTF8',

  /**
   * Tab
   */
  'device.tab.coils': 'Coils Registers',
  'device.tab.discrete': 'Discrete Registers',
  'device.tab.holding': 'Holding Registers',
  'device.tab.input': 'Input Registers',

  /**
   * MBus Type
   */
  'device.mbus.type.heatMeter': 'Heat Meter',
  'device.mbus.type.waterMeter': 'Water Meter',
  'device.mbus.type.gasMeter': 'Gas Meter',
  'device.mbus.type.elecMeter': 'Electric Meter',
  'device.mbus.type.transparent': 'Transparent',
  'device.mbus.type.protocol': 'Protocol Converter',
};
