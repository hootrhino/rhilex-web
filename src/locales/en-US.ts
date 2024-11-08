import button from './en-US/button';
import component from './en-US/component';
import status from './en-US/status';
// pages
import appStack from './en-US/appStack';
import cecollas from './en-US/cecollas';
import com from './en-US/com';
import common from './en-US/common';
import dashboard from './en-US/dashboard';
import DataRepository from './en-US/DataRepository';
import device from './en-US/device';
import inend from './en-US/inend';
import login from './en-US/login';
import notification from './en-US/notification';
import outend from './en-US/outend';
import plugin from './en-US/plugin';
import ruleConfig from './en-US/ruleConfig';
import schemaMgt from './en-US/schema';
import system from './en-US/system';

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
