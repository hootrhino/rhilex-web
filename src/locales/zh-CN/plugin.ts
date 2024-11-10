export default {
  /**
   * table
   */
  'plugin.table.title.serverAddr': '访问地址',
  'plugin.table.title.serverEndpoint': '服务端点',
  'plugin.table.title.domain': '透传域名',
  'plugin.table.title.localSchema': '通信协议',
  'plugin.table.title.localHost': '本地主机',
  'plugin.table.title.localPort': '本地端口',
  'plugin.table.title.authToken': '身份令牌',
  'plugin.table.title.remote': '远程地址',

  /**
   * title
   */
  'plugin.title.ping': '网络测速',
  'plugin.title.clients': '客户端列表',
  'plugin.title.scan': 'Modbus 扫描仪',
  'plugin.title.terminal': '终端',
  'plugin.title.calc': 'Modbus CRC 计算',
  'plugin.title.ngrokc': '详情',
  'plugin.title.tel': 'RHILEX 遥测协议',

  /**
   * button
   */
  'plugin.button.scan.start': '开始扫描',
  'plugin.button.scan.stop': '停止扫描',
  'plugin.button.kickout': '强制离线',
  'plugin.button.calc': '计算',
  'plugin.button.tel': '遥测协议',

  /**
   * form
   */
  'plugin.form.title.output': '输出结果',
  'plugin.form.title.ip': '地址',
  'plugin.form.title.ca': '校验算法',
  'plugin.form.title.hex': '十六进制字符串',
  'plugin.form.title.cv': '校验值（CRC）',
  'plugin.form.placeholder.ip': '请输入地址',
  'plugin.form.placeholder.hex': '请输入不带 0x/0X 前缀的合法十六进制字符串',

  /**
   * message
   */
  'plugin.message.success.kickout': '离线成功',

  /**
   * other
   */
  'plugin.ca.big': '大端（CRC16）',
  'plugin.ca.little': '小端（CRC16）',
  'plugin.tooltip.hex': `不带 '0x' 或 '0X' 前缀的十六进制字符串`,

  /**
   * 遥测协议
   */
  'plugin.tel.intro': `欢迎使用
  RHILEX。请在使用我们的数据遥测服务之前仔细阅读以下数据遥测协议（以下简称“协议”）。本协议是您（以下简称“用户”）与
  RHILEX（以下简称“我们”或“公司”）之间关于数据遥测服务的法律协议。通过使用我们的数据遥测服务，您同意遵守本协议的所有条款和条件。如果您不同意这些条款，请不要使用相关服务。`,
  'plugin.tel.passage1.title': '一、服务描述',
  'plugin.tel.passage1.desc':
    'RHILEX 提供数据遥测服务，用于从边缘设备收集、传输和处理数据。这些数据包括设备运行状态、性能指标、操作日志等。数据遥测服务旨在提升设备管理、性能监控和故障诊断的效率。',
  'plugin.tel.passage2.title': '二、数据收集',
  'plugin.tel.passage2.desc.item1': `数据类型：我们收集的遥测数据包括但不限于设备的操作状态、性能指标、错误日志及其他相关信息。`,
  'plugin.tel.passage2.desc.item2': `数据来源：数据由您所使用的设备通过软件收集，并通过网络传输到我们的服务器。`,
  'plugin.tel.passage2.desc.item3': `数据目的：收集的数据用于分析和改善设备性能、提供技术支持及提升用户体验。`,
  'plugin.tel.passage3.title': '三、数据使用',
  'plugin.tel.passage3.desc.item1': `数据分析：我们会对收集的数据进行分析，以帮助优化设备运行、改进软件功能及提供更好的服务。`,
  'plugin.tel.passage3.desc.item2': `数据共享：除非法律要求或经您同意，我们不会将您的数据共享给第三方。我们承诺保护您的数据隐私，不会将数据用于未授权的目的。`,
  'plugin.tel.passage4.title': '四、隐私保护',
  'plugin.tel.passage4.desc.item1': `隐私政策：我们将按照我们的隐私政策来处理和保护您的数据。隐私政策详细说明了我们如何收集、使用、存储和保护您的个人数据。请参阅[隐私政策链接]以了解更多信息。`,
  'plugin.tel.passage4.desc.item2': `数据安全：我们采取适当的技术和组织措施，确保您的数据在传输和存储过程中的安全性。`,
  'plugin.tel.passage5.title': '五、用户同意',
  'plugin.tel.passage5.desc.item1': `同意数据收集：使用我们的数据遥测服务即表示您同意我们收集和使用设备数据。`,
  'plugin.tel.passage5.desc.item2': `数据传输：您同意在使用软件时，允许软件通过网络传输数据至我们的服务器。`,
  'plugin.tel.passage6.title': '六、数据存储与保留',
  'plugin.tel.passage6.desc.item1': `存储期限：我们会在需要的时间内存储您的数据，以便于分析和服务提供。具体存储期限将根据业务需求和法律要求而定。`,
  'plugin.tel.passage6.desc.item2': `数据删除：在某些情况下，您有权要求我们删除您的数据。有关数据删除的请求可通过联系我们的客户支持团队提出。`,
  'plugin.tel.passage7.title': '七、责任限制',
  'plugin.tel.passage7.desc.item1': `数据准确性：尽管我们努力确保数据的准确性，但我们不对因数据不准确或延迟引起的任何直接或间接损失负责。`,
  'plugin.tel.passage7.desc.item2': `服务中断：我们不对因服务中断或不可预见的技术问题导致的数据丢失或损坏承担责任。`,
  'plugin.tel.passage8.title': '八、协议变更',
  'plugin.tel.passage8.desc':
    '我们保留随时修改或更新本协议的权利。任何修改将在我们的网站或软件中发布，并立即生效。您继续使用数据遥测服务即表示接受修改后的协议。',
  'plugin.tel.passage9.title': '九、适用法律与争议解决',
  'plugin.tel.passage9.desc':
    '本协议适用中华人民共和国法律。因本协议或数据遥测服务引起的任何争议，应提交至公司所在地有管辖权的人民法院解决。',
  'plugin.tel.extra1':
    '感谢您使用 RHILEX 数据遥测服务。我们致力于为您提供优质的服务。如有任何问题，请随时联系我们。',
  'plugin.tel.extra2': '关于遥测的详细配置可通过 RHILEX 官方网站',
  'plugin.tel.extra3': '查看。',
};
