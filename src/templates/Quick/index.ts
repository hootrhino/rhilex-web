import { getIntl, getLocale } from '@umijs/max';
import {appStackQuickTpl } from './appStackTpl';
import { Product } from '@/utils/enum';
import { dataToQuickTpl } from '../BuildIn/dataToTpl';

// 自定义快捷模板
export const quickLuaTpl = [
  {
    name: getIntl(getLocale()).formatMessage({ id: 'component.title.defaultGroup' }),
    uuid: 'default_quick_group',
  },
];

export const quickChildren = (product: Product) => new Map([['default_quick_group', [...dataToQuickTpl, ...appStackQuickTpl(product)]]]);
