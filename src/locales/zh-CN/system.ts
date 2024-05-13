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
  'system.tab.port': '端口设置',

  /**
   * form
   */
  'system.form.title.netmask': '子网掩码',
  'system.form.title.ip': '管理地址',
  'system.form.title.ipPoolRange': 'IP 分配范围',
  'system.form.title.ifaceFrom': 'LAN 网卡',
  'system.form.title.ifaceTo': '流量出口',
  'system.form.title.cops': '运营商',
  'system.form.title.csq': '信号强度',
  'system.form.title.senceId': '场景编号',
  'system.form.title.ptytpe': '协议类型',
  'system.form.title.apn': 'APN 名称',
  'system.form.title.username': '用户名',
  'system.form.title.password': '密码',
  'system.form.title.auth': 'APN 鉴权',
  'system.form.title.cdmapwd': '保存 CDMA 模式',
  'system.form.title.interface': '网卡选择',
  'system.form.title.address': 'IP 地址',
  'system.form.title.gateway': '默认网关',
  'system.form.title.dns': 'DNS 服务器',
  'system.form.title.dhcpEnabled': '开启 DHCP',
  'system.form.title.security': '加密方式',

  'system.form.rules.netmask': '请输入子网掩码',
  'system.form.rules.ip': '请输入管理地址',
  'system.form.rules.ipPoolBegin': '请输入 DHCP 起始地址',
  'system.form.rules.ipPoolEnd': '请输入 DHCP 结束地址',
  'system.form.rules.ifaceFrom': '请选择 LAN 网卡',
  'system.form.rules.ifaceTo': '请选择流量出口',
  'system.form.rules.interface': '请选择网卡',
  'system.form.rules.address': '请输入 IP 地址',
  'system.form.rules.gateway': '请输入默认网关',
  'system.form.rules.dns': '请输入 DNS 服务器',
  'system.form.rules.ssid': '请输入 SSID',
  'system.form.rules.security': '请选择加密方式',

  'system.form.placeholder.senceId': '请选择场景编号',
  'system.form.placeholder.ptytpe': '请选择协议类型',
  'system.form.placeholder.apn': '请输入 APN 名称',
  'system.form.placeholder.username': '请输入用户名',
  'system.form.placeholder.password': '请输入密码',
  'system.form.placeholder.auth': '请选择 APN 鉴权',
  'system.form.placeholder.sysTimeZone': '请选择时区',
  'system.form.placeholder.sysTime': '请选择时间',

  /**
   * table
   */
  'system.table.title.ipAddress': 'IP 地址',
  'system.table.title.macAddress': '设备 MAC',
  'system.table.title.hostname': '设备名称',
  'system.table.title.deviceId': '设备序列号',
  'system.table.title.mac': '被授权 MAC',
  'system.table.title.license': '设备许可证',
  'system.table.title.authorizeAdmin': '证书签发方',
  'system.table.title.beginAuthorize': '授权起始时间',
  'system.table.title.endAuthorize': '授权结束时间',
  'system.table.title.device': '网卡名称',
  'system.table.title.type': '网卡类型',
  'system.table.title.state': '网络状态',
  'system.table.title.connection': '当前网络',
  'system.table.title.hwAddr': '物理地址',
  'system.table.title.mtu': '网络 MTU',
  'system.table.title.ipv4Addr': 'IPV4 地址',
  'system.table.title.ipv6Addr': 'IPV6 地址',
  'system.table.title.product': '产品',
  'system.table.title.version': '当前版本',
  'system.table.title.osUpTime': '运行时长',
  'system.table.title.osArch': '操作系统',
  'system.table.title.memPercent': '内存使用',
  'system.table.title.diskInfo': '磁盘使用',
  'system.table.title.cpuPercent': 'CPU 使用',
  'system.table.title.sysTimeZone': '时区选择',
  'system.table.title.sysTime': '系统时间',
  'system.table.title.enableNtp': 'NTP 同步',

  /**
   * button
   */
  'system.button.reload': '刷新状态',
  'system.button.restart4g': '重启 4G 网卡',
  'system.button.upgrade': '升级',
  'system.button.confirm.restart': '确认重启',
  'system.button.confirm.upload': '确认上传',
  'system.button.confirm.upgrade': '确认升级',
  'system.button.confirm.recover': '确认恢复',
  'system.button.backup.runningLog': '日志下载',
  'system.button.backup.snapshot': '运行快照',
  'system.button.backup.download': '备份下载',
  'system.button.backup.upload': '备份恢复',
  'system.button.firmware.upload': '上传固件',
  'system.button.firmware.upgrade': '确定升级',
  'system.button.firmware.reboot': '重启设备',
  'system.button.firmware.restart': '重启固件',
  'system.button.firmware.recover': '恢复出厂',
  'system.button.time.ntp': '立即同步 NTP',
  'system.button.wifi.ntp': '扫描 WIFI',

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
  'system.routing.tab.config': 'DHCP 配置',
  'system.routing.tab.list': 'DHCP 列表',
  'system.tips.apn': '此配置项属于高级网络功能，配置不当会造成设备断网，请谨慎操作',
  'system.tooltip.cdmapwd': '是否在 CDMA 网络下保存用户名和密码',
  'system.tooltip.new': '新建一行',

  'system.option.unsave': '不保存',
  'system.option.save': '保存',
  'system.option.or': '或',
  'system.option.and': '和',
  'system.option.shanghai': '中国',
  'system.option.tokyo': '日本',
  'system.switch.checked': '开启',
  'system.switch.unchecked': '关闭',

  'system.desc.recovery': '仅支持 zip 文件',
  'system.message.error.recovery': '仅支持 .zip 格式的文件，请检查上传文件格式',
  'system.message.error.upload': '仅支持 zip 格式文件，请检查上传文件格式',
  'system.message.success.ntp': 'NTP 时间更新成功',
  'system.message.success.scan': '扫描成功',

  'system.type.ethernet': '以太网',
  'system.type.bridge': '桥接设备',
  'system.type.loopback': '本地回环口',
  'system.state.connected': '已连接到',
  'system.state.disconnected': '未连接',
  'system.state.unmanaged': '系统默认',
  'system.state.unavailable': '网络不可用',
};
