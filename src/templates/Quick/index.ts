import { getIntl, getLocale } from '@umijs/max';
import { En6400Tpl, RHILEXG1Tpl } from './appStackTpl';
import { dataToQuickTpl } from './dataToTpl';
import { Product } from '@/utils/enum';
import type { baseTplItem } from '@/components/RuleExample/typings';

// 自定义快捷模板
export const quickLuaTpl = [
  {
    name: getIntl(getLocale()).formatMessage({ id: 'component.title.defaultGroup' }),
    uuid: 'default_quick_group',
  },
];

export const quickChildren = (product: Product) => {
  let productTpl: baseTplItem[] = [];

  if (product === Product.RHILEXG1) {
    productTpl = [...RHILEXG1Tpl]
  }
  if (product === Product.EN6400) {
    productTpl = [...En6400Tpl]
  }

  return {
    'default_quick_group': [...dataToQuickTpl, ...productTpl]
  }
}
