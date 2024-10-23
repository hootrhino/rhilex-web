export default {
  /**
   * tabs
   */
  'system.tab.resource': 'Resources',
  'system.tab.netStatus': 'Network Status',
  'system.tab.network': 'Network Settings',
  'system.tab.datetime': 'Time Settings',
  'system.tab.firmware': 'Firmware Settings',
  'system.tab.backup': 'Backup Settings',
  'system.tab.user': 'User Settings',
  'system.tab.reboot': 'Scheduled Reboot',
  'system.tab.time': 'System Time',
  'system.tab.sysver': 'System Version',
  'system.tab.nerworking': 'Network Settings',
  'system.tab.setting': '{item} Settings',

  /**
   * form
   */
  'system.form.title.netmask': 'Subnet Mask',
  'system.form.title.interface': 'Select Interface',
  'system.form.title.address': 'IP Address',
  'system.form.title.gateway': 'Gateway',
  'system.form.title.dns': 'DNS Server',
  'system.form.title.dhcpEnabled': 'Enable DHCP',
  'system.form.title.security': 'Encryption Method',

  // 4G
  'system.form.title.csq': 'CSQ',
  'system.form.title.imel': 'IMEI',
  'system.form.title.cops': 'COPS',
  'system.form.title.up': 'Network Connection',

  // reboot
  'system.form.title.enableReboot': 'Enable Reboot',
  'system.form.title.cronExpr': 'CRON Expression',

  // rules
  'system.form.rules.netmask': 'Please enter a subnet mask',
  'system.form.rules.interface': 'Please select a interface',
  'system.form.rules.address': 'Please enter a ip address',
  'system.form.rules.gateway': 'Please enter a gateway',
  'system.form.rules.dns': 'Please enter a DNS server',
  'system.form.rules.ssid': 'Please enter a SSID',
  'system.form.rules.security': 'Please select a encryption method',
  'system.form.rules.cronExpr':
    'Please select a common timing policy or enter a custom timing policy',

  // placeholder
  'system.form.placeholder.sysTimeZone': 'Please select a time zone',
  'system.form.placeholder.sysTime': 'Please select a time',

  /**
   * table
   */
  'system.table.title.deviceId': 'Device ID',
  'system.table.title.mac': 'MAC Address',
  'system.table.title.license': 'License',
  'system.table.title.authorizeAdmin': 'Authorized Admin',
  'system.table.title.beginAuthorize': 'Start Authorization',
  'system.table.title.endAuthorize': 'End Authorization',
  'system.table.title.product': 'Product Model',
  'system.table.title.version': 'Version',
  'system.table.title.osUpTime': 'Up Start Time',
  'system.table.title.osArch': 'OS',
  'system.table.title.sysTimeZone': 'Time Zone',
  'system.table.title.sysTime': 'System Time',
  'system.table.title.enableNtp': 'Enable NTP',

  /**
   * button
   */
  'system.button.upgrade': 'Upgrading',
  'system.button.confirm.reboot': 'Confirm',
  'system.button.confirm.upload': 'Confirm',
  'system.button.confirm.upgrade': 'Confirm Upgrade',
  'system.button.confirm.recover': 'Confirm',
  'system.button.backup.runningLog': 'Download Log',
  'system.button.backup.snapshot': 'Snapshot',
  'system.button.backup.download': 'Backup Download',
  'system.button.backup.upload': 'Backup Recovery',
  'system.button.firmware.upload': 'Upload Firmware',
  'system.button.firmware.recover': 'Factory Reset',
  'system.button.time.ntp': 'Synchronize  NTP',
  'system.button.wifi.ntp': 'Scan WIFI',
  'system.button.more': 'More Info',
  'system.button.showConfig': 'Show Configuration',
  'system.button.comfirmConfig': 'Submit',
  'system.button.turnOff': 'Turn Off 4G',
  'system.button.turnOn': 'Turn On 4G',

  /**
   * modal
   */
  'system.modal.content.restart':
    'Resetting the 4G network card will temporarily disconnect the mobile network for a short period of time. Please proceed with caution',
  'system.modal.content.upload':
    'Please confirm the version when uploading. Incorrect version selection will result in failure and may potentially cause device malfunction. Please proceed with caution',
  'system.modal.content.upgrade':
    'Please confirm the version during the upgrade. Incorrect version selection will lead to upgrade failure and may potentially cause device malfunction. Please proceed with caution',
  'system.modal.content.reboot':
    'Reboot the device will stop all current tasks. Please proceed with caution',
  'system.modal.content.recover':
    'Factory reset will erase all current data and stop all ongoing tasks. Please proceed with caution',
  'system.modal.content.user':
    'Are you sure you want to change the username/password and login again?',
  'system.modal.content.cornExpr':
    'Please fill in the CRON expression accurately to ensure the accuracy of the reboot time. Reboot will disconnect network resources and data forwarding links, please backup data in advance to avoid loss. Be sure to complete the backup before enabling the timed reboot policy.',
  'system.modal.title.config': 'System configuration parameters',

  /**
   * title
   */
  'system.title.firmware.auth': 'Device authorization information',
  'system.title.firmware.log': 'Firmware upgrade log',
  'system.title.firmware.upload': 'Upload firmware',
  'system.title.network.status': 'Network Status',
  'system.title.resource.detail': 'System details',

  /**
   * descriptions
   */
  'system.desc.appId': 'AppID',
  'system.desc.maxQueueSize': 'MaxQueueSize',
  'system.desc.sourceRestartInterval': 'SourceRestartInterval',
  'system.desc.gomaxProcs': 'GoMaxProcs',
  'system.desc.enablePProf': 'EnablePProf',
  'system.desc.enableConsole': 'EnableConsole',
  'system.desc.appDebugMode': 'AppDebugMode',
  'system.desc.logLevel': 'LogLevel',
  'system.desc.logPath': 'LogPath',
  'system.desc.logMaxSize': 'LogMaxSize',
  'system.desc.logMaxBackups': 'LogMaxBackups',
  'system.desc.logMaxAge': 'LogMaxAge',
  'system.desc.logCompress': 'LogCompress',
  'system.desc.maxKvStoreSize': 'MaxKvStoreSize',
  'system.desc.maxLostCacheSize': 'MaxLostCacheSize',
  'system.desc.extLibs': 'ExtLibs',
  'system.desc.dataSchemaSecret': 'DataSchemaSecret',
  'system.desc.empty': 'Current device does not support this feature',

  /**
   * others
   */

  // tooltip
  'system.tooltip.cdmapwd': 'Whether to save the username and password on the CDMA network',
  'system.tooltip.new': 'Add a new line',
  'system.tooltip.corn':
    'This feature uses the standard crontab format to allow the user to set the reboot policy by customizing the values for minutes, hours, day, month, and week.',

  // 系统时区
  'system.option.group.asia': 'Asia',
  'system.option.group.america': 'America',
  'system.option.asia.beijing': 'Beijing',
  'system.option.asia.seoul': 'Seoul',
  'system.option.asia.tokyo': 'Tokyo',
  'system.option.asia.kolkata': 'Delhi',
  'system.option.america.newYork': 'New York',
  'system.option.america.losAngeles': 'Los Angeles',
  'system.option.america.chicago': 'Chicago',
  'system.option.america.toronto': 'Toronto',
  'system.option.america.mexico': 'Mexico City',

  'system.switch.checked': 'enable',
  'system.switch.unchecked': 'disable',

  'system.desc.recovery': 'Only ZIP files are supported',
  'system.message.error.upload':
    'Only ZIP format files are supported. Please check the uploaded file format',
  'system.message.success.ntp': 'NTP update successful',
  'system.message.success.setting': 'Settings saved successfully',

  // time
  'system.time.day': 'day',
  'system.time.hour': 'h',
  'system.time.minute': 'm',
  'system.time.second': 's',

  // cron expression
  'system.cronExpr.option1': 'Run at 00:00 AM daily',
  'system.cronExpr.option2': 'Run at 3:33 AM daily',
  'system.cronExpr.option3': 'Run at 0 AM on Sundays',
  'system.cronExpr.option4': 'Run at 0 AM on the first day of each month',
  'system.cronExpr.option5': 'Run at 0 AM on the first day of every three months',
};
