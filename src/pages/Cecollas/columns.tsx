import ProTag, { StatusType } from '@/components/ProTag';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import { getIntl, getLocale } from '@umijs/max';
import { CecollasType, cecollasTypeOptions, groupData, Mode } from './enum';

const { formatMessage } = getIntl(getLocale());

export type CecollasFormItem = {
  name: string;
  type: string;
  gid: string;
  config: Record<string, any>;
  description: string;
};

export const baseColumns = [
  {
    title: 'UUID',
    dataIndex: 'uuid',
    ellipsis: true,
    copyable: true,
    hideInDescriptions: true,
    hideInForm: true,
  },
  {
    title: formatMessage({ id: 'form.title.name' }),
    dataIndex: 'name',
    ellipsis: true,
    width: 'md',
    fieldProps: {
      placeholder: formatMessage({ id: 'form.placeholder.name' }),
    },
    formItemProps: {
      rules: [{ required: true, message: formatMessage({ id: 'form.rules.name' }) }],
    },
  },
  {
    title: formatMessage({ id: 'form.title.type' }),
    dataIndex: 'type',
    ellipsis: true,
    valueType: 'select',
    width: 'md',
    fieldProps: {
      allowClear: false,
      placeholder: formatMessage({ id: 'form.placeholder.type' }),
    },
    request: () =>
      Object.keys(cecollasTypeOptions).map((key) => ({
        label: cecollasTypeOptions[key],
        value: key,
      })),
    renderText: (type: CecollasType) => type && cecollasTypeOptions[type],
  },
  {
    title: formatMessage({ id: 'cecollas.form.title.gid' }),
    dataIndex: 'gid',
    valueType: 'select',
    required: true,
    hideInTable: true,
    width: 'md',
    fieldProps: {
      allowClear: false,
    },
    request: async () => groupData,
  },
  {
    title: formatMessage({ id: 'form.title.status' }),
    dataIndex: 'state',
    width: 100,
    hideInForm: true,
    renderText: (state: number) => <ProTag type={StatusType.DEVICE}>{state || 0}</ProTag>,
  },
  {
    title: formatMessage({ id: 'table.title.desc' }),
    dataIndex: 'description',
    ellipsis: true,
    width: 'md',
    fieldProps: {
      placeholder: formatMessage({ id: 'form.placeholder.desc' }),
    },
    renderText: (description: string) => (description ? description : '-'),
  },
];

export const typeColumns = (type: string) => [
  {
    title: formatMessage({ id: 'cecollas.form.title.mode' }),
    dataIndex: ['config', 'mode'],
    valueType: 'select',
    valueEnum: Mode,
    width: 'md',
    fieldProps: {
      allowClear: false,
      placeholder: formatMessage(
        { id: 'placeholder.select' },
        { text: formatMessage({ id: 'cecollas.form.title.mode' }) },
      ),
    },
    render: (_dom: React.ReactNode, { mode }: any) => Mode[mode],
  },
  {
    valueType: 'dependency',
    name: ['config'],
    columns: ({ config }: CecollasFormItem) => {
      const mode = config.mode;
      const show = type === CecollasType.ITHINGS_IOTHUB_CEC && mode === Mode.GATEWAY;

      return [
        {
          title: formatMessage({ id: 'cecollas.form.title.subProduct' }),
          dataIndex: ['config', 'subProduct'],
          width: 'md',
          hideInForm: !show,
          hideInDescriptions: !show,
          fieldProps: {
            placeholder: formatMessage(
              { id: 'placeholder.input' },
              { text: formatMessage({ id: 'cecollas.form.title.subProduct' }) },
            ),
          },
          formItemProps: {
            rules: [
              {
                required: true,
                message: formatMessage(
                  { id: 'placeholder.input' },
                  { text: formatMessage({ id: 'cecollas.form.title.subProduct' }) },
                ),
              },
            ],
          },
          render: (_dom: React.ReactNode, { productId }: any) => productId,
        },
      ];
    },
  },
  {
    title: formatMessage({ id: 'cecollas.form.title.productId' }),
    dataIndex: ['config', 'productId'],
    width: 'md',
    fieldProps: {
      placeholder: formatMessage(
        { id: 'placeholder.input' },
        { text: formatMessage({ id: 'cecollas.form.title.productId' }) },
      ),
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage(
            { id: 'placeholder.input' },
            { text: formatMessage({ id: 'cecollas.form.title.productId' }) },
          ),
        },
      ],
    },
    render: (_dom: React.ReactNode, { productId }: any) => productId,
  },
  {
    title: formatMessage({ id: 'cecollas.form.title.deviceName' }),
    dataIndex: ['config', 'deviceName'],
    width: 'md',
    fieldProps: {
      placeholder: formatMessage(
        { id: 'placeholder.input' },
        { text: formatMessage({ id: 'cecollas.form.title.deviceName' }) },
      ),
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage(
            { id: 'placeholder.input' },
            { text: formatMessage({ id: 'cecollas.form.title.deviceName' }) },
          ),
        },
      ],
    },
    render: (_dom: React.ReactNode, { deviceName }: any) => deviceName,
  },
  {
    title: formatMessage({ id: 'cecollas.form.title.devicePsk' }),
    dataIndex: ['config', 'devicePsk'],
    width: 'md',
    fieldProps: {
      placeholder: formatMessage(
        { id: 'placeholder.input' },
        { text: formatMessage({ id: 'cecollas.form.title.devicePsk' }) },
      ),
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage(
            { id: 'placeholder.input' },
            { text: formatMessage({ id: 'cecollas.form.title.devicePsk' }) },
          ),
        },
      ],
    },
    render: (_dom: React.ReactNode, { devicePsk }: any) => devicePsk,
  },
  {
    title: formatMessage({ id: 'cecollas.form.title.serverEndpoint' }),
    dataIndex: ['config', 'serverEndpoint'],
    width: 'md',
    hideInForm: type === CecollasType.TENCENT_IOTHUB_CEC,
    hideInDescriptions: type === CecollasType.TENCENT_IOTHUB_CEC,
    fieldProps: {
      placeholder: formatMessage(
        { id: 'placeholder.input' },
        { text: formatMessage({ id: 'cecollas.form.title.serverEndpoint' }) },
      ),
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage(
            { id: 'placeholder.input' },
            { text: formatMessage({ id: 'cecollas.form.title.serverEndpoint' }) },
          ),
        },
      ],
    },
    render: (_dom: React.ReactNode, { serverEndpoint }: any) => serverEndpoint,
  },
];

export const columns: ProFormColumnsType<CecollasFormItem>[] = [
  {
    valueType: 'group',
    columns: baseColumns as ProFormColumnsType<CecollasFormItem>[],
  },
  {
    valueType: 'dependency',
    name: ['type'],
    columns: ({ type }: CecollasFormItem) => [
      {
        title: formatMessage({ id: 'cecollas.title.config' }),
        valueType: 'group',
        columns: typeColumns(type) as ProFormColumnsType<CecollasFormItem>[],
      },
    ],
  },
];
