import { getIntl, getLocale } from '@umijs/max';
import { TplDataType } from '@/components/RuleExample/enum';
import { Product } from '@/utils/enum';

const intl = getIntl(getLocale());

const getCode = (product: Product) => `function Main(arg)
while true do
  local _, Error = network:Ping(ip);
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
        label: intl.formatMessage({ id: 'component.tpl.rhilex.label' }),
        detail: intl.formatMessage({ id: 'component.tpl.rhilex.detail' }, { name: product }),
        apply: getCode(product),
        type: 'function',
        variables: [
          {
            label: 'IP',
            name: 'ip',
            type: TplDataType.SELECT,
            dataSource: ['8.8.8.8', '114.114.114.114', '202.108.22.5', '202.108.22.103'],
          },
        ],
      },
    ];
  }

  return [];
}
