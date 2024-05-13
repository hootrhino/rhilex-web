export default {
  /**
   * tabs
   */
  'system.tab.resource': '系统资源',
  'system.tab.netStatus': '网络状态',
  'system.tab.network': '网卡配置',
  'system.tab.wifi': 'WIFI 配置',
  'system.tab.time': '时间配置',
  'system.tab.routing': '路由设置',
  'system.tab.firmware': '固件配置',
  'system.tab.4gConfig': '配置',
  'system.tab.4gNetwork': '网络',
  'system.tab.apn': 'APN 配置',
  'system.tab.backup': '数据备份',
  'system.tab.user': '用户配置',
  'system.tab.port': 'Interface',

  /**
   * form
   */
  'system.form.title.netmask': 'Netmask',
  'system.form.title.ip': '管理地址',
  'system.form.title.ipPoolRange': 'IP 分配范围',
  'system.form.title.ifaceFrom': 'LAN 网卡',
  'system.form.title.ifaceTo': '流量出口',
  'system.form.title.cops': 'COPS',
  'system.form.title.csq': 'CSQ',
  'system.form.title.senceId': 'Scene Id',
  'system.form.title.ptytpe': 'Protocol Type',
  'system.form.title.apn': 'APN Name',
  'system.form.title.auth': 'APN Auth',
  'system.form.title.cdmapwd': 'Save CDMA Mode',
  'system.form.title.interface': '网卡选择',
  'system.form.title.address': 'IP Address',
  'system.form.title.gateway': 'Gateway',
  'system.form.title.dns': 'DNS Server',
  'system.form.title.dhcpEnabled': 'Enable DHCP',
  'system.form.title.security': 'Encryption Method',

  'system.form.rules.netmask': '请输入子网掩码',
  'system.form.rules.ip': '请输入管理地址',
  'system.form.rules.ipPoolBegin': '请输入 DHCP 起始地址',
  'system.form.rules.ipPoolEnd': '请输入 DHCP 结束地址',
  'system.form.rules.ifaceFrom': '请选择 LAN 网卡',
  'system.form.rules.ifaceTo': '请选择流量出口',
  'system.form.rules.interface': '请选择网卡',
  'system.form.rules.address': 'Please enter a ip address',
  'system.form.rules.gateway': 'Please enter a gateway',
  'system.form.rules.dns': 'Please enter a DNS server',
  'system.form.rules.ssid': 'Please enter a SSID',
  'system.form.rules.security': 'Please select a encryption method',

  'system.form.placeholder.senceId': 'Please enter a sence id',
  'system.form.placeholder.ptytpe': 'Please select a protocol type',
  'system.form.placeholder.apn': 'Please enter a apn name',
  'system.form.placeholder.auth': 'Please select a apn auth',
  'system.form.placeholder.sysTimeZone': 'Please select a time zone',
  'system.form.placeholder.sysTime': 'Please select a time',

  /**
   * table
   */
  'system.table.title.ipAddress': 'IP Address',
  'system.table.title.macAddress': 'Device MAC',
  'system.table.title.hostname': 'Device Name',
  'system.table.title.deviceId': '设备序列号',
  'system.table.title.mac': '被授权 MAC',
  'system.table.title.license': '设备许可证',
  'system.table.title.authorizeAdmin': '证书签发方',
  'system.table.title.beginAuthorize': '授权起始时间',
  'system.table.title.endAuthorize': '授权结束时间',
  'system.table.title.device': '网卡名称',
  'system.table.title.type': '网卡类型',
  'system.table.title.state': 'Network Status',
  'system.table.title.connection': '当前网络',
  'system.table.title.hwAddr': 'Physical Address',
  'system.table.title.mtu': '网络 MTU',
  'system.table.title.ipv4Addr': 'IPV4 Address',
  'system.table.title.ipv6Addr': 'IPV6 Address',
  'system.table.title.product': 'Product',
  'system.table.title.version': 'Version',
  'system.table.title.osUpTime': '运行时长',
  'system.table.title.osArch': 'OS',
  'system.table.title.memPercent': 'Usaged Memory',
  'system.table.title.diskInfo': 'Used Disk',
  'system.table.title.cpuPercent': 'Used CPU',
  'system.table.title.sysTimeZone': 'Time Zone',
  'system.table.title.sysTime': 'System Time',
  'system.table.title.enableNtp': 'Enable NTP',

  /**
   * button
   */
  'system.button.reload': 'Refresh',
  'system.button.restart4g': '重启 4G 网卡',
  'system.button.upgrade': 'Upgrade',
  'system.button.confirm.restart': '确认重启',
  'system.button.confirm.upload': 'Confirm Upload',
  'system.button.confirm.upgrade': 'Confirm Upgrade',
  'system.button.confirm.recover': '确认恢复',
  'system.button.backup.runningLog': 'Download Log',
  'system.button.backup.snapshot': 'Snapshot',
  'system.button.backup.download': 'Backup Download',
  'system.button.backup.upload': 'Backup Recovery',
  'system.button.firmware.upload': 'Upload Firmware',
  'system.button.firmware.reboot': 'Reboot Device',
  'system.button.firmware.restart': '重启固件',
  'system.button.firmware.recover': '恢复出厂',
  'system.button.time.ntp': '立即同步 NTP',
  'system.button.wifi.ntp': 'Scan WIFI',

  /**
   * modal
   */
  'system.modal.content.restart': '重启 4G 网卡会造成短时间内移动网络处于离线状态，请谨慎操作',
  'system.modal.content.upload':
    '上传时请确认版本，版本错误会导致失败，有可能会引起设备故障，请谨慎操作',
  'system.modal.content.upgrade':
    '升级时请确认版本，版本错误会导致升级失败，有可能会引起设备故障，请谨慎操作',
  'system.modal.content.restartDevice': '重启设备会停止当前所有任务，请谨慎操作',
  'system.modal.content.recover':
    '恢复出厂设置会删除当前所有数据，停止所有正在进行的任务，请谨慎操作',
  'system.modal.content.user': '确定修改用户名/密码并重新登录吗？',

  /**
   * title
   */
  'system.title.firmware.auth': '设备授权信息',
  'system.title.firmware.log': '固件升级日志',
  'system.title.firmware.upload': '上传固件',
  'system.title.network.detail': '网卡详情',
  'system.title.network.status': '网络状态',
  'system.title.resource.detail': '系统详情',

  /**
   * others
   */
  'system.routing.tab.config': 'DHCP Configuration',
  'system.routing.tab.list': 'DHCP List',
  'system.tips.apn': '此配置项属于高级网络功能，配置不当会造成设备断网，请谨慎操作',
  'system.tooltip.cdmapwd': '是否在 CDMA 网络下保存用户名和密码',
  'system.tooltip.new': 'Add a new line',

  'system.option.unsave': 'Unsaved',
  'system.option.save': 'Save',
  'system.option.or': 'or',
  'system.option.and': 'and',
  'system.option.shanghai': 'China',
  'system.option.tokyo': 'Japan',
  'system.switch.checked': 'enable',
  'system.switch.unchecked': 'disable',

  'system.desc.recovery': 'Only ZIP files are supported',
  'system.message.error.upload': '仅支持 zip 格式文件，请检查上传文件格式',
  'system.message.success.ntp': 'NTP 时间更新成功',
  'system.message.success.scan': 'Scan successful',

  'system.type.ethernet': 'Ethernet',
  'system.type.bridge': 'Bridge',
  'system.type.loopback': 'Loopback',
  'system.state.connected': 'connected',
  'system.state.disconnected': 'disconnected',
  'system.state.unmanaged': '系统默认',
  'system.state.unavailable': '网络不可用',
};
