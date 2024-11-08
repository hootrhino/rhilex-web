import button from './zh-CN/button';
import component from './zh-CN/component';
import status from './zh-CN/status';
// pages
import appStack from './zh-CN/appStack';
import cecollas from './zh-CN/cecollas';
import com from './zh-CN/com';
import common from './zh-CN/common';
import dashboard from './zh-CN/dashboard';
import DataRepository from './zh-CN/DataRepository';
import device from './zh-CN/device';
import inend from './zh-CN/inend';
import login from './zh-CN/login';
import notification from './zh-CN/notification';
import outend from './zh-CN/outend';
import plugin from './zh-CN/plugin';
import ruleConfig from './zh-CN/ruleConfig';
import schemaMgt from './zh-CN/schema';
import system from './zh-CN/system';

export default {
  ...common,
  ...component,
  ...button,
  ...status,
  ...dashboard,
  ...device,
  ...notification,
  ...appStack,
  ...plugin,
  ...schemaMgt,
  ...system,
  ...ruleConfig,
  ...outend,
  ...inend,
  ...DataRepository,
  ...com,
  ...login,
  ...cecollas,
};
