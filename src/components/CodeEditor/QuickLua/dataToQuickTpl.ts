import { firstUpperCase } from '@/utils/utils';
import { dataToServers, getQuickCode, getVariables } from '../BuildInLua/dataToTpl';

export const dataToQuickTpl = dataToServers.map((item) => ({
  label: '',
  detail: `Modbus 数据解析并推向 ${firstUpperCase(item.target)}Server`,
  apply: getQuickCode(item.target),
  type: 'function',
  variables: getVariables(item.target),
}));
