import { getIntl, getLocale } from '@umijs/max';
import { Product } from '@/utils/enum';

const intl = getIntl(getLocale());

export const getAppStackAction = (product: Product, ip?: string) => `function Main(arg)
while true do
  local _, Error = network:Ping("${ip || 'ip'}");
  if Error ~= nil then
      for i = 1, 5, 1 do
          ${product.toLowerCase()}:Led1On();
          time:Sleep(50);
          ${product.toLowerCase()}:Led1Off();
          time:Sleep(50);
      end;
  else
      ${product.toLowerCase()}:Led1On();
      time:Sleep(50);
      ${product.toLowerCase()}:Led1Off();
      time:Sleep(50);
  end;
  time:Sleep(5000);
end;
return 0;
end;`

export const appStackQuickTpl = (product: Product) => {
  if ([Product.RHILEXG1, Product.EN6400].includes(product)) {
    return [
      {
        key: 'appStack',
        label: intl.formatMessage({ id: 'component.tpl.rhilex.label' }),
        detail: intl.formatMessage({ id: 'component.tpl.rhilex.detail' }, { name: product }),
        apply: getAppStackAction(product, '8.8.8.8'),
        type: 'function',
        hasVariables: true
      },
    ];
  }

  return [];
}
