import button from './en-US/button';
import component from './en-US/component';
import status from './en-US/status';
// pages
import appStack from './en-US/appStack';
import com from './en-US/com';
import dashboard from './en-US/dashboard';
import DataRepository from './en-US/DataRepository';
import device from './en-US/device';
import extend from './en-US/extend';
import inend from './en-US/inend';
import login from './en-US/login';
import notification from './en-US/notification';
import outend from './en-US/outend';
import plugin from './en-US/plugin';
import ruleConfig from './en-US/ruleConfig';
import schemaMgt from './en-US/schema';
import system from './en-US/system';

export default {
  /**
   * message
   */
  'message.success.upload': 'Uploaded successfully',
  'message.success.remove': 'Deleted successfully',
  'message.success.start': 'Started successfully',
  'message.success.stop': 'Stopped successfully',
  'message.success.update': 'Updated successfully',
  'message.success.new': 'Created successfully',
  'message.success.login': 'Login Successfully',
  'message.success.scan': 'Scanned successfully',
  'message.success.restart': 'Restarted successfully',
  'message.success.reboot': 'Rebooted successfully',
  'message.success.reset': 'Reseted Successfully',
  /**
   * placeholder
   */
  'placeholder.input': 'Please enter a {text}',
  'placeholder.select': 'Please select a {text}',
  'placeholder.desc': 'Please enter a description',
  /**
   * table
   */
  'table.index': 'NO.',
  'table.desc': 'Description',
  'table.option': 'Action',
  /**
   * page
   */
  'page.404.subTitle': 'Sorry, the page you visited does not exist',
  /**
   * form
   */
  'form.title.username': 'Username',
  'form.title.password': 'Password',
  'form.placeholder.username': 'Please enter a username',
  'form.placeholder.password': 'Please enter a password',
  'form.rules.name':
    'Please enter 4-64 characters, supporting Chinese, letters, numbers, or underscores',
  'form.rules.port': 'The port value must be between 0-65535',
  'form.rules.address': 'The address value must be between 0-65535',
  'form.rules.vendorId': 'The vendor ID must be between 0-65535',
  'form.rules.ip': 'The IP address format is incorrect',
  'form.rules.netmask': 'The subnet mask format is incorrect',
  'form.rules.gateway': 'The gateway mask format is incorrect',
  'form.rules.default': 'The format is incorrect',
  'form.rules.uartTimeout': 'The timeout must be between 30-1000ms',
  /**
   * modal
   */
  'modal.title.confirm': 'Are you sure you want to perform this action?',
  'modal.title.forget': 'Forgot your password?',
  'modal.content.forget':
    'If you have forgotten your password, please follow the manual for your current device to reset it.',
  'modal.content.logout': 'Are you sure you want to log out?',
  /**
   * others
   */
  'antd.upload.title': 'Click or drag file to this area to upload',
  /**
   * menu
   */
  'menu.dashboard': 'Dashboard',
  'menu.device': 'Device Access',
  'menu.device.list': 'Device List',
  'menu.device.new': 'New Device',
  'menu.device.update': 'Edit Device',
  'menu.device.sheet': 'Register Sheet Configuration',
  'menu.device.registers': 'Registers Details',
  'menu.device.objectList': 'SNMP OID Sheet',
  'menu.device.subDevice': 'Subdevice List',
  'menu.schema': 'Data Schema',
  'menu.dataRepository': 'Data Repository',
  'menu.inend': 'Input Resource',
  'menu.source.list': 'Resource List',
  'menu.source.new': 'New Resource',
  'menu.source.update': 'Edit Resource',
  'menu.outend': 'Output Resource',
  'menu.appStack': 'Micro Application',
  'menu.appStack.list': 'Application List',
  'menu.appStack.new': 'New Application',
  'menu.appStack.update': 'Edit Application',
  'menu.plugin': 'Plugin',
  'menu.plugin.list': 'Plugin List',
  'menu.system': 'System Settings',
  'menu.notification': 'Notification',
  'menu.rule.list': 'Rule Configuration',
  'menu.rule.new': 'New Rule Configuration',
  'menu.rule.update': 'Edit Rule Configuration',
  'menu.cm': 'COM Module',
  ...component,
  ...button,
  ...status,
  ...dashboard,
  ...device,
  ...notification,
  ...appStack,
  ...extend,
  ...plugin,
  ...schemaMgt,
  ...system,
  ...ruleConfig,
  ...outend,
  ...inend,
  ...DataRepository,
  ...com,
  ...login,
};
