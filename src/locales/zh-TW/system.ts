export default {
  /**
   * tabs
   */
  'system.tab.resource': '系統資源',
  'system.tab.netStatus': '網絡狀態',
  'system.tab.network': '網卡設定',
  'system.tab.wifi': 'WIFI 設定',
  'system.tab.time': '時間設定',
  'system.tab.routing': '路由設定',
  'system.tab.firmware': '固件設定',
  'system.tab.backup': '數據備份',
  'system.tab.user': '用戶設定',
  'system.tab.port': '串口設定',

  /**
   * form
   */
  'system.form.title.netmask': '子網掩碼',
  'system.form.title.ip': '管理地址',
  'system.form.title.ipPoolRange': 'IP 分配範圍',
  'system.form.title.ifaceFrom': 'LAN 網卡',
  'system.form.title.ifaceTo': '流量出口',
  'system.form.title.interface': '網卡選擇',
  'system.form.title.address': 'IP 地址',
  'system.form.title.gateway': '默認網關',
  'system.form.title.dns': 'DNS 伺服器',
  'system.form.title.dhcpEnabled': '啟用 DHCP',
  'system.form.title.security': '加密方式',

  // port
  'system.form.title.occupyBy': '佔用設備',
  'system.form.title.config': '串口配置',
  'system.form.title.timeout': '超時時間',
  'system.form.title.baudRate': '波特率',
  'system.form.title.dataBits': '數據位',
  'system.form.title.parity': '奇偶校驗',
  'system.form.title.stopBits': '停止位',
  'system.form.title.uart': '系統串口',

  'system.form.rules.netmask': '請輸入子網掩碼',
  'system.form.rules.ip': '請輸入管理地址',
  'system.form.rules.ipPoolBegin': '請輸入 DHCP 起始地址',
  'system.form.rules.ipPoolEnd': '請輸入 DHCP 結束地址',
  'system.form.rules.ifaceFrom': '請選擇 LAN 網卡',
  'system.form.rules.ifaceTo': '請選擇流量出口',
  'system.form.rules.interface': '請選擇網卡',
  'system.form.rules.address': '請輸入 IP 地址',
  'system.form.rules.gateway': '請輸入默認網關',
  'system.form.rules.dns': '請輸入 DNS 伺服器',
  'system.form.rules.ssid': '請輸入 SSID',
  'system.form.rules.security': '請選擇加密方式',

  'system.form.placeholder.sysTimeZone': '請選擇時區',
  'system.form.placeholder.sysTime': '請選擇時間',

  // port
  'system.form.placeholder.timeout': '請輸入超時時間',
  'system.form.placeholder.baudRate': '請選擇波特率',
  'system.form.placeholder.dataBits': '請選擇數據位',
  'system.form.placeholder.parity': '請選擇奇偶校驗',
  'system.form.placeholder.stopBits': '請選擇停止位',
  'system.form.placeholder.uart': '請輸入系統串口',

  /**
   * table
   */
  'system.table.title.ipAddress': 'IP 地址',
  'system.table.title.macAddress': '設備 MAC',
  'system.table.title.hostname': '設備名稱',
  'system.table.title.deviceId': '設備序號',
  'system.table.title.mac': '已授權 MAC',
  'system.table.title.license': '設備許可證',
  'system.table.title.authorizeAdmin': '證書簽發方',
  'system.table.title.beginAuthorize': '授權起始時間',
  'system.table.title.endAuthorize': '授權結束時間',
  'system.table.title.device': '網卡名稱',
  'system.table.title.type': '網卡類型',
  'system.table.title.state': '網絡狀態',
  'system.table.title.connection': '當前網絡',
  'system.table.title.hwAddr': '實體地址',
  'system.table.title.mtu': '網絡 MTU',
  'system.table.title.ipv4Addr': 'IPV4 地址',
  'system.table.title.ipv6Addr': 'IPV6 地址',
  'system.table.title.product': '產品',
  'system.table.title.version': '當前版本',
  'system.table.title.osUpTime': '運行時長',
  'system.table.title.osArch': '操作系統',
  // 'system.table.title.memPercent': '記憶體使用',
  // 'system.table.title.diskInfo': '磁碟使用',
  // 'system.table.title.cpuPercent': 'CPU 使用',
  'system.table.title.sysTimeZone': '時區選擇',
  'system.table.title.sysTime': '系統時間',
  'system.table.title.enableNtp': 'NTP 同步',

  /**
   * button
   */
  'system.button.upgrade': '升級',
  'system.button.confirm.reboot': '確認重新啟動',
  'system.button.confirm.upload': '確認上傳',
  'system.button.confirm.upgrade': '確認升級',
  'system.button.confirm.recover': '確認還原',
  'system.button.backup.runningLog': '運行記錄下載',
  'system.button.backup.snapshot': '運行快照',
  'system.button.backup.download': '備份下載',
  'system.button.backup.upload': '備份還原',
  'system.button.firmware.upload': '上傳固件',
  'system.button.firmware.recover': '恢復出廠設定',
  'system.button.time.ntp': '立即同步 NTP',
  'system.button.wifi.ntp': '掃描 WIFI',
  'system.button.scan': '掃描端口',

  /**
   * modal
   */
  'system.modal.content.restart': '重新啟動 4G 網卡會造成短時間內移動網絡處於離線狀態，請謹慎操作',
  'system.modal.content.upload':
    '上傳時請確認版本，版本錯誤會導致失敗，有可能會引起設備故障，請謹慎操作',
  'system.modal.content.upgrade':
    '升級時請確認版本，版本錯誤會導致升級失敗，有可能會引起設備故障，請謹慎操作',
  'system.modal.content.reboot': '重新啟動設備會停止當前所有任務，請謹慎操作',
  'system.modal.content.recover':
    '恢復原廠設定將刪除目前所有資料並停止所有正在進行中的任務，請謹慎操作',
  'system.modal.content.user': '確定要修改用戶名 / 密碼並重新登入嗎？',
  'system.modal.title.portDetail': '串口詳情',
  'system.modal.title.portUpdate': '編輯串口',

  /**
   * title
   */
  'system.title.firmware.auth': '設備授權資訊',
  'system.title.firmware.log': '固件升級日誌',
  'system.title.firmware.upload': '上傳固件',
  'system.title.network.detail': '網卡詳情',
  'system.title.network.status': '網絡狀態',
  'system.title.resource.detail': '系統詳情',

  /**
   * others
   */
  'system.routing.tab.config': 'DHCP 配置',
  'system.routing.tab.list': 'DHCP 列表',
  'system.tips.apn': '此配置項屬於高級網絡功能，配置不當會造成設備斷網，請謹慎操作',
  'system.tooltip.cdmapwd': '是否在 CDMA 網絡下保存用戶名和密碼',
  'system.tooltip.new': '新建一行',

  'system.option.shanghai': '中國',
  'system.option.tokyo': '日本',
  'system.switch.checked': '開啟',
  'system.switch.unchecked': '關閉',

  'system.desc.recovery': '僅支持 zip 文件',
  'system.message.error.upload': '僅支持 zip 格式的文件，請檢查上傳文件格式',
  'system.message.success.ntp': 'NTP 時間更新成功',

  'system.type.ethernet': '以太網',
  'system.type.bridge': '橋接設備',
  'system.type.loopback': '本地迴環口',
  'system.state.connected': '已連接到',
  'system.state.disconnected': '未連接',
  'system.state.unmanaged': '系統默認',
  'system.state.unavailable': '網絡不可用',
  'system.scene.option1': '場景1',

  // port
  'system.option.uart': '系統串口',
  'system.option.e': '奇校驗',
  'system.option.o': '偶校驗',
  'system.option.n': '不校驗',
};
