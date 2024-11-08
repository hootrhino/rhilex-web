import button from './zh-TW/button';
import component from './zh-TW/component';
import status from './zh-TW/status';
// pages
import appStack from './zh-TW/appStack';
import cecollas from './zh-TW/cecollas';
import com from './zh-TW/com';
import common from './zh-TW/common';
import dashboard from './zh-TW/dashboard';
import DataRepository from './zh-TW/DataRepository';
import device from './zh-TW/device';
import inend from './zh-TW/inend';
import login from './zh-TW/login';
import notification from './zh-TW/notification';
import outend from './zh-TW/outend';
import plugin from './zh-TW/plugin';
import ruleConfig from './zh-TW/ruleConfig';
import schemaMgt from './zh-TW/schema';
import system from './zh-TW/system';

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
