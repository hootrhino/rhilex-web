import { firstUpperCase } from '@/utils/utils';
import { getIntl, getLocale } from '@umijs/max';
import { dataToServers, getQuickCode, getVariables } from '../BuildInLua/dataToTpl';

export const dataToQuickTpl = dataToServers.map((item) => ({
  label: '',
  detail: getIntl(getLocale()).formatMessage(
    { id: 'component.tpl.data.quick.modbus' },
    { server: `${firstUpperCase(item.target)}Server` },
  ),
  apply: getQuickCode(item.target),
  type: 'function',
  variables: getVariables(item.target),
}));
