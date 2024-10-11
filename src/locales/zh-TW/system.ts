export default {
  /**
   * tabs
   */
  'system.tab.resource': '系統資源',
  'system.tab.netStatus': '網絡狀態',
  'system.tab.network': '網卡設定',
  'system.tab.datetime': '時間設定',
  'system.tab.firmware': '固件設定',
  'system.tab.backup': '數據備份',
  'system.tab.user': '用戶設定',
  'system.tab.reboot': '定時重啟',
  'system.tab.time': '系統時間',
  'system.tab.sysver': '系統版本',
  'system.tab.nerworking': '網絡設定',
  'system.tab.setting': '{item} 設定',

  /**
   * form
   */
  'system.form.title.netmask': '子網掩碼',
  'system.form.title.interface': '網卡選擇',
  'system.form.title.address': 'IP 地址',
  'system.form.title.gateway': '默認網關',
  'system.form.title.dns': 'DNS 伺服器',
  'system.form.title.dhcpEnabled': '啟用 DHCP',
  'system.form.title.security': '加密方式',

  // reboot
  'system.form.title.enableReboot': '開啟定時重啟',
  'system.form.title.cronExpr': 'CRON 表達式',

  // rules
  'system.form.rules.netmask': '請輸入子網掩碼',
  'system.form.rules.interface': '請選擇網卡',
  'system.form.rules.address': '請輸入 IP 地址',
  'system.form.rules.gateway': '請輸入默認網關',
  'system.form.rules.dns': '請輸入 DNS 伺服器',
  'system.form.rules.ssid': '請輸入 SSID',
  'system.form.rules.security': '請選擇加密方式',
  'system.form.rules.cronExpr': '請選擇常用定時策略或自訂輸入定時策略',

  // placeholder
  'system.form.placeholder.sysTimeZone': '請選擇時區',
  'system.form.placeholder.sysTime': '請選擇時間',

  /**
   * table
   */
  'system.table.title.deviceId': '設備序號',
  'system.table.title.mac': '已授權 MAC',
  'system.table.title.license': '設備許可證',
  'system.table.title.authorizeAdmin': '證書簽發方',
  'system.table.title.beginAuthorize': '授權起始時間',
  'system.table.title.endAuthorize': '授權結束時間',
  'system.table.title.product': '產品型號',
  'system.table.title.version': '當前版本',
  'system.table.title.osUpTime': '運行時長',
  'system.table.title.osArch': '操作系統',
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
  'system.button.more': '查看更多信息',
  'system.button.showConfig': '查看系統配置',
  'system.button.comfirmConfig': '提交配置',

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
  'system.modal.content.cornExpr':
    '請準確填寫 CRON 表達式以確保重啟時間的準確性。重新啟動將斷開網路資源和資料轉送鏈路，請提前備份資料以避免遺失。在啟用定時重新啟動策略前務必完成備份。',
  'system.modal.title.config': '系統配置參數',

  /**
   * title
   */
  'system.title.firmware.auth': '設備授權資訊',
  'system.title.firmware.log': '固件升級日誌',
  'system.title.firmware.upload': '上傳固件',
  'system.title.network.status': '網絡狀態',
  'system.title.resource.detail': '系統詳情',

  /**
   * descriptions
   */
  'system.desc.appId': '應用標識',
  'system.desc.maxQueueSize': '最大隊列',
  'system.desc.sourceRestartInterval': '資源重啟間隔',
  'system.desc.gomaxProcs': '最大 CPU 核心數',
  'system.desc.enablePProf': '是否啟用效能分析',
  'system.desc.enableConsole': '是否啟用控制台輸出',
  'system.desc.appDebugMode': '是否啟用調試模式',
  'system.desc.logLevel': '日誌記錄等級',
  'system.desc.logPath': '日誌儲存路徑',
  'system.desc.logMaxSize': '單一日誌檔案大小',
  'system.desc.logMaxBackups': '日誌檔案備份數量',
  'system.desc.logMaxAge': '日誌檔保留天數',
  'system.desc.logCompress': '是否壓縮日誌文件',
  'system.desc.maxKvStoreSize': '鍵值存儲大小',
  'system.desc.maxLostCacheSize': '最大緩存大小',
  'system.desc.extLibs': '外部 Lua 庫',
  'system.desc.dataSchemaSecret': '密鑰列表',
  'system.desc.empty': '目前設備不支援該功能',

  /**
   * others
   */

  // tooltip
  'system.tooltip.cdmapwd': '是否在 CDMA 網絡下保存用戶名和密碼',
  'system.tooltip.new': '新建一行',
  'system.tooltip.corn':
    '本功能採用標準 crontab 格式，讓使用者可以透過自訂分鐘、小時、日期、月份、星期的值來設定重新啟動策略。',

  // 系统时区
  'system.option.group.asia': '亞洲',
  'system.option.group.america': '美洲',
  'system.option.asia.beijing': '北京',
  'system.option.asia.seoul': '首爾',
  'system.option.asia.tokyo': '東京',
  'system.option.asia.kolkata': '德里',
  'system.option.america.newYork': '紐約',
  'system.option.america.losAngeles': '洛杉磯',
  'system.option.america.chicago': '芝加哥',
  'system.option.america.toronto': '多倫多',
  'system.option.america.mexico': '墨西哥城',

  'system.switch.checked': '開啟',
  'system.switch.unchecked': '關閉',

  'system.desc.recovery': '僅支持 zip 文件',
  'system.message.error.upload': '僅支持 zip 格式的文件，請檢查上傳文件格式',
  'system.message.success.ntp': 'NTP 時間更新成功',
  'system.message.success.scheduledReboot': '設定成功',

  // time
  'system.time.day': '天',
  'system.time.hour': '時',
  'system.time.minute': '分',
  'system.time.second': '秒',

  // cron expression
  'system.cronExpr.option1': '每天凌晨 0 點執行一次',
  'system.cronExpr.option2': '每天凌晨 3 點 33 分執行一次',
  'system.cronExpr.option3': '每週日凌晨 0 點執行一次',
  'system.cronExpr.option4': '每個月的第一天凌晨 0 點執行一次',
  'system.cronExpr.option5': '每三個月的第一天凌晨 0 點執行一次',
};
