import { DEFAULT_GROUP_KEY_CECOLLAS } from '@/utils/constant';
import { getIntl, getLocale } from '@umijs/max';

const { formatMessage } = getIntl(getLocale());

export enum CecollasType {
  TENCENT_IOTHUB_CEC = 'TENCENT_IOTHUB_CEC',
  ITHINGS_IOTHUB_CEC = 'ITHINGS_IOTHUB_CEC',
}

export enum Mode {
  GATEWAY = 'GATEWAY',
  DEVICE = 'DEVICE',
}

export enum Schema {
  GATEWAY = 'gatewaySchema',
  SUB_DEVICE = 'subDeviceSchema',
}

export const cecollasTypeOptions = {
  [CecollasType.TENCENT_IOTHUB_CEC]: formatMessage({ id: 'cecollas.type.tencent' }),
  [CecollasType.ITHINGS_IOTHUB_CEC]: formatMessage({ id: 'cecollas.type.ithings' }),
};

export const groupData = [
  { value: DEFAULT_GROUP_KEY_CECOLLAS, label: formatMessage({ id: 'common.title.defaultGroup' }) },
];
