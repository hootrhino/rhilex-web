import { getIntl, getLocale } from '@umijs/max';

/**
 * modbus 函数相关代码模板&示例
 */
const intl = getIntl(getLocale());

const modbusList = [
  { target: 'F5', detail: intl.formatMessage({ id: 'component.tpl.f5' }) },
  { target: 'F6', detail: intl.formatMessage({ id: 'component.tpl.f6' }) },
  { target: 'F15', detail: intl.formatMessage({ id: 'component.tpl.f15' }) },
  { target: 'F16', detail: intl.formatMessage({ id: 'component.tpl.f16' }) },
];

const getVariables = (target: string) => {
  let err = '';
  let variables = [
    {
      label: intl.formatMessage({ id: 'component.tpl.f15.arg1' }),
      name: 'arg1',
      value: '',
      type: 'string',
    },
    { label: 'Modbus ID', name: 'arg2', value: 1, type: 'number' },
  ];

  if (['F15', 'F16'].includes(target)) {
    err = `local err = modbus:${target}(arg1, arg2, arg3, arg4, arg5)`;
    variables = [
      ...variables,
      {
        label: intl.formatMessage({ id: 'component.tpl.f15.arg3' }),
        name: 'arg3',
        value: 0,
        type: 'number',
      },
      {
        label: intl.formatMessage({ id: 'component.tpl.f15.arg4' }),
        name: 'arg4',
        value: 1,
        type: 'number',
      },
      {
        label: intl.formatMessage({ id: 'component.tpl.f15.arg5' }),
        name: 'arg5',
        value: '',
        type: 'string',
      },
    ];
  } else {
    err = `local err = modbus:${target}(arg1, arg2, arg3, arg4)`;
    variables = [
      ...variables,
      {
        label: intl.formatMessage({ id: 'component.tpl.f15.arg2' }),
        name: 'arg3',
        value: 0,
        type: 'number',
      },
      {
        label: intl.formatMessage({ id: 'component.tpl.f15.arg5' }),
        name: 'arg4',
        value: '00',
        type: 'string',
      },
    ];
  }

  return { err, variables };
};

export const modbusTpl = modbusList?.map((modbus) => {
  const { err, variables } = getVariables(modbus.target);

  const code = `${err}
if err ~= nil then
    Debug(err)
end`;

  return {
    ...modbus,
    label: `modbus:${modbus.target}`,
    apply: code,
    type: 'function',
    variables,
  };
});
