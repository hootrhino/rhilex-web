export default {
  /**
   * tabs
   */
  'system.tab.resource': '系统资源',
  'system.tab.netStatus': '网络状态',
  'system.tab.network': '网卡设置',
  'system.tab.datetime': '时间设置',
  'system.tab.firmware': '固件设置',
  'system.tab.backup': '数据备份',
  'system.tab.user': '用户设置',
  'system.tab.reboot': '定时重启',
  'system.tab.time': '系统时间',
  'system.tab.sysver': '系统版本',
  'system.tab.nerworking': '网络设置',
  'system.tab.setting': '{item} 设置',

  /**
   * form
   */
  'system.form.title.netmask': '子网掩码',
  'system.form.title.interface': '网卡选择',
  'system.form.title.address': 'IP 地址',
  'system.form.title.gateway': '默认网关',
  'system.form.title.dns': 'DNS 服务器',
  'system.form.title.dhcpEnabled': '开启 DHCP',
  'system.form.title.security': '加密方式',

  // 4G
  'system.form.title.csq': '信号',
  'system.form.title.imel': '入网 ID',
  'system.form.title.cops': '运营商',
  'system.form.title.up': '是否联网',

  // reboot
  'system.form.title.enableReboot': '开启定时重启',
  'system.form.title.cronExpr': 'CRON 表达式',

  // rules
  'system.form.rules.netmask': '请输入子网掩码',
  'system.form.rules.interface': '请选择网卡',
  'system.form.rules.address': '请输入 IP 地址',
  'system.form.rules.gateway': '请输入默认网关',
  'system.form.rules.dns': '请输入 DNS 服务器',
  'system.form.rules.ssid': '请输入 SSID',
  'system.form.rules.security': '请选择加密方式',
  'system.form.rules.cronExpr': '请选择常用定时策略或者自定义输入定时策略',

  // placeholder
  'system.form.placeholder.sysTimeZone': '请选择时区',
  'system.form.placeholder.sysTime': '请选择时间',

  /**
   * table
   */
  'system.table.title.deviceId': '设备序列号',
  'system.table.title.mac': '被授权 MAC',
  'system.table.title.license': '设备许可证',
  'system.table.title.authorizeAdmin': '证书签发方',
  'system.table.title.beginAuthorize': '授权起始时间',
  'system.table.title.endAuthorize': '授权结束时间',
  'system.table.title.product': '产品型号',
  'system.table.title.version': '当前版本',
  'system.table.title.osUpTime': '运行时长',
  'system.table.title.osArch': '操作系统',
  'system.table.title.sysTimeZone': '时区选择',
  'system.table.title.sysTime': '系统时间',
  'system.table.title.enableNtp': 'NTP 同步',

  /**
   * button
   */
  'system.button.upgrade': '升级',
  'system.button.confirm.reboot': '确认重启',
  'system.button.confirm.upload': '确认上传',
  'system.button.confirm.upgrade': '确认升级',
  'system.button.confirm.recover': '确认恢复',
  'system.button.backup.runningLog': '日志下载',
  'system.button.backup.snapshot': '运行快照',
  'system.button.backup.download': '备份下载',
  'system.button.backup.upload': '备份恢复',
  'system.button.firmware.upload': '上传固件',
  'system.button.firmware.recover': '恢复出厂',
  'system.button.time.ntp': '立即同步 NTP',
  'system.button.wifi.ntp': '扫描 WIFI',
  'system.button.more': '查看更多信息',
  'system.button.showConfig': '查看系统配置',
  'system.button.comfirmConfig': '提交配置',
  'system.button.turnOff': '关闭 4G',
  'system.button.turnOn': '开启 4G',

  /**
   * modal
   */
  'system.modal.content.restart': '重启 4G 网卡会造成短时间内移动网络处于离线状态，请谨慎操作',
  'system.modal.content.upload':
    '上传时请确认版本，版本错误会导致失败，有可能会引起设备故障，请谨慎操作',
  'system.modal.content.upgrade':
    '升级时请确认版本，版本错误会导致升级失败，有可能会引起设备故障，请谨慎操作',
  'system.modal.content.reboot': '重启设备会停止当前所有任务，请谨慎操作',
  'system.modal.content.recover':
    '恢复出厂设置将删除当前所有数据并停止所有正在进行中的任务，请谨慎操作',
  'system.modal.content.user': '确定要修改用户名 / 密码并重新登录吗？',
  'system.modal.content.cornExpr':
    '请准确填写 CRON 表达式以确保重启时间的准确性。重启将断开网络资源和数据转发链路，请提前备份数据以避免丢失。在启用定时重启策略前务必完成备份。',
  'system.modal.title.config': '系统配置参数',

  /**
   * title
   */
  'system.title.firmware.auth': '设备授权信息',
  'system.title.firmware.log': '固件升级日志',
  'system.title.firmware.upload': '上传固件',
  'system.title.network.status': '网络状态',
  'system.title.resource.detail': '系统详情',

  /**
   * descriptions
   */
  'system.desc.appId': '应用标识',
  'system.desc.maxQueueSize': '最大队列',
  'system.desc.sourceRestartInterval': '资源重启间隔',
  'system.desc.gomaxProcs': '最大 CPU 核心数',
  'system.desc.enablePProf': '是否启用性能分析',
  'system.desc.enableConsole': '是否启用控制台输出',
  'system.desc.appDebugMode': '是否启用调试模式',
  'system.desc.logLevel': '日志记录级别',
  'system.desc.logPath': '日志存储路径',
  'system.desc.logMaxSize': '单个日志文件大小',
  'system.desc.logMaxBackups': '日志文件备份数量',
  'system.desc.logMaxAge': '日志文件保留天数',
  'system.desc.logCompress': '是否压缩日志文件',
  'system.desc.maxKvStoreSize': '键值存储大小',
  'system.desc.maxLostCacheSize': '最大缓存大小',
  'system.desc.extLibs': '外部 Lua 库',
  'system.desc.dataSchemaSecret': '密钥列表',
  'system.desc.empty': '当前设备不支持该功能',

  /**
   * others
   */

  // tooltip
  'system.tooltip.cdmapwd': '是否在 CDMA 网络下保存用户名和密码',
  'system.tooltip.new': '新建一行',
  'system.tooltip.corn':
    '本功能采用标准 crontab 格式，允许用户通过自定义分钟、小时、日期、月份、星期的值来设置重启策略。',

  // 系统时区
  'system.option.group.asia': '亚洲',
  'system.option.group.america': '美洲',
  'system.option.asia.beijing': '北京',
  'system.option.asia.seoul': '首尔',
  'system.option.asia.tokyo': '东京',
  'system.option.asia.kolkata': '德里',
  'system.option.america.newYork': '纽约',
  'system.option.america.losAngeles': '洛杉矶',
  'system.option.america.chicago': '芝加哥',
  'system.option.america.toronto': '多伦多',
  'system.option.america.mexico': '墨西哥城',

  'system.switch.checked': '开启',
  'system.switch.unchecked': '关闭',

  'system.desc.recovery': '仅支持 zip 文件',
  'system.message.error.upload': '仅支持 zip 格式文件，请检查上传文件格式',
  'system.message.success.ntp': 'NTP 时间更新成功',
  'system.message.success.setting': '设置成功',

  // time
  'system.time.day': '天',
  'system.time.hour': '时',
  'system.time.minute': '分',
  'system.time.second': '秒',

  // cron expression
  'system.cronExpr.option1': '每天凌晨 0 点执行一次',
  'system.cronExpr.option2': '每天凌晨 3 点 33 分执行一次',
  'system.cronExpr.option3': '每周日凌晨 0 点执行一次',
  'system.cronExpr.option4': '每月的第一天凌晨 0 点执行一次',
  'system.cronExpr.option5': '每三个月的第一天凌晨 0 点执行一次',
};
